import React from 'react'
import '../styles/Ventajas.css'

function Ventajas() {
  return (
    <div className='margen'>
        <h1 className='titulo'>¿Qué ventajas te ofrece Pastelito?</h1>

        <div className="ventajas">
            <section>
                <h2 className='titulito'>Más Visibilidad</h2>
                <p>Nuestra plataforma ayuda a pequeños negocios de pastelería a llegar a más personas. Cada publicación permite mostrar tus productos a una comunidad activa de amantes de la repostería, aumentando tus oportunidades de venta.</p>
            </section>
            <section>
                <h2 className='titulito'>Impulso Femenino</h2>
                <p>Pastelito nace con la misión de impulsar el talento de mujeres emprendedoras que trabajan desde casa. Valoramos su esfuerzo y creatividad, ofreciéndoles un espacio donde pueden crecer profesionalmente y generar ingresos sin salir de su hogar.</p>
            </section>
            <section>
                <h2 className='titulito'>Conexión Real</h2>
                <p>Facilitamos el contacto directo entre quienes elaboran productos y quienes los buscan. A través de calificaciones, comentarios y reacciones, se crea una comunidad donde la confianza y la calidad se fortalecen día a día.</p>
            </section>
        </div>
    </div>
  )
}

export default Ventajas