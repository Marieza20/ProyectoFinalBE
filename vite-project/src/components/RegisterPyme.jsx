import React from 'react'

function RegisterPyme() {
  return (
    <div className='margen'>
      <h1 className='titulo'>Registro de Pyme</h1>
      <div className="form">
        <input type="text" placeholder="Nombre" />

        <input type="email" placeholder="Correo" />

        <input type="tel" placeholder="Teléfono" />  

        <input type="file" placeholder="Carnet" id="fileInput" hidden/>
        <label for="fileInput" class="label">Seleccionar archivo</label>

        <input type="password" placeholder="Contraseña" />

        <button className='btn'>Registrar Pyme</button>
      </div>
    </div>
  )
}

export default RegisterPyme