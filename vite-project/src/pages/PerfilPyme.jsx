import React from 'react'
import { useParams } from 'react-router-dom';
import Portada from '../components/Portada'
import AsidePerfil from '../components/AsidePerfil'
import Publicaciones from '../components/Publicaciones'

function PerfilPyme() {
  const { id_pyme } = useParams();
  
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