import React, { useState, useEffect } from 'react';
import CardPyme from './CardPyme';
import '../styles/BarraBusqueda.css'

function BarraDeBúsqueda() {
  const [busqueda, setBusqueda] = useState('');
  const [todasLasPymes, setTodasLasPymes] = useState([]);

  useEffect(() => {
    async function fetchPymes() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/pymes-detalles/');
        if (!response.ok) throw new Error('Error al obtener las pymes');
        const data = await response.json();
        setTodasLasPymes(data);
      } catch (error) {
        console.error('Error al obtener las pymes:', error);
      }
    }

    fetchPymes();
  }, []);

  const resultados = busqueda === ''
    ? todasLasPymes
    : todasLasPymes.filter(pyme =>
      pyme.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <div className='fondoB margencito'>
      <div className="barra">
        <input type="text" placeholder="Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      </div>

      <div className="resultado">
        {resultados.length > 0 ? (
          <CardPyme pymes={resultados} />
        ) : (
          <p className='p'>No hay resultados para esta búsqueda.</p>
        )}
      </div>

    </div>
  );
}

export default BarraDeBúsqueda;
