import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pastelito from '../img/Pastelito.png'
import '../styles/Nav.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Nav({ abrirMenu }) {
  return (
    <div>
        <nav className="nav scroll">
            <div className='menu'>
                <div className='IMG'>
                    <Link className='Link' to={"/"}><img src={Pastelito} alt="" /></Link>
                </div>
                <ul className='elementosMenu'>
                    <li><Link className='Link' to={"/"}>Inicio</Link></li> 
                    <li><Link className='Link' to={"/sobreNosotros"}>Nosotros</Link></li>
                    <li><Link className='Link' to={"/contactos"}>Contactos</Link></li>
                </ul>
                <div className='iconos'>
                    <i className="bi bi-list" onClick={abrirMenu}></i>
                    <i className="bi bi-person"><Link className='Link' to={"/login"}></Link></i>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Nav