import React, { useEffect, useState } from 'react'
import '../styles/PerfilPyme.css'
import parallax from '../img/parallax.jpg'
import axoli from '../img/axoli.jpg'

function PerfilPyme() {
  const [pyme, setPyme] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pymes/9/')
      .then(res => res.json())
      .then(data => setPyme(data));
  }, []);

  if (!pyme) return <div>Cargando...</div>;

  return (
    <div>
      <div className='perfil-container'>
        <div className="portada"><img src={parallax} alt="" /></div>
        <div className="perfilIMG">
          <img src={pyme.carnet ? pyme.carnet : axoli} alt="" />
        </div>
      </div>

      <div className="infoPyme">
        <div className="bloque">
          <h1 className="titulito">{pyme.nombre}</h1>
          <p>{pyme.descripcion}</p>
        </div>

        <div className='bloque'>
          <div className="flex">
            <i className="bi bi-geo-alt-fill"></i>
            <p>{pyme.direccion}</p>
          </div>
          <div className="flex">
            <i className="bi bi-telephone-fill"></i>
            <p>{pyme.telefono}</p>
          </div>
          <div className="links">
            {pyme.whatsapp && <a href={pyme.whatsapp}><i className="bi bi-whatsapp"></i></a>}
            {pyme.facebook && <a href={pyme.facebook}><i className="bi bi-facebook"></i></a>}
            {pyme.instagram && <a href={pyme.instagram}><i className="bi bi-instagram"></i></a>}
            {pyme.tiktok && <a href={pyme.tiktok}><i className="bi bi-tiktok"></i></a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPyme