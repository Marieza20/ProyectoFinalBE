import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Portada from '../components/Portada'
import Publicaciones from '../components/Publicaciones'
import CrearPost from '../components/CrearPost'

function MiPerfilPyme() {
  const { id_pyme } = useParams();
  const [mostrarCrearPost, setMostrarCrearPost] = useState(false);
  const onCrearPostClick = () => setMostrarCrearPost((prev) => !prev);

  return (
    <div>
      <Portada />
      <div className="botones">
        <button className='btn'><Link className='Link' to={`/inicioPyme/${id_pyme}`}>Editar Perfil</Link></button>
        <button className='btn' onClick={onCrearPostClick}>Crear Publicación</button>
      </div>
      {mostrarCrearPost && <CrearPost />}
      <Publicaciones />
    </div>
  )
}

export default MiPerfilPyme