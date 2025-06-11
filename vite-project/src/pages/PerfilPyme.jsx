import React from 'react'
import Portada from '../components/Portada'
import AsidePerfil from '../components/AsidePerfil'
import Publicaciones from '../components/Publicaciones'

function PerfilPyme() {
  return (
    <div>
        <Portada />
        <div className="grid">
          <AsidePerfil />
          <Publicaciones />
        </div>
    </div>
  )
}

export default PerfilPyme