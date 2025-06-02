import React, { useState, useEffect } from 'react';
import '../styles/BarraBusqueda.css'
import llamadosPymes from '../services/llamadosPymes';

function BarrraDeBúsqueda() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [todasLasPymes, setTodasLasPymes] = useState([]);

  // Cargar todas las pymes una sola vez al montar el componente
  useEffect(() => {
    async function fetchPymes() {
      try {
        const pymes = await llamadosPymes.getPymes();
        setTodasLasPymes(pymes);
        setResultados(pymes); // Mostrar todas al inicio
      } catch (error) {
        console.error('Error al obtener las pymes:', error);
      }
    }

    fetchPymes();
  }, []);

  // Buscar automáticamente 
  useEffect(() => {
    const filtrados = todasLasPymes.filter(pyme =>
      pyme.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(filtrados);
  }, [busqueda, todasLasPymes]);

  return (
    <div className='margencito'>
      <div className="barra">
        <input type="text" placeholder="Buscar..." value={busqueda}   onChange={e => setBusqueda(e.target.value)}/>
        
        <ul>
          {resultados.length > 0 ? (
            resultados.map(pyme => (
              <li key={pyme.id}></li>
            ))
          ) : (
            busqueda && <li>No hay resultados para esta búsqueda.</li>
          )}
        </ul>
      </div>

    </div>
  );
}

export default BarrraDeBúsqueda;
