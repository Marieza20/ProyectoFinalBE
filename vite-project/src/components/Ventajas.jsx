import React, { useState, useEffect, useRef } from 'react';
import '../styles/Ventajas.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function Ventajas() {
  const [enCelular, setEnCelular] = useState(false);
  const carruselRef = useRef(null);

  useEffect(() => {
    const resizeCarrusel = () => setEnCelular(window.innerWidth <= 768);
    resizeCarrusel();
    window.addEventListener('resize', resizeCarrusel);
    return () => window.removeEventListener('resize', resizeCarrusel);
  }, []);

  const scrollLeft = () => {
    if (carruselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carruselRef.current;
      if (scrollLeft === 0) {
        carruselRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        carruselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (carruselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carruselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        carruselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carruselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };


  return (
    <div className='margen margenb'>
      <h1 className='titulo margencitob'>¿Qué ventajas te ofrece Pastelito?</h1>

      <div className={`carrusel-contenedor ${enCelular ? 'activo' : ''}`}>
        {enCelular && (<i className="bi bi-caret-left-fill flechita" onClick={scrollLeft}></i>)}

        <div ref={carruselRef} className={`ventajas ${enCelular ? 'carrusel' : ''}`}>
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

        {enCelular && (<i className="bi bi-caret-right-fill flechita" onClick={scrollRight}></i>)}
      </div>
    </div>
  );
}

export default Ventajas;
