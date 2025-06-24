import React, { useEffect, useState } from 'react';
import DashboardAdmin from './DashboardAdmin';

function AdminPymesList() {
  const [pymes, setPymes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pymes-detalles/')
      .then(res => res.json())
      .then(data => {
        setPymes(data);
      })
      .catch(err => console.error('Error al obtener pymes:', err));
  }, []);

  return (
    <div className='margen'>
      <DashboardAdmin />
      <h2 className='titulito margencitob'>Listado de Pymes</h2>

      <div className='pymes'>
        {pymes.map((pyme) => (
          <div className="cardP" key={pyme.id}>
            <div className="headCardP">
              <img src={`http://127.0.0.1:8000${pyme.perfil?.fotoPerfil}`} alt="" />
            </div>
            <div className='bodyCardP'>
              <div className="fotoPortada">
                <img src={`http://127.0.0.1:8000${pyme.perfil?.fotoPortada}`} alt="" />
              </div>
              <h3 className='titulito'>{pyme.nombre}</h3>

              <div>
                {pyme.redes && pyme.redes.map((redes, index) => (
                  <React.Fragment key={index}>
                    <p><b>{redes.nombre}:</b> {redes.url}</p>
                  </React.Fragment>
                ))}
              </div>

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

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPymesList;