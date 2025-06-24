import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../styles/navAdmin.css'

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
    <div className='margen'>
      <h3 className='titulito'>Panel de Administración</h3>
      <nav className='navAdmin'>
        <Link className='LinkAd' to="/admin/usuarios">Gestionar Usuarios</Link>
        <Link className='LinkAd' to="/admin/pymes">Gestionar Pymes</Link>
        <Link className='LinkAd' to="/admin/publicaciones">Gestionar Publicaciones</Link>
        <button className='LinkAd' onClick={logoutbtn}>Cerrar Sesión</button>
      </nav>
    </div>
  );
}

export default DashboardAdmin;