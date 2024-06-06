import React, { useEffect, useState } from 'react'
import { getUser, updateUser } from "../utils/ApiFunctions"
import {Form, Button, Row, Col} from "react-bootstrap"
import {FaEdit, FaSave} from "react-icons/fa";

const EditUser = () => {

    const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
        password: ""
	})

    const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }
    

    useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
				
			} catch (error) {
				console.error(error)
			}
		}
		fetchUser()
	}, [userId])

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setErrorMessage("");
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setErrorMessage("");
    }

    const userID = localStorage.getItem("userId")

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            let newUser = { ...user };
            if (isEditingPassword) {
                newUser = { ...newUser, password: newPassword };
            }
            const response = await updateUser(userID, newUser)
            if(response.status === 200){
                setSuccessMessage("User update successfully !!!")
                const updateUserData = await getUser(userID, token)
                setUser(updateUserData)
                setErrorMessage("")
            }else{
                setErrorMessage("Error updating user")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }
    const handleEditPasswordClick = () => {
        setIsEditingPassword(true);
    }

  return (
    <div className="container" style={{paddingTop:"50px"}}> 
        <div className="d-flex justify-content-center mb-3 mt-5">
						<h2>EDIT USER</h2>	
		</div>
        {successMessage && (
        <div className="alert alert-success" role="alert">
            {successMessage}
        </div>
        )}
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        )}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
                <Row>
                    <Col sm="3">
                        <Form.Label className='largeLabel'>First Name:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="text" name="firstName" placeholder="Enter First Name"
                                    value={user.firstName} 
                                    onChange={handleInputChange} size="lg"/>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Row>
                    <Col sm="3">
                        <Form.Label className='largeLabel'>Last Name:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Enter Last Name" size="lg"
                                    name="lastName"
                                    value={user.lastName} 
                                    onChange={handleInputChange}/>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Row>
                    <Col sm="3">
                <Form.Label className='largeLabel'>Email:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control  type="email"  size="lg"
                                        value={user.email} 
                                        readOnly />
                    </Col>
                </Row>
                <Form.Text className="text-muted">
                    Email can't change
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Row>
                    <Col sm="3">
                        <Form.Label className='largeLabel'>Password:</Form.Label>
                    </Col>
                    <Col sm="6">
                        <Form.Control type="password"  readOnly={!isEditingPassword} 
                                    onChange={handleInputChange} 
                                    name="password" size="lg"
                                    value={user.password} />
                    </Col>
                    <Col sm="3">
                        <Button variant="outline-warning" size="lg" onClick={handleEditPasswordClick}>
                            <FaEdit/> Change Password
                        </Button>
                    </Col>
                </Row>
            </Form.Group>

            {isEditingPassword && (
                <Form.Group className="mb-3" controlId="newPassword">
                    <Row>
                        <Col sm="3">
                            <Form.Label className='largeLabel'>New Password:</Form.Label>
                        </Col>
                        <Col sm="9">
                            <Form.Control type="password" value={newPassword} size="lg"
                                        onChange={handleNewPasswordChange} />
                        </Col>
                    </Row>
                </Form.Group>
                
            )}

            {isEditingPassword && (
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Row>
                        <Col sm="3">
                            <Form.Label className='largeLabel'>Confirm Password:</Form.Label>
                        </Col>
                        <Col sm="9">
                            <Form.Control type="password" value={confirmPassword} size="lg"
                                        onChange={handleConfirmPasswordChange} />
                        </Col>
                    </Row>
                </Form.Group>
            )}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            
            <Row>
                <Button variant="outline-success" type="submit" size="lg">
                    <FaSave /> Submit
                </Button>
            </Row>
        </Form>
    </div>
  )
}

export default EditUser