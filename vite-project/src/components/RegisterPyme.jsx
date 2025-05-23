import React from 'react'

function RegisterPyme() {
  return (
    <div>
        <h1>Registro de Pyme</h1>
        <label> Nombre de la pyme
        <input type="text" placeholder="Nombre" />
        </label>
        <label> Correo
        <input type="email" placeholder="Correo" />
        </label>
        <label> Teléfono
        <input type="tel" placeholder="Teléfono" />  
        </label>
        <label> Carnet 
        <input type="text" placeholder="Carnet" />
        </label>
        <label> Contraseña
        <input type="password" placeholder="Contraseña" />
        </label>

        <button>Registrar Pyme</button>
        
    </div>
  )
}

export default RegisterPyme