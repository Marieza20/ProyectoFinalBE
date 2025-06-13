import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

function CrearPost() {
  const { id_pyme } = useParams();
  const [pyme, setPyme] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const Publicar = async (e) => {
    e.preventDefault();
    const fechaPublicacion = new Date().toISOString();

    const formData = new FormData();
    formData.append('id_pyme', id_pyme);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);
    formData.append('fechaPublicacion', fechaPublicacion);
    formData.append('categoria', categoria);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/publicaciones/', {
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

  const subCategoria = async () => {
    if (!categoria) {
      alert('Escribe una categoría');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/publi-categorias/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: categoria, id_pyme }),
      });
      if (response.ok) {
        alert('Categoría guardada');
        setCategoria('');
      } else {
        alert('Error al guardar la categoría');
      }
    } catch (error) {
      alert('Error de red');
    }
  };

  return (
    <div className='margencito'>
      <h1 className='titulo margencitob'>Nueva Publicación</h1>
      <div className='cardPost'>
        <div className="cardHPost">
          <div className="fotoPerfil">
            {pyme && pyme.perfil && (
              <img src={`http://127.0.0.1:8000${pyme.perfil.fotoPerfil}`} alt="" />
            )}
          </div>
          <div className='infoPerfil'>
            <h2 className='titulito'>{pyme ? pyme.nombre : ''}</h2>
          </div>
        </div>
        <div className="cardBPost">
          <div className='categorias'>
            <input type="text" placeholder='Escribe una categoría' value={categoria} onChange={e => setCategoria(e.target.value)} />
            <i className="bi bi-check-lg" onClick={subCategoria}></i>
          </div>
          <textarea type="text" placeholder="Describe tu producto..." value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>
          <div className='agregarImagen'>
            <label htmlFor="fileInput">
              {!preview ? (
                <>
                  <i className="bi bi-image"></i>
                  Añadir Imagen
                </>
              ) : (
                <div className="closeImage">
                  <img className='previewImagen' src={preview} alt="Vista previa" />
                  <i onClick={e => { setImagen(null); }} className="bi bi-x-circle-fill"></i>
                </div>
              )}
            </label>
            {imagen && (
              <div>Archivo seleccionado: {imagen.name}</div>
            )}
            <input hidden id="fileInput" type="file" onChange={e => {
              setImagen(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }} />
          </div>
        </div>
        <div className="publicar">
          <button className='btnPost' onClick={Publicar}>Publicar</button>
        </div>
      </div>
    </div>
  )
}

export default CrearPost