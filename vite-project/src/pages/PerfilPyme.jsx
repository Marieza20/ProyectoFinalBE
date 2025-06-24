import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'
import Portada from '../components/Portada'
import AsidePerfil from '../components/AsidePerfil'
import Publicaciones from '../components/Publicaciones'

function PerfilPyme() {
  const { id_pyme } = useParams();
  const { user } = useAuth();

  if (!user) {
    return <div className='margen center'>Debes iniciar sesión para ver el perfil.</div>;
  }

  return (
    <div>
        <Portada />
        <div className="grid">
          <AsidePerfil />
          <Publicaciones id_pyme={id_pyme} />
        </div>
    </div>
  )
}

export default PerfilPyme