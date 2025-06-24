import React from 'react'
import Publicaciones from '../Publicaciones'
import DashboardAdmin from './DashboardAdmin'

function AdminPublicaciones() {
  return (
    <div className='margen'>
      <DashboardAdmin />
      <Publicaciones mostrarTodas={true} />
    </div>
  )
}

export default AdminPublicaciones