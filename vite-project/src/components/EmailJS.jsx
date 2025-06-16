import React, {useRef} from 'react'
import emailjs from '@emailjs/browser'

function EmailJS() {
  const nombre = useRef('')
  const correo = useRef('') 
  const mensaje = useRef('')


  const enviarEmail = () => {
    const Datos = {
      nomgv2v1v2bbre: nombre.current.value,
      correo: correo.current.value,
      mensaje: mensaje.current.value
    }
    emailjs.send('service_njx8sxg', 'template_5yv950h', Datos, 'KfvzwF7qsiM14swI8')
      .then((response) => {
        console.log('Éxito:', response.status, response.text);
        console.log('Datos enviados:', Datos);
        
      }, (error) => {
        console.error('Error:', error);
        log('Error al enviar el correo:', error);
      });
  }


  return (
    <div className='margen'>
        <h1 className='titulo margencitob'>Contáctanos</h1>
        <div className='form'>
          <input type="text" placeholder="Nombre" ref={nombre}/>

          <input type="email" placeholder="Correo" ref={correo}/>

          <textarea placeholder="Mensaje" ref={mensaje} ></textarea>
          
          <button onClick={enviarEmail} className='btn'>Enviar</button>
        </div>
    </div>
  )
}

export default EmailJS