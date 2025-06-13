import React, { useEffect, useState } from 'react'
import '../styles/AsidePerfil.css'

function AsidePerfil() {
  const [pymes, setPymes] = useState([]);

  useEffect(() => {
    async function fetchPymes() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/pymes-detalles/');
        if (!response.ok) throw new Error('Error al obtener las pymes');
        const data = await response.json();
        setPymes(data);
      } catch (error) {
        console.error('Error al obtener las pymes:', error);
      }
    }
    fetchPymes();
  }, []);

  return (
    <div>
      <div className="izquierda">
        <div className='seguidos'>
          {pymes.length > 0 ? (
            pymes.map((pyme) => (
              <div className="imagencita" key={pyme.id}>
                <img src={`http://127.0.0.1:8000${pyme.perfil?.fotoPerfil}`} alt={pyme.nombre} />
                <h2>{pyme.nombre}</h2>
              </div>
            ))
          ) : (
            <p>Cargando perfiles...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AsidePerfil