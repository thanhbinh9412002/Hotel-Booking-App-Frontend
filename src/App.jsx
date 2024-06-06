//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from "./components/room/ExistingRooms"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditRoom from "./components/room/EditRoom"
import Home from "./components/home/Home"
import Footer from "./components/layout/Footer"
import NavBar from "./components/layout/NavBar"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/Checkout"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings"
import FindBooking from "./components/booking/FindBooking"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import EditUser from "./components/auth/EditUser";
import ManageUser from "./components/auth/ManageUser";

function App() {

  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              <Route path="/add-room" element={<AddRoom />} />

              <Route
                path="/book-room/:roomId"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="/browse-all-rooms" element={<RoomListing />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/manage-user" element={<ManageUser />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/existing-bookings" element={<Bookings />} />
              <Route path="/find-booking" element={<FindBooking />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-user/:userId" element={<EditUser />} />
            </Routes>
          </Router>
        <Footer/>
      </main>
    </AuthProvider>
  )
}

export default App
