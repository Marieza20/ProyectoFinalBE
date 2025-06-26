import React from 'react';
import ImgsPyme from '../components/ImgsPyme';
import Redes from '../components/Redes'
import DatosAdicionales from '../components/DatosAdicionales'

function InicioPyme() {

  return (
    <div className='margen'>
      <h1 className='titulo'>Completa el Perfil</h1>
      <p className='center margencitob'>Llena los siguientes datos para terminar de crear tu perfil</p>
      <Redes />
      <ImgsPyme />
      <DatosAdicionales />
    </div>
  )
}

export default InicioPyme