import React from 'react'
import { useState } from 'react'
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
        <h1 className=''>Registro de Usuario</h1>

        <label htmlFor="nombre">Nombre</label>
        <input id='nombre' type="text" placeholder='Nombre' value={nombre} onChange={e => setNombre(e.target.value)} />
        
        <label htmlFor="correo">Correo</label>
        <input id='correo' type="mail" placeholder='Correo' value={correo} onChange={e => setCorreo(e.target.value)}  />
        
        <label htmlFor="telefono">Telefóno</label>
        <input id='telefono' type="number" placeholder='Teléfono' value={telefono} onChange={e => setTelefono(e.target.value)}/>
        
        <label htmlFor="contrasena">Contraseña</label>
        <input id='contrasena' type="password" placeholder='Contraseña' value={contrasena} onChange={e => setContrasena(e.target.value)} />

        <button onClick={registrar}>Registrar</button>
    </div>
  )
}

export default RegisterUser