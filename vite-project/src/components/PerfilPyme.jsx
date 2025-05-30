import React from 'react'
import '../styles/PerfilPyme.css'
import parallax from '../img/parallax.jpg'
import axoli from '../img/axoli.jpg'

function PerfilPyme() {
  return (
    <div>
      <div className='perfil-container'>
        <div className="portada"><img src={parallax} alt="" /></div>
        <div className="perfilIMG"><img src={axoli} alt="" /></div>
      </div>

      <div className="infoPyme">
        <div className="bloque">
          <h1 className="titulito">Pastelería Axoli</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum sit maiores iusto quas minima, animi ipsum natus! Iusto culpa repellat blanditiis aut consectetur.</p>
        </div>

        <div className='bloque'>
          <div className="flex">
            <i className="bi bi-geo-alt-fill"></i>
            <p>50 metros este y 25 metros norte del Ebais de San Luis, Chacarita, Puntarenas</p>
          </div>
          <div className="flex">
            <i className="bi bi-telephone-fill"></i>
            <p>+506 6053 1485</p>
          </div>
          <div className="links">
            <i className="bi bi-whatsapp"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-tiktok"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPyme