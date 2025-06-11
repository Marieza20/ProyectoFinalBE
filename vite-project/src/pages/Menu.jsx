import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import NavLateral from '../components/NavLateral';

function Menu() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuAbierto(false);
  }, [location]);

  return (
    <div>
      <Nav abrirMenu={() => setMenuAbierto(true)} />
      <NavLateral mostrar={menuAbierto} cerrarMenu={() => setMenuAbierto(false)} />
    </div>
  );
}

export default Menu