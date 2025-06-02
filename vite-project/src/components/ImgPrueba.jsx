import React, { useEffect, useState } from 'react';

function PymePerfil() {
  const [pyme, setPyme] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pymes/9/')
      .then(res => res.json())
      .then(data => setPyme(data));
  }, []);

  if (!pyme) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{pyme.nombre}</h2>
      <p>Usuario: {pyme.username}</p>
      <p>Correo: {pyme.correo}</p>
      <p>Teléfono: {pyme.telefono}</p>
      {pyme.carnet && (
        <img src={`${pyme.carnet}`} alt="Carnet" width={200} />
      )}
    </div>
  );
}

export default PymePerfil;