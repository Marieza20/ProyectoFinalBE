import React from 'react'
import '../styles/SobreNosotros.css'
import { Link } from 'react-router-dom';

function InfoForm() {
  return (
    <div className='margen'>
        <h1 className='titulo'>¿Tienes una pyme dedicada</h1>
        <h1 className='titulo margencitob'>a la pastelería?</h1>
        <div className='aboutForm'>
            <h2 className='titulito'>¡Lleva tu negocio al siguiente nivel!</h2>
            <p>En nuestro sitio web, te conectamos con más clientes, te damos visibilidad en línea y te ofrecemos herramientas exclusivas para que crezcas sin complicaciones.</p>
            <strong>Regístrate gratis y empieza a destacar entre la competencia.</strong>
            <p>Tu talento merece ser visto, ¡y nosotros te ayudamos a lograrlo!</p>
            <Link className='Link' to="/registroPyme"><button className='btn'>Ir al formulario</button></Link>
        </div>
    </div>
  )
}

export default InfoForm