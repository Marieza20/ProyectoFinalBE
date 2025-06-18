import React from 'react';
import { Link } from 'react-router-dom';

function DashboardAdmin() {
  return (
    <div className='margen izquierda'>
      <h1>Panel de Administración</h1>
      <nav>
        <ul>
          <li><Link to="/admin/pymes">Gestionar Pymes</Link></li>
          <li><Link to="/admin/usuarios">Gestionar Usuarios</Link></li>
          <li><Link to="/admin/publicaciones">Gestionar Publicaciones</Link></li>
          <li><Link to="/admin/contactos">Contactos</Link></li>
        </ul>
      </nav>
      {/* Aquí puedes renderizar componentes hijos según la sección */}
    </div>
  );
}

export default DashboardAdmin;