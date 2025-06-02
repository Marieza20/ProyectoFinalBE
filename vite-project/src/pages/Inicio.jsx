import React from 'react'
import Header from '../components/Header'
import BarrraDeBúsqueda from '../components/BarrraDeBúsqueda'
import ImgPrueba from '../components/ImgPrueba'
import CardPyme from '../components/CardPyme'

function Inicio() {
  return (
    <div>
        <Header />
        <BarrraDeBúsqueda />
        <CardPyme />
    </div>
  )
}

export default Inicio