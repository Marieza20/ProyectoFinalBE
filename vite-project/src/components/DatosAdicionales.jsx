import React from 'react'

function DatosAdicionales() {
  return (
    <div className='margen'>
        <h1 className='titulo'>Completa el Perfil</h1>
        <p>Llena los siguientes datos para terminar de crear tu perfil</p>

        <div className="form">
            <textarea placeholder='Descripción'></textarea>

            <input type="text" placeholder='Ubicación' />
        </div>
    </div>
  )
}

export default DatosAdicionales