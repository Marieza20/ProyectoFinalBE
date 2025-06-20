import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Importa el contexto
import "bootstrap-icons/font/bootstrap-icons.css";

function LoginUsuario() {
  const [nombreUser, setNombreUser] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa el método login del contexto

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(prev => !prev);
  };

  async function iniciar(e) {
    e.preventDefault();
    try {
      const info = {
        'username': nombreUser,
        'password': contrasena
      }
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(info)
      });
      if (!response.ok) throw new Error('Credenciales incorrectas');
      const data = await response.json();

      // Obtener datos del usuario autenticado
      const userResponse = await fetch('http://127.0.0.1:8000/api/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.access}`
        },
        credentials: 'include', // Si usas JWT en cookie
      });
      const userData = await userResponse.json();
      login(userData);
      
      // Redirigir según el tipo de usuario
      if (userData.is_staff || userData.is_superuser) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log('Usuario o contraseña incorrectos');
    }
  }

  return (
    <div className='margen'>
      <h1 className='titulo margencitob'>Login Usuario</h1>
      <div className='form'>
        <input type="text" placeholder="Nombre de Usuario" value={nombreUser} onChange={e => setNombreUser(e.target.value)} />
        <div className="input-password-container">
          <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} className="input-password" />
          <i className={`bi ${mostrarContrasena ? 'bi-eye' : 'bi-eye-slash'} icono-ojito`} onClick={toggleMostrarContrasena}></i>
        </div>
        <p>¿No tienes una cuenta? <Link className='LinkR' to={"/RegistroUser"}>Registrate Gratis</Link></p>
        <div className='btnLogin'>
          <button onClick={iniciar} className='btn'>Iniciar Sesión</button>
        </div>
      </div>
    </div>
  )
}

export default LoginUsuario