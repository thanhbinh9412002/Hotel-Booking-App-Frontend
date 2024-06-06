import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import moment from "moment"
import {FaTrashAlt, FaUserCog, FaEdit, FaHistory, FaRegIdCard, FaIdCardAlt} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { Form, FormControl, Button, FormLabel, Col, Row} from "react-bootstrap"

const Profile = () => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	const [bookings, setBookings] = useState([
		{
			id: "",
			room: { id: "", roomType: "" },
			checkInDate: "",
			checkOutDate: "",
			bookingConfirmationCode: ""
		}
	])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

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

	const userID = localStorage.getItem("userId")

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userID, token)
				setBookings(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}

		fetchBookings()
	}, [userID])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(userId)
				.then((response) => {
					setMessage(response.data)
					localStorage.removeItem("token")
					localStorage.removeItem("userId")
					localStorage.removeItem("userRole")
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}


	return (
		<div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-danger">{message}</p>}
			{user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center"><FaRegIdCard /> USER INFORMATION</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<Form>
										<Form.Group
											as="img"
											src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
											alt="Profile"
											className="rounded-circle"
											style={{ width: "150px", height: "150px", objectFit: "cover", 
													marginBottom:"15px", border: "5px solid green"}}>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="Id">
											<FormLabel column sm="3"><FaIdCardAlt /> ID</FormLabel>
											<Col sm="9">
												<FormControl  type="text" value={user.id} readOnly/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="Name">
											<FormLabel column sm="3"><BsFillPeopleFill/> Name</FormLabel>
											<Col sm="9">
												<FormControl  type="text" value={user.firstName + " "+ user.lastName} readOnly/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="email">
											<FormLabel column sm="3"><MdEmail/> Email</FormLabel>
											<Col sm="9">
												<FormControl  type="text" value={user.email} readOnly />
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3" controlId="role">
											<Form.Label column sm="3"> <FaUserCog /> Roles:
											</Form.Label>
											<Col sm="9">
												<FormControl as="textarea" readOnly  value={user.roles.map(role => role.name).join('\n')}>
											</FormControl>
											</Col>
										</Form.Group>
										<Form.Group>
											<Row>
												<Col sm="6">
													<Button variant="danger" size="lg" onClick={handleDeleteAccount}>
														<FaTrashAlt/> Delete account
													</Button>
												</Col>
												<Col sm="6">
													<Link to={`/edit-user/${user.email}`} className="gap-2">
														<Button variant="danger" size="lg" onClick={() => handleShowEdit()}>
															<FaEdit /> Edit account
														</Button>
													</Link>
												</Col>
											</Row>
										</Form.Group>
									</Form>
								</div>
							</div>

							<h4 className="card-title text-center"> <FaHistory/> BOOKING HISTORY</h4>
							{bookings.length > 0 ? (
								<table className="table table-bordered table-hover shadow">
									<thead>
										<tr>
											<th scope="col">Booking ID</th>
											<th scope="col">Room ID</th>
											<th scope="col">Room Type</th>
											<th scope="col">Check In Date</th>
											<th scope="col">Check Out Date</th>
											<th scope="col">Confirmation Code</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{bookings.map((booking, index) => (
											<tr key={index}>
												<td>{booking.id}</td>
												<td>{booking.room.id}</td>
												<td>{booking.room.roomType}</td>
												<td>
													{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
												</td>
												<td>
													{moment(booking.checkOutDate)
														.subtract(1, "month")
														.format("MMM Do, YYYY")}
												</td>
												<td>{booking.bookingConfirmationCode}</td>
												<td className="text-success">On-going</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>You have not made any bookings yet.</p>
							)}
						</div>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	)
}

export default Profile