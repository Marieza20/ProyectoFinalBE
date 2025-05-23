import React from 'react'
import { useState } from 'react'
import '../styles/Registro.css'
import llamadosUsuarios from '../services/llamadosUsuarios'

function RegisterUser() {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')



  async function registrar() {
    const obj ={
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        contrasena: contrasena
    }
    const respuestaServer = await llamadosUsuarios.postUsuarios(obj)

    console.log(respuestaServer);  
  }

  return (
    <div>
      <div className='margen form'>
        <h1>Registro de Usuario</h1>

        <input id='nombre' type="text" placeholder='Nombre de Usuario:' value={nombre} onChange={e => setNombre(e.target.value)} />
        
        <input id='correo' type="mail" placeholder='Correo Electrónico:' value={correo} onChange={e => setCorreo(e.target.value)}  />
        
        <input id='telefono' type="number" placeholder='Número de Teléfono:' value={telefono} onChange={e => setTelefono(e.target.value)}/>
        
        <input id='contrasena' type="password" placeholder='Contraseña:' value={contrasena} onChange={e => setContrasena(e.target.value)} />

        <button onClick={registrar} className='btn'>Registrar</button>
      </div>
    </div>
  )
}

export default RegisterUser