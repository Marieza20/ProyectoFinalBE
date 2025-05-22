import React, { useRef } from 'react'
import logoPastelito from '../img/logoPastelito.png'
import '../styles/Header.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  const fondoRef = useRef(null);

  function scrollear() {
    if (fondoRef.current) {
      fondoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
      <div className="header">
        <div className='logo'>
          <img src={logoPastelito} alt="" />
        </div>
        <div className='flecha'>
          <i onClick={scrollear} className="bi bi-arrow-down-short"></i>
        </div>
      </div>
      <div className="fondoHeader">
      </div>

      <div ref={fondoRef}></div>
    </div>
  )
}

export default Header