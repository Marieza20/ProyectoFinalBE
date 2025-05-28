import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import llamadosUsuarios from '../services/llamadosUsuarios';
/* import { sha256 } from 'js-sha256';  */


function LoginUsuario() {

  
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  
  async function iniciar(e) {
    e.preventDefault();
    try {
      const info = {
        'username': nombre, 
        'password': contrasena
      }
      console.log(info);
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Enviar o recibir cookies
        body: JSON.stringify(info)
        
        
      });
      if (!response.ok) throw new Error('Credenciales incorrectas');
      console.log('Bienvenido ' + info['nombre']);
      navigate('/sobreNosotros');
    } catch (error) {
      console.log('Usuario o contraseña incorrectos');
    }
  }


  return (
    <div className='margen'>
        <h1 className='titulo'>Login Usuario</h1>
        <div className='form'>
          
          <input type="text" placeholder="Nombre de Usuario" value={nombre} onChange={e => setNombre(e.target.value)}/>

          <input type="password" placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)}/>
          
          <div className='btnLogin'>
            <button onClick={iniciar} className='btn'>Iniciar Sesión</button>
            <p>¿No tienes una cuenta? <Link className='LinkR' to={"/RegistroUser"}>Registrate Gratis</Link></p>
          </div>
        </div>


    </div>
  )
}

export default LoginUsuario