import React, { useState } from 'react'
import Portada from '../components/Portada'
import Publicaciones from '../components/Publicaciones'
import CrearPost from '../components/CrearPost'

function MiPerfilPyme() {
  const [mostrarCrearPost, setMostrarCrearPost] = useState(false);
  const onCrearPostClick = () => setMostrarCrearPost((prev) => !prev);

  return (
    <div>
      <Portada />
      <div className="botones">
        <button className='btn'>Editar Perfil</button>
        <button className='btn' onClick={onCrearPostClick}>Crear Publicación</button>
      </div>
      {mostrarCrearPost && <CrearPost />}
      <Publicaciones />
    </div>
  )
}

export default MiPerfilPyme