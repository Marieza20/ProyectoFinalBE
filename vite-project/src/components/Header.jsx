import React from 'react'
import logoPastelito from '../img/logoPastelito.png'
import '../styles/Header.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  return (
    <div>
          <div className='logo'>
            <img src={logoPastelito} alt="" />
          </div>
        <div className="fondoHeader blur">
        </div>
    </div>
  )
}

export default Header