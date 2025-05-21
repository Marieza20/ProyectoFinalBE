import React from 'react'
import Pastelito from '../img/Pastelito.png'
import '../styles/Header.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  return (
    <div>
        <nav className="nav">
          <div className='menu'>
            <div className='IMG'>
              <img src={Pastelito} alt="" />
            </div>
            <ul className='elementosMenu'>
              <li>Inicio</li> 
              <li>Nosotros</li>
              <li>Contactos</li>
            </ul>
            <div>
              <i className="bi bi-list"></i>
              <i className="bi bi-person"></i>
            </div>
          </div>
        </nav>


        <nav className="navLateral">
          <div className='menuLateral'>
            <i class="bi bi-chevron-left"></i>
            <h3>Menú</h3>
          </div>
          <i className="bi bi-person"></i>
          <p>Mi perfil</p>
          <ul className='elementosMenuLateral'>
            <li>Inicio</li>
            <li>Nosotros</li>
            <li>Contactos</li>
          </ul>
        </nav>
    </div>
  )
}

export default Header