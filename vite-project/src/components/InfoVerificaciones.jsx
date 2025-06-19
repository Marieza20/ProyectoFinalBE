import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Verifica.css'

function InfoVerificaciones() {
  return (
    <div className='margen'>
      <div className="verifica">
        <h1 className='titulo'>¿Qué es la verificación?</h1>
        <section className='margencitob'>
          <p className='parrafoVerifica'>La verificación es un proceso que permite a los usuarios confirmar la autenticidad de su identidad en la plataforma. Al completar la verificación, los usuarios pueden acceder a funciones adicionales y disfrutar de una experiencia más segura.</p>
        </section>

        <h2 className='titulo'>¿Cómo funciona?</h2>
        <section className='margencitob'>
          <p>El proceso de verificación implica que con la información proporcionada por el usuario, se realicen comprobaciones para validar su identidad. Esto puede incluir la verificación de documentos de identidad, comprobación de correo electrónico o número de teléfono, entre otros. Todo esto a un precio muy accesible.</p>
        </section>

        <h2 className='titulo'>¿Por qué es importante?</h2>
        <section className='margencitob'>
          <p>La verificación es importante porque ayuda a mantener la seguridad y la confianza en la plataforma. Al verificar su identidad, los usuarios pueden estar seguros de que están interactuando con personas reales y no con cuentas falsas o fraudulentas. Además, la verificación puede ayudar a prevenir el fraude y proteger la información personal de los usuarios.</p>
        </section>
      </div>

      <p className='center'>¿Quieres verificar tu pyme? <Link className='LinkR' to="/verificarCuenta">Haz click aquí</Link></p>
    </div>
  )
}

export default InfoVerificaciones