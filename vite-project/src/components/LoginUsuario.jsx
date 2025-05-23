
import { Link } from 'react-router-dom';
import llamadosUsuarios from '../services/llamadosUsuarios';
import React, { useState,useEffect } from 'react'


function LoginUsuario() {

  const [usuarios, setUsuarios]=useState()
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");


  useEffect(() => {
    async function fetchDataUsers(){
      const datos = await llamadosUsuarios.getUsuarios()
      setUsuarios(datos)
    };
    fetchDataUsers();
  },[]);

  function iniciar(){}


  return (
    <div>

        <div className='margen form'>
          <h1>Login Usuario</h1>
          
          <input type="text" placeholder="Nombre de Usuario" value={nombre} onChange={e => setNombre(e.target.value)}/>

          <input type="password" placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)}/>
          
          <div className='btnLogin'>
            <button onClick={iniciar} className='btn'>Iniciar Sesión</button>
            <p>¿No tienes una cuenta? <Link className='LinkR' to={"/RegisterUser"}>Registrate Gratis</Link></p>
          </div>
        </div>


    </div>
  )
}

export default LoginUsuario