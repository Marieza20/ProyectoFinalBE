import React from 'react'
import '../styles/NavLateral.css'
import '../styles/Header.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function NavLateral() {

  function cerrarMenu(){

  }
  return (
    <div>
      <nav className="navLateral">
        <div className='menuLateral'>
          <i className="bi bi-chevron-left" onClick={cerrarMenu}></i>
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
      <div className="FnavLateral">
        <div className="fondoHeader"></div>
      </div>
    </div>
  )
}

export default NavLateral