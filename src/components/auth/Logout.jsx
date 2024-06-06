import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { IoLogOut } from "react-icons/io5";
import { FaRegIdCard} from "react-icons/fa";

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: "You have been logged out! "}})
	}

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					<FaRegIdCard /> Profile
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="dropdown-item" onClick={handleLogout}>
				<IoLogOut /> Logout
			</button>
		</>
	)
}

export default Logout