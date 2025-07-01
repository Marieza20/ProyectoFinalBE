import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

function EmailJS() {
  const nombre = useRef(null)
  const correo = useRef(null)
  const mensaje = useRef(null)

  const enviarEmail = () => {
    // Validación para campos vacíos
    if (
      !nombre.current.value.trim() ||
      !correo.current.value.trim() ||
      !mensaje.current.value.trim()
    ) {
      Swal.fire({
        icon: "warning",
        text: "Todos los campos son obligatorios",
        draggable: true
      });
      return;
    }

    const Datos = {
      nomgv2v1v2bbre: nombre.current.value,
      correo: correo.current.value,
      mensaje: mensaje.current.value
    }
    emailjs.send('service_njx8sxg', 'template_5yv950h', Datos, 'KfvzwF7qsiM14swI8')
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Correo Enviado Correctamente",
          draggable: true
        });
        // Limpiar los campos
        nombre.current.value = '';
        correo.current.value = '';
        mensaje.current.value = '';
      }, (error) => {
        console.error('Error:', error);
        Swal.fire({
          text: "Error al enviar el correo",
          icon: "error",
          draggable: true
        });
      });
  }

  return (
    <div className='margen'>
      <h1 className='titulo margencitob'>Contáctanos</h1>
      <div className='form'>
        <input type="text" placeholder="Nombre" ref={nombre} />
        <input type="email" placeholder="Correo" ref={correo} />
        <textarea placeholder="Mensaje" ref={mensaje}></textarea>
        <button onClick={enviarEmail} className='btn'>Enviar</button>
      </div>
    </div>
  )
}

export default EmailJS