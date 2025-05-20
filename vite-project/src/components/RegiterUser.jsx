import React from 'react'

function RegiterUser() {
  return (
    <div>
        <h1>RegiterUser</h1>
        <label>Nombre
        <input type="text" placeholder='Nombre' />
        </label>
        <label>Correo
        <input type="mail" placeholder='Correo' />
        </label>
        <label>Telefóno 
        <input type="number" placeholder='Teléfono' />
        </label>
        <label>Contraseña
        <input type="password" placeholder='Contraseña' />
        </label>
    </div>
  )
}

export default RegiterUser