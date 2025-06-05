import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../styles/CardPyme.css'

function CardPyme() {
  const [pymes, setPymes]=useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pymes-detalles/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las pymes');
        }
        return response.json();
      })
      .then((data) => setPymes(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className='margencito'>
        <div className='pymes'>
          {pymes.map((pyme) =>(
          <div className="cardP" key={pyme.id}>
            <div className="headCardP">
                <img src={`http://127.0.0.1:8000${pyme.perfil.fotoPerfil}`} alt="" />
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
              <button className='btn'><Link className='Link' to={`/perfilPyme/${pyme.id}`}>Conoce más</Link></button>
            </div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default CardPyme