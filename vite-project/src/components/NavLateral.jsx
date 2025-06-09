import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavLateral.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function NavLateral({ cerrarMenu, mostrar }) {

  return (
    <div>
      <nav className={`navLateral ${mostrar ? 'abierto' : ''}`}>
        <div className="fondoHeaderNL"></div>
        <div className='menuLateral'>
          <i className="bi bi-chevron-left" onClick={cerrarMenu}></i>
          <h3>Menú</h3>
        </div>
        <div className="elementosMenuLateral">
          <Link className='Link' to={"/login"}>
            <i className="bi bi-person"></i>
            <p>Mi perfil</p>
          </Link>
          
          <ul className='lista'>
            <Link className='Link' to={"/"}>Inicio</Link>
            <Link className='Link' to={"/feed"}>Feed</Link>
            <Link className='Link' to={"/sobreNosotros"}>Nosotros</Link>
            <Link className='Link' to={"/contactos"}>Contactos</Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavLateral