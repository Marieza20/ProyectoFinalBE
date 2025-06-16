import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarAdmin.css'; 

const Sidebar = () => (
  <div className="sidebar">
    <h2>Panel de Administración</h2>
    <ul>
      <li>
        <Link to="/pymes">CRUD Pymes</Link>
      </li>
      <li>
        <Link to="/usuarios">CRUD Usuarios</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;