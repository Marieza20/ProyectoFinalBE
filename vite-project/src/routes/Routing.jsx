import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import Inicio from '../pages/Inicio';
import SobreNosotros from '../pages/SobreNosotros';
import RegistroPyme from '../pages/RegistroPyme';
import RegistroUser from '../pages/RegistroUser';
import Login from '../pages/Login';
import PagContactos from '../pages/PagContactos';
import Footer from '../components/Footer';
import Perfil from '../components/Perfil';

function Routing() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path='/' element={<Inicio/>}></Route>
        <Route path='/sobreNosotros' element={<SobreNosotros/>}></Route>
        <Route path='/registroPyme' element={<RegistroPyme/>}></Route>
        <Route path='/registroUser' element={<RegistroUser/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/contactos' element={<PagContactos/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default Routing