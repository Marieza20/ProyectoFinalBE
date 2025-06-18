import React from 'react'
import HeaderFeed from '../components/HeaderFeed'
import BusquedaFeed from '../components/BusquedaFeed'
import AsidePerfil from '../components/AsidePerfil'


function Feed() {
  return (
    <div>
      <HeaderFeed />
        <div className="grid">
          <AsidePerfil />
          <BusquedaFeed />
        </div>
    </div>
  )
}

export default Feed