import React, { useState, useEffect } from 'react';
import CardPyme from './CardPyme';
import '../styles/BarraBusqueda.css'

function BusquedaFeed() {
    const [busqueda, setBusqueda] = useState('');
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        async function fetchPublicaciones() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/publicaciones/');
                if (!response.ok) throw new Error('Error al obtener las publicaciones');
                const data = await response.json();
                setPublicaciones(data);
            } catch (error) {
                console.error('Error al obtener las publicaciones:', error);
            }
        }

        fetchPublicaciones();
    }, []);

    const resultados = busqueda === ''
        ? publicaciones
        : publicaciones.filter(publi =>
            publi.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
            publi.pyme_nombre?.toLowerCase().includes(busqueda.toLowerCase())
        );

    if (!publicaciones || publicaciones.length === 0) {
        return <p>No hay publicaciones para mostrar.</p>;
    }

    return (
        <div className='fondoB margen'>
            <div className="barra">
                <input type="text" placeholder="Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
            </div>

            <div className="resultado margencito">
                <div className="derecha">
                    {resultados.length > 0 ? (
                        resultados.map(publi => (
                            <div className='cardPost' key={publi.id}>
                                <div className="cardHPost">
                                    <div className="fotoPerfil">
                                        <img src={`http://127.0.0.1:8000${publi.pyme_fotoPerfil}`} alt="" />
                                    </div>
                                    <div className='infoPerfil'>
                                        <h2 className='titulito'>{publi.pyme_nombre}</h2>
                                        <p>
                                            {new Date(publi.fecha_Publicacion).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <button className='follow'>Seguir</button>
                                    </div>
                                </div>
                                <div className="cardBPost">
                                    <p>{publi.descripcion}</p>
                                    <div className="img">
                                        <img src={publi.imagen} alt="" />
                                    </div>
                                </div>
                                <div className="cardFPost">
                                    {//<i class="bi bi-heart-fill"></i>
                                    }
                                    <i className="bi bi-heart"></i>
                                    <div className="rating">
                                        <input value="5" name={`rating-${publi.id}`} id={`star5-${publi.id}`} type="radio" />
                                        <label htmlFor={`star5-${publi.id}`}></label>
                                        <input value="4" name={`rating-${publi.id}`} id={`star4-${publi.id}`} type="radio" />
                                        <label htmlFor={`star4-${publi.id}`}></label>
                                        <input value="3" name={`rating-${publi.id}`} id={`star3-${publi.id}`} type="radio" />
                                        <label htmlFor={`star3-${publi.id}`}></label>
                                        <input value="2" name={`rating-${publi.id}`} id={`star2-${publi.id}`} type="radio" />
                                        <label htmlFor={`star2-${publi.id}`}></label>
                                        <input value="1" name={`rating-${publi.id}`} id={`star1-${publi.id}`} type="radio" />
                                        <label htmlFor={`star1-${publi.id}`}></label>
                                    </div>
                                    <i className="bi bi-three-dots"></i>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='p'>No hay resultados para esta búsqueda.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BusquedaFeed