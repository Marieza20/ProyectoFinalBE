import React from 'react'
import HeaderFeed from '../components/HeaderFeed'
import BusquedaFeed from '../components/BusquedaFeed'
import AsidePerfil from '../components/AsidePerfil'
import { useAuth } from '../components/AuthContext'

function Feed() {
  const { user } = useAuth();

  if (!user) {
    return <div className='margen center'>Debes iniciar sesión para ver el feed.</div>;
  }
  
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