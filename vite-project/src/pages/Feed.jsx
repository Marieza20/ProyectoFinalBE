import React from 'react'
import BusquedaFeed from '../components/BusquedaFeed'
import AsidePerfil from '../components/AsidePerfil'


function Feed() {
  return (
    <div>
        <div className="grid">
          <AsidePerfil />
          <BusquedaFeed />
        </div>
    </div>
  )
}

export default Feed