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
      // Aquí puedes obtener los datos del usuario si tu backend los retorna
      // Por ejemplo, si recibes un token y datos de usuario:
      // const data = await response.json();
      // login(data.usuario); // Guarda el usuario en el contexto

      // Si solo tienes el nombre de usuario:
      login({ username: nombre }); // Guarda el usuario en el contexto

      navigate('/inicioPyme');
    } catch (error) {
      console.log('Usuario o contraseña incorrectos');
    }
  }

  return (
    <div className='margen'>
      <h1 className='titulo margencitob'>Login Usuario</h1>
      <div className='form'>
        <input type="text" placeholder="Nombre de Usuario" value={nombreUser} onChange={e => setNombreUser(e.target.value)}/>
        <div className="input-password-container">
          <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} className="input-password"/>
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