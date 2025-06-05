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
import PerfilPyme from '../pages/PerfilPyme';
import InicioPyme from '../pages/InicioPyme';
import ScrollToTop from '../components/ScrollToTop';

function Routing() {
  return (
    <Router>
      <ScrollToTop />
      <Menu />
      <Routes>
        <Route path='/' element={<Inicio/>}></Route>
        <Route path='/sobreNosotros' element={<SobreNosotros/>}></Route>
        <Route path='/registroPyme' element={<RegistroPyme/>}></Route>
        <Route path='/registroUser' element={<RegistroUser/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/contactos' element={<PagContactos/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/perfilPyme/:id_pyme' element={<PerfilPyme/>}></Route>
        <Route path='/inicioPyme/:id_pyme' element={<InicioPyme/>}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default Routing