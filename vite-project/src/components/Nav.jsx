import React from 'react'
import Pastelito from '../img/Pastelito.png'
import '../styles/Nav.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Nav() {
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
            <div className='iconos'>
                <i className="bi bi-list"></i>
                <i className="bi bi-person"></i>
            </div>
            </div>
        </nav>


        <nav className="navLateral">
            <div className='menuLateral'>
            <i className="bi bi-chevron-left"></i>
            <h3>Menú</h3>
            </div>
            <div className="elementosMenuLateral">
            <i className="bi bi-person"></i>
            <p>Mi perfil</p>
            <ul className='lista'>
                <li>Inicio</li>
                <li>Nosotros</li>
                <li>Contactos</li>
            </ul>
            </div>
        </nav>
    </div>
  )
}

export default Nav