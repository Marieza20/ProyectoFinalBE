import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/PerfilPyme.css'
import "bootstrap-icons/font/bootstrap-icons.css";


function PerfilPyme() {
  const { id } = useParams();
  const [pyme, setPyme] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la pyme');
        }
        return response.json();
      })
      .then((data) => setPyme(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  if (!pyme) return <div>Cargando...</div>;

  return (
    <div>
      <div className='perfil-container'>
        <div className="portada"><img src={`http://127.0.0.1:8000${pyme.perfil.fotoPortada}`} alt="" /></div>
        <div className="perfilIMG">
          <img src={`http://127.0.0.1:8000${pyme.perfil.fotoPerfil}`} alt="" />
        </div>
      </div>

      <div className="infoPyme">
        <div className="bloque">
          <h1 className="titulito">{pyme.nombre}</h1>
          <p>{pyme.perfil?.descripcion}</p>
        </div>

        <div className='bloque'>
          <div className="flex">
            <i className="bi bi-geo-alt-fill"></i>
            <p>{pyme.perfil?.ubicacion}</p>
          </div>
          <div className="flex">
            <i className="bi bi-telephone-fill"></i>
            <p>{pyme.telefono}</p>
          </div>
          <div className="links">
            {pyme.whatsapp && <a href={pyme.url}><i className="bi bi-whatsapp"></i></a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPyme