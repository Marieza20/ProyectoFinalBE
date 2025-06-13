import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/CardPyme.css'

function CardPyme({ pymes }) {
  if (!pymes || pymes.length === 0) {
    return <p>No hay pymes para mostrar.</p>;
  }

  return (
    <div className='margencito'>
        <div className='pymes'>
          {pymes.map((pyme) =>(
          <div className="cardP" key={pyme.id}>
            <div className="headCardP">
                <img src={`http://127.0.0.1:8000${pyme.perfil?.fotoPerfil}`} alt="" />
            </div>
            <div className='bodyCardP'>
              <h3 className='titulito'>{pyme.nombre}</h3>
              <div className="imgs">
                {pyme.imagenes && pyme.imagenes.map((imgObj, index) => (
                  <React.Fragment key={index}>
                    {imgObj.imagen1 && (
                      <div className="img">
                        <img src={`http://127.0.0.1:8000${imgObj.imagen1}`} alt={`imagen1-${index}`} />
                      </div>
                    )}
                    {imgObj.imagen2 && (
                      <div className="img">
                        <img src={`http://127.0.0.1:8000${imgObj.imagen2}`} alt={`imagen2-${index}`} />
                      </div>
                    )}
                    {imgObj.imagen3 && (
                      <div className="img">
                        <img src={`http://127.0.0.1:8000${imgObj.imagen3}`} alt={`imagen3-${index}`} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p><strong>Zona: </strong>{pyme.perfil?.ubicacion}</p>
              <p><strong>Descripción: </strong>{pyme.perfil?.descripcion}</p>
              <p><strong>Especialidad: </strong>{pyme.perfil?.especialidad}</p>
              <Link className='Link' to={`/perfilPyme/${pyme.id}`}><button className='btn'>Conoce más</button></Link>
            </div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default CardPyme