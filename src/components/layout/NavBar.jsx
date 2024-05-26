import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
        <div className='continaer-fluid'>
            <Link to={"/"}>
                <span className='hotel-color'>Booking hotel app</span>
            </Link>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                    data-bs-targe='#navbarScroll' aria-controls='navbarScroll'
                    arria-expanded='false' aria-lable='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar