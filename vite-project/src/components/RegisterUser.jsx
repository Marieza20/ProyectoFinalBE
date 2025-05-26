import React from 'react'
import { useState } from 'react'
import '../styles/Registro.css'
import llamadosUsuarios from '../services/llamadosUsuarios'


function RegisterUser() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  async function registrar() {
    const respuestaServer = await llamadosUsuarios.postUsuarios(username, email, password)
    console.log(respuestaServer);  
  }

  return (
    <div className='margen'>
      <h1 className='titulo'>Registro de Usuario</h1>
      <div className='form'>
        <input type="text" placeholder='Nombre de Usuario:' value={username} onChange={e => setUsername(e.target.value)} />

        <input type="email" placeholder='Correo Electrónico:' value={email} onChange={e => setEmail(e.target.value)}  />
        
        <input type="password" placeholder='Contraseña:' value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={registrar} className='btn'>Registrar</button>
      </div>
    </div>
  )
}

export default RegisterUser