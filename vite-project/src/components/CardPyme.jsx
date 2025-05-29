import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/CardPyme.css'

function CardPyme() {
  return (
    <div className='margencito'>
        <div className='pymes'>
            <div className='cardP'>
                <h3>Nombre del Pyme</h3>
                <p><strong>Zona: </strong>Ubicación del pyme</p>
                <p><strong>Descripción: </strong>Sobre la pyme, a qué se dedica y demás información relevante.</p>
                <p><strong>Especialidad: </strong>El producto estrella, en qué innova</p>
                <button className='btn'><Link className='Link' to="/perfil">Conoce más</Link></button>
            </div>
        </div>
    </div>
  )
}

export default CardPyme