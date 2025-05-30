import React from 'react'
import Header from '../components/Header'
import BarrraDeBúsqueda from '../components/BarrraDeBúsqueda'
import CardPyme from '../components/CardPyme'
import ImgPrueba from '../components/ImgPrueba'

function Inicio() {
  return (
    <div>
        <Header />
        <BarrraDeBúsqueda />
        <CardPyme />
        <ImgPrueba />
    </div>
  )
}

export default Inicio