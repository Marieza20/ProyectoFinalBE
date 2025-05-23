import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import NavLateral from '../components/NavLateral'
import PaletaColores from '../components/PaletaColores'
import Footer from '../components/Footer'

function Inicio() {
  return (
    <div>
        <Header />
        <Nav />
        <NavLateral />
        <PaletaColores />
        <Footer />
    </div>
  )
}

export default Inicio