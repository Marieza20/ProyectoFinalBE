import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function DashboardAdmin() {
  const { logout } = useAuth();

  async function logoutbtn() {
    try {   
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      logout();
      if (response.ok) {

        window.location.href = '/';

      }
    }
    catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  
  return (
    <div className='margen izquierda'>
      <h3>Panel de Administración</h3>
      <nav>
        <ul>
          <li><Link to="/admin/pymes">Gestionar Pymes</Link></li>
          <li><Link to="/admin/usuarios">Gestionar Usuarios</Link></li>
          <li><Link to="/admin/publicaciones">Gestionar Publicaciones</Link></li>
          <li><Link to="/admin/contactos">Contactos</Link></li>
        </ul>

        <button onClick={logoutbtn}>Cerrar Sesión</button>
      </nav>
    </div>
  );
}

export default DashboardAdmin;