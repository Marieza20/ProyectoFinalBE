import React from 'react'
import fondoFooter from '../img/fondoFooter.png'
import '../styles/Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <img src={fondoFooter} alt="" />
      <div className="textoFooter">
        <p>Todos los derechos reservados | Pastelito, Repostería Web 2025</p>
      </div>
    </div>
  )
}

export default Footer