import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../pages/Menu';
import Inicio from '../pages/Inicio';
import SobreNosotros from '../pages/SobreNosotros';
import RegistroPyme from '../pages/RegistroPyme';
import RegistroUser from '../pages/RegistroUser';
import LoginUsuario from '../pages/LoginUsuario';
import Contactos from '../pages/Contactos';
import Footer from '../components/Footer';
import PerfilPyme from '../pages/PerfilPyme';
import InicioPyme from '../pages/InicioPyme';
import ScrollToTop from '../components/ScrollToTop';
import PerfilUsuario from '../pages/PerfilUsuario';
import MiPerfilPyme from '../pages/MiPerfilPyme';
import Feed from '../pages/Feed';
import AdminDashboard from '../pages/AdminDashboard';
import AdminPymesList from '../components/Admin/AdminPymesList'
import PagoVerificaciones from '../pages/PagoVerificaciones';
import VerificaInfo from '../pages/VerificaInfo';
import AdminPublicaciones from '../components/Admin/AdminPublicaciones';
import AdminRoute from '../components/AdminRoute';

function Routing() {
  return (
    <Router>
      <ScrollToTop />
      <Menu />
      <Routes>
        <Route path="/masInfoVerificacion" element={<VerificaInfo />} />
        <Route path="/verificarCuenta" element={<PagoVerificaciones />} />

        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path="/admin/pymes" element={<AdminPymesList />} />
        <Route path="/admin/publicaciones" element={<AdminPublicaciones />} />
        <Route path='/' element={<Inicio />}></Route>
        <Route path='/sobreNosotros' element={<SobreNosotros />}></Route>
        <Route path='/registroPyme' element={<RegistroPyme />}></Route>
        <Route path='/registroUser' element={<RegistroUser />}></Route>
        <Route path='/login' element={<LoginUsuario />}></Route>
        <Route path='/contactos' element={<Contactos />}></Route>
        <Route path='/perfil' element={<PerfilUsuario />}></Route>
        <Route path='/miPerfilPyme' element={<MiPerfilPyme />}></Route>
        <Route path='/perfilPyme/:id_pyme' element={<PerfilPyme />}></Route>
        <Route path='/inicioPyme' element={<InicioPyme />}></Route>
        <Route path='/feed' element={<Feed />}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default Routing