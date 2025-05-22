import React from 'react'
import { Link } from 'react-router-dom';


function LoginUsuario() {
  return (
    <div>
        <h1>Login Usuario</h1>

        <div>
          <label>Nombre de Usuario</label>
          <input type="text" placeholder="Nombre de Usuario" />

          <label>Contraseña</label>
          <input type="password" placeholder="Contraseña" />
        </div>

        <p>¿No tienes una cuenta? <Link to={"/RegisterUser"}>Registrate Gratis</Link></p>

        <button>Iniciar Sesión</button>
    </div>
  )
}

export default LoginUsuario