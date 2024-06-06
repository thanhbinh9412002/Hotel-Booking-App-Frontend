import axios from 'axios'
export const api = axios.create({
    baseURL: "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
};

// this function adds a new rooms to the database
export async function addRoom(photo, roomType, roomPrice)
{
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append('roomPrice', roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status == 201)
        {
            return true
        }
    else{
        return false
    }
}

// this functions get all room types from the database
export async function getRoomTypes()
{
    try
    {
        const response = await api.get("/rooms/room/types")
        return response.data
    }
    catch(error)
    {
        throw new Error("Error fetching room types")
    }
}

//this function get all room from database
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}

//this function delete a room by id 
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`,{headers: getHeader()})
        return result.data
    }catch(error){
        throw new Error(`Error delete room ${error.message}`)
    }
}

// this function update a room
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData,{
		headers: getHeader()
	})
    // const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

//this function get a room by id
export async function getRoomById(roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

// this function save a new booking to the data
export async function bookedRoom(roomId, booked){
    try {
        const response = await  api.post(`/bookings/room/${roomId}/booked`, booked)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new  Error(`Error booking room: ${error.message}`)
        }
    }
}

// this function get all booking  from the data
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/all-booked",{headers: getHeader()})
        return result.data
    } catch (error) {
        throw new Error(`Error fetching booked: ${error.message}`)
    }
}

// this function get booking the confirmationcode
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error find booked: ${error.message}`)
        }
    }
}

//this function cancels bookings
export async function cancelBooking(bookedId){
    try {
        const result = await api.delete(`/bookings/booked/${bookedId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancel bookings: ${error.message}`)
    }
}

// This function gets all availavle rooms from the database with a given date and a room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id (email) */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/booked`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

/*This is the function to update user */
export async function updateUser(userId, userData){
    try{
        const formData = new FormData()
        formData.append("firstName", userData.firstName)
        formData.append("lastName", userData.lastName)
        formData.append("password", userData.password)
        const response = await api.put(`/users/update/${userId}`, formData,{
            headers: getHeader()
        })
    return response
    }catch(error) {
        throw new Error(`Error update user: ${error.message}`)
    }
}

export async function getAllUsers(){
    try {
        const response = await api.get("/users/all", {headers: getHeader()})
        return response.data
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`)
    }
}

export async function getUserRole(){
    try {
        const response = await api.get("users/role", {headers: getHeader()})
        return response.data
    } catch (error) {
        throw new Error(`Error fetching role: ${error.message}`)
    }
}