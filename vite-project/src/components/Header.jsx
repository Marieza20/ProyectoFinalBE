import React from 'react'
import Pastelito from '../img/Pastelito.png'
import '../styles/Header.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  return (
    <div>
        <div className="fondoHeader">
          <div className='logo'>
            <img src={Pastelito} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Header