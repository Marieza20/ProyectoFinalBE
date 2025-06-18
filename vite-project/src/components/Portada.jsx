import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Portada.css'
import "bootstrap-icons/font/bootstrap-icons.css";


function Portada() {
  const { id_pyme } = useParams();
  const [pyme, setPyme] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la pyme');
        }
        return response.json();
      })
      .then((data) => setPyme(data))
      .catch((error) => console.error('Error:', error));
  }, [id_pyme]);

  if (!pyme) return <div>Cargando...</div>;

  function getIconClass(nombre) {
    switch (nombre.toLowerCase()) {
      case 'whatsapp':
        return 'bi bi-whatsapp';
      case 'facebook':
        return 'bi bi-facebook';
      case 'instagram':
        return 'bi bi-instagram';
      case 'tik tok':
        return 'bi bi-tiktok';
      default:
        return 'bi bi-globe';
    }
  }

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
          <div className="flexito">
            <i className="bi bi-geo-alt-fill"></i>
            <p>{pyme.perfil?.ubicacion}</p>
          </div>
          <div className='flex'>
            <div className="flexito">
              <i className="bi bi-telephone-fill"></i>
              <p>{pyme.telefono}</p>
            </div>
            <div className="links">
              {pyme.redes && pyme.redes.map((red, index) => (
                <a key={index} href={red.url} target="_blank" rel="noopener noreferrer" aria-label={red.nombre}><i className={getIconClass(red.nombre)}></i></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portada