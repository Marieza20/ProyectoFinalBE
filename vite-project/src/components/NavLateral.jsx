import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import '../styles/NavLateral.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function NavLateral({ cerrarMenu, mostrar }) {
  const { id_pyme } = useParams();
  const { user } = useAuth();

  return (
    <div>
      <nav className={`navLateral ${mostrar ? 'abierto' : ''}`}>
        <div className="fondoHeaderNL"></div>
        <div className='menuLateral'>
          <i className="bi bi-chevron-left" onClick={cerrarMenu}></i>
          <h3>Menú</h3>
        </div>
        <div className="elementosMenuLateral">
          {!user ? (
            <Link className='Link' to="/login">
              <i className="bi bi-person"></i>
              <p>Inicia Sesión</p>
            </Link>
          ) : user.is_superuser ? (
            <Link className='Link' to="/admin">
              <i className="bi bi-person"></i>
              <p>Admin</p>
            </Link>
          ) : user.is_staff ? (
            <Link className='Link' to={`/miPerfilPyme/${user.id_pyme}`}>
              <i className="bi bi-person"></i>
              <p>Mi perfil Pyme</p>
            </Link>
          ) : (
            <Link className='Link' to="/perfil">
              <i className="bi bi-person"></i>
              <p>Mi perfil</p>
            </Link>
          )}
          <ul className='lista'>
            <Link className='Link' to={"/"}>Inicio</Link>
            {user && (
              <Link className="Link" to={"/feed"}>Feed</Link>
            )}
            <Link className='Link' to={"/sobreNosotros"}>Nosotros</Link>
            <Link className='Link' to={"/contactos"}>Contactos</Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavLateral