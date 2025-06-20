import React from 'react'
import { useAuth } from '../components/AuthContext';

function PerfilUsuario() {
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
        <button onClick={logoutbtn}>Cerrar sesión</button>
    </div>
  )
}

export default PerfilUsuario