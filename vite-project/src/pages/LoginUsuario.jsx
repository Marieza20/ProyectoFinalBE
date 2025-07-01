import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'

function LoginUsuario() {
  const [nombreUser, setNombreUser] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      //console.log(response);

      if (!response.ok) {
        console.log('Credenciales incorrectas');
      }

      const data = await response.json();
      //console.log(data);

      localStorage.setItem("access", data.access);

      // Obtener datos del usuario autenticado
      const userResponse = await fetch('http://127.0.0.1:8000/api/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.access}`
        },
        credentials: 'include',
      });
      const userData = await userResponse.json();
      console.log(userData);

      

      login(userData);

      // Redirigir según el tipo de usuario
      if (userData.is_superuser) {
        navigate('/admin');
      } else if (userData.is_staff) {
        navigate('/inicioPyme');
      } else {
        navigate('/');
      }
    } catch (error) {
      Swal.fire({
        icon: "question",
        text: "Usuario o contraseña incorrectos",
        draggable: true
      });
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