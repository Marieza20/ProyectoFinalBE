import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Portada from '../components/Portada'
import Publicaciones from '../components/Publicaciones'
import CrearPost from '../components/CrearPost'
import Cookies from "js-cookie";

function MiPerfilPyme() {
  const [mostrarCrearPost, setMostrarCrearPost] = useState(false);
  const onCrearPostClick = () => setMostrarCrearPost((prev) => !prev);
  const idPyme = Cookies.get("idPyme")
  
  return (
    <div>
      <Portada />
      <div className="botones">
        <Link className='Link' to={`/inicioPyme/`}><button className='btn'>Editar Perfil</button></Link>
        <button className='btn' onClick={onCrearPostClick}>Crear Publicación</button>
      </div>
      {mostrarCrearPost && <CrearPost />}
      <Publicaciones />
    </div>
  )
}

export default MiPerfilPyme