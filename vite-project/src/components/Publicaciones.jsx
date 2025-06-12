import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Publicaciones.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Publicaciones() {
    const { id_pyme } = useParams();
    const [pyme, setPyme] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(null);
    const [likes, setLikes] = useState({});
    const [publicaciones, setPublicaciones] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editDescripcion, setEditDescripcion] = useState('');
    const [editImagen, setEditImagen] = useState(null);

    const like = (id) => {
        setLikes(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

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

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener la pyme');
                }
                return response.json();
            })
            .then((data) => setPyme(data))
            .catch((error) => console.error('Error:', error));

    }, [id_pyme]);

    if (!pyme) return <div>Cargando...</div>;

    const menuClick = (id) => {
        setMenuAbierto(menuAbierto === id ? null : id);
    };

    const editar = (id) => {
        const publi = pyme.publicaciones.find(p => p.id === id);
        setEditandoId(id);
        setEditDescripcion(publi.descripcion);
        setEditImagen(null); // Cmbia solo si se selcciona una nueva imagen 
        setMenuAbierto(null);
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setEditDescripcion('');
        setEditImagen(null);
    };

    const guardarEdicion = async (id) => {
        const formData = new FormData();
        formData.append('descripcion', editDescripcion);
        if (editImagen) {
            formData.append('imagen', editImagen);
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${id}/`, {
                method: 'PATCH',
                body: formData,
            });
            if (response.ok) {
                // Actualiza la pyme para reflejar los cambios
                const pymeResponse = await fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`);
                if (pymeResponse.ok) {
                    const pymeData = await pymeResponse.json();
                    setPyme(pymeData);
                }
                setEditandoId(null);
            } else {
                console.error('Error al guardar los cambios:', response.statusText);
            }
        } catch (error) {
            console.log(`Error al guardar los cambios: ${error.message}`);
            
        }
    };

    const eliminar = async (idPublicacion) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta publicación?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${idPublicacion}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const pymeResponse = await fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`);
                if (pymeResponse.ok) {
                    const pymeData = await pymeResponse.json();
                    setPyme(pymeData);
                }
            } else {
                console.log(`Error al eliminar la publicación: ${response.statusText}`);
            }
        } catch (error) {
            console.log(`Error al eliminar la publicación: ${error.message}`);
        }
        setMenuAbierto(null);
    };

    return (
        <div className='margen'>
            <div className='derecha'>
                {pyme.publicaciones && pyme.publicaciones.length > 0 ? (
                    pyme.publicaciones.map((publi) => (
                        <div className='cardPost' key={publi.id}>
                            {editandoId === publi.id ? (
                                <div>
                                    <textarea
                                        value={editDescripcion}
                                        onChange={e => setEditDescripcion(e.target.value)}
                                        rows={4}
                                        style={{ width: '100%' }}
                                    />
                                    <div>
                                        <label>
                                            Imagen actual:
                                            <img src={`http://127.0.0.1:8000${publi.imagen}`} alt="" style={{ maxWidth: 100, display: 'block' }} />
                                        </label>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setEditImagen(e.target.files[0])}
                                    />
                                    <div style={{ marginTop: 8 }}>
                                        <button onClick={() => guardarEdicion(publi.id)}>Guardar</button>
                                        <button onClick={cancelarEdicion} style={{ marginLeft: 8 }}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="cardHPost">
                                        <div className="fotoPerfil">
                                            <img src={`http://127.0.0.1:8000${pyme.perfil.fotoPerfil}`} alt="" />
                                        </div>
                                        <div className='infoPerfil'>
                                            <h2 className='titulito'>{pyme.nombre}</h2>
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
                                            <img src={`http://127.0.0.1:8000${publi.imagen}`} alt="" />
                                        </div>
                                        <Link></Link>
                                    </div>
                                    <div className="cardFPost">
                                        <i className={likes[publi.id] ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => like(publi.id)}></i>
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
                                        <div className="tresPuntos">
                                            <i className="bi bi-three-dots" onClick={() => menuClick(publi.id)}></i>
                                            {menuAbierto === publi.id && (
                                                <div className='menuTresPuntos'>
                                                    <button onClick={() => editar(publi.id)}>Editar</button>
                                                    <button onClick={() => eliminar(publi.id)}>Eliminar</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No hay publicaciones.</div>
                )}
            </div>
        </div>
    )
}

export default Publicaciones