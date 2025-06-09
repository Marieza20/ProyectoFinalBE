import React from 'react'
import Portada from '../components/Portada'
import Publicaciones from '../components/Publicaciones'

function PerfilPyme() {
  return (
    <div>
        <Portada />
        <div className="grid">
          <Publicaciones />
        </div>
    </div>
  )
}

export default PerfilPyme