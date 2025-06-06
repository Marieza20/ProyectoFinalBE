import React, { useState } from 'react'

function CrearPost() {
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaPublicacion = new Date().toISOString();

    const formData = new FormData();
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);
    formData.append('fechaPublicacion', fechaPublicacion);

    try {
      const response = await fetch('TU_ENDPOINT_DEL_BACKEND', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Publicación creada correctamente');
        setDescripcion('');
        setImagen(null);
      } else {
        alert('Error al crear la publicación');
      }
    } catch (error) {
      alert('Error de red');
    }
  };

  return (
    <div>
      <h1>Crear Post</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder='Describe Tu Publicación...'
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
            <input
              type="file"
              onChange={e => setImagen(e.target.files[0])}
            />
            <button type="submit">Crear Publicación</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CrearPost