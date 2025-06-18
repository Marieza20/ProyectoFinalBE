import React, { useEffect, useState } from 'react';

function AdminPymesList() {
  const [pymes, setPymes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pymes-detalles/')
        .then(res => res.json())
        .then(data => {
        console.log('Respuesta del backend:', data); 
        setPymes(data);
    })
    .catch(err => console.error('Error al obtener pymes:', err));
  }, []);

  return (
    <div className='margen derecha'>
      <h2>Listado de Pymes</h2>
      <ul>
        {pymes.map(pyme => (
          <li key={pyme.id}>{pyme.nombre}</li>
          
        ))}
      </ul>
    </div>
  );
}

export default AdminPymesList;