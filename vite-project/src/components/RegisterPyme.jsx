import React from 'react'

function RegisterPyme() {
  return (
    <div>
        <h1>Registro de Pyme</h1>
        <label> Nombre de la empresa
        <input type="text" placeholder="Nombre" />
        </label>
        <label> Correo
        <input type="email" placeholder="Correo" />
        </label>
        <label> Teléfono
        <input type="tel" placeholder="Teléfono" />  
        </label>
        
    </div>
  )
}

export default RegisterPyme