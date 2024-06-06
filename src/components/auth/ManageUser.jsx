import React, { useEffect, useState } from 'react'
import Pagination from "../common/Pagination"
import { Button, Col, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { getAllUsers, deleteUser} from '../utils/ApiFunctions';
import UserFilter from '../common/UserFilter';
import EditUser from './EditUser';

const ManageUser = () => {
    const[users, setUsers] = useState([{
        id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
    }])
    const[filteredUsers, setFilteredUsers] = useState([{
        id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
    }])
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
	const [usersPerPage] = useState(10)
    const [selectedUserRole, setSelectedUserRole] = useState("")

    useEffect(()  =>{
        fetchUser()
    },[])
    const fetchUser = async() => {
        setIsLoading(true)
        try {
            const response = await getAllUsers()
            setUsers(response)
            setFilteredUsers(response)
			setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
			setIsLoading(false)
        }
    }

    useEffect(() => {
        if(selectedUserRole === ""){
            setFilteredUsers(users)
        }else{
            const filteredUsers = users.filter((user) => user.roles === selectedUserRole)
            setFilteredUsers(filteredUsers)
        }
        setCurrentPage(1)
    }, [users, selectedUserRole])

    const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const handleDeleteUser = async (email) => {
        const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone.")
        if (confirmed) {
            try {
                const result = await deleteUser(email)
                if (result === "") {
                    setSuccessMessage(`User: ${email} was delete`)
                    fetchRooms()
                } else {
                    console.error(`Error deleting user : ${result.message}`)
                }
            } catch (error) {
                setErrorMessage(error.message)
            }
            setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
        }
	}

    const navigate = useNavigate();
	const handleEditClick = (email, additionalData) => {
        navigate(`/edit-user/${email}`, { state: additionalData });
      };

    const calculateTotalPages = (filteredUsers, usersPerPage, users) => {
		const totalUsers = filteredUsers.length > 0 ? filteredUsers.length : users.length
		return Math.ceil(totalUsers / usersPerPage)
	}

    const indexOfLastUser = currentPage * usersPerPage
	const indexOfFirstUser = indexOfLastUser - usersPerPage
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <>
        <div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
		</div>
        {isLoading ? (
            <p>Loading list users</p>
        ):(
            <> 
				<section className="mt-5 mb-5 container">
					<div className="d-flex justify-content-between mb-3 mt-5">
						<h2>List Users</h2>
						
					</div>
					<Row>
						<Col md={6} className="mb-2 md-mb-0">
							<UserFilter data={users} setFilteredData={setFilteredUsers}  />
						</Col>
						<Col md={6} className="d-flex justify-content-end">
							<Link to={"/register"}>
								<FaPlus/> Add user
							</Link>
						</Col>
					</Row>
						<table className="table table-bordered table-hover">
							<thead >
								<tr className="text-center">
									<th>ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Roles</th>
								</tr>
							</thead>
							<tbody>
								{currentUsers.map((user)=>(
									<tr key={user.id} className="text-center">
										<td>{user.id}</td>
										<td>{user.firstName + " "+ user.lastName}</td>
										<td>{user.email}</td>
                                        <td>{user.roles.map(role => role.name).join('\t')}</td>
										<td className="gap-3">
											<Link to={`/edit-user/${user.email}`} className="gap-2">
												<Button className="btn btn-info btn-sm" style={{margin:"2px"}} ><FaEye/></Button>
												<Button className="btn btn-warning btn-sm ml-5" style={{margin:"2px"}}><FaEdit/></Button>
											</Link>
                                            <Button className="btn btn-danger btn-sm ml-5" style={{margin:"2px"}}	
                                                    onClick={()=>handleDeleteUser(user.email)}>
                                                        <FaTrashAlt/>
                                            </Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Pagination 
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredUsers, usersPerPage, users)}
							onPageChange={handlePaginationClick}
						/>
				</section>
				</>
        )}
    </>
  )
}

export default ManageUser