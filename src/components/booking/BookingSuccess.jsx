import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"

const BookingSuccess = () => {
	const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error
	return (
		<div className="container">
			<div className="mt-5">
				{message ? (
					<div>
						<Header title="Booking Success" />
						<h3 className="text-success"> Booking Success!</h3>
						<p className="text-success">{message}</p>
					</div>
				) : (
					<div>
						<Header title="Booking Failure" />
						<h3 className="text-danger"> Error Booking Room!</h3>
						<p className="text-danger">{error}</p>
						
					</div>
				)}
			</div>
		</div>
	)
}

export default BookingSuccess