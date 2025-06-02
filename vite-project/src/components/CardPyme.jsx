import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/CardPyme.css'
import axoli from '../img/axoli.jpg'
import postre from '../img/postre.jpg'
import postre2 from '../img/postre2.jpg'

function CardPyme() {



  return (
    <div className='margencito'>
        <div className='pymes'>
          <div className="cardP">
            <div className="headCardP">
                <img src={axoli} alt="" />
            </div>
            <div className='bodyCardP'>
              <h3 className='titulito'>Pastelería Axoli</h3>
              <div className="imgs">
                <div className="img"><img src={postre} alt="" /></div>
                <div className="img"><img src={postre2} alt="" /></div>
                <div className="img"><img src={postre} alt="" /></div>
              </div>
              <p><strong>Zona: </strong>Chacarita, Puntarenas</p>
              <p><strong>Descripción: </strong>Sobre la pyme, a qué se dedica y demás información relevante.</p>
              <p><strong>Especialidad: </strong>Para toda ocasión, cupcakes, mesas dulces y más.</p>
              <button className='btn'><Link className='Link' to="/perfilPyme">Conoce más</Link></button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CardPyme