import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import '../styles/Publicaciones.css'
import '../styles/Estrellas.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const usuarioActualId = 1

function Publicaciones({ mostrarTodas = false, filtroBusqueda = '' }) {
    const { id_pyme } = useParams();
    const [pyme, setPyme] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editDescripcion, setEditDescripcion] = useState('');
    const [editImagen, setEditImagen] = useState(null);

    // Reacciones
    const [reacciones, setReacciones] = useState({});
    const [misReacciones, setMisReacciones] = useState({});
    const [ratings, setRatings] = useState({});

    // Segir/Dejar de seguir
    const [siguiendo, setSiguiendo] = useState({});


    const checkSiguiendo = async (idPyme) => {
        const res = await fetch(`http://127.0.0.1:8000/api/seguidores/?id_pyme=${idPyme}&id_usuario=${usuarioActualId}`);
        const data = await res.json();
        setSiguiendo(prev => ({ ...prev, [idPyme]: data.length > 0 }));
    };

    const handleSeguir = (idPyme) => {
        if (!siguiendo[idPyme]) {
            // Seguir (POST)
            fetch('http://127.0.0.1:8000/api/seguidores/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_pyme: idPyme, id_usuario: usuarioActualId })
            })
                .then(res => {
                    if (res.ok) setSiguiendo(prev => ({ ...prev, [idPyme]: true }));
                });
        } else {
            // Dejar de seguir (DELETE)
            fetch(`http://127.0.0.1:8000/api/seguidores/?id_pyme=${idPyme}&id_usuario=${usuarioActualId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        const seguidorId = data[0].id;
                        fetch(`http://127.0.0.1:8000/api/seguidores/${seguidorId}/`, {
                            method: 'DELETE'
                        }).then(() => setSiguiendo(prev => ({ ...prev, [idPyme]: false })));
                    }
                });
        }
    };

    useEffect(() => {
        // verifica seguimiento para cada pyme
        publicaciones.forEach(publi => {
            if (publi.id_pyme) checkSiguiendo(publi.id_pyme);
        });

    }, [publicaciones]);

    const rating = async (publiId, value) => {
        setRatings(prev => ({
            ...prev,
            [publiId]: value
        }));
        try {
            await fetch(`http://127.0.0.1:8000/api/calificaciones/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_publicacion: publiId,
                    id_usuario: usuarioActualId,
                    Cantidad: value,
                }),
            });
        } catch (error) {
            console.error('Error al enviar la calificación:', error);
        }
    };

    // Cargar publicaciones 
    useEffect(() => {
        async function fetchPublicaciones() {
            try {
                let url = 'http://127.0.0.1:8000/api/publicaciones/';
                if (!mostrarTodas && id_pyme) {
                    url = `http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error al obtener las publicaciones');
                const data = await response.json();
                if (mostrarTodas) {
                    setPublicaciones(data);
                } else {
                    setPyme(data);
                    setPublicaciones(data.publicaciones || []);
                }
            } catch (error) {
                console.error('Error al obtener las publicaciones:', error);
            }
        }
        fetchPublicaciones();
    }, [id_pyme, mostrarTodas]);

    // Cargar detalles de la pyme solo si no es mostrarTodas
    useEffect(() => {
        if (!mostrarTodas && id_pyme) {
            fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al obtener la pyme');
                    }
                    return response.json();
                })
                .then((data) => setPyme(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [id_pyme, mostrarTodas]);

    useEffect(() => {
        async function fetchReacciones() {
            const res = await fetch('http://127.0.0.1:8000/api/reacciones/');
            const data = await res.json();
            const counts = {};
            const mis = {};
            data.forEach(r => {
                counts[r.id_publicacion] = (counts[r.id_publicacion] || 0) + 1;
                if (r.id_usuario === usuarioActualId) {
                    mis[r.id_publicacion] = r.id; // Guarda el id de la reacción
                }
            });
            setReacciones(counts);
            setMisReacciones(mis);
        }
        fetchReacciones();
    }, [pyme, usuarioActualId, mostrarTodas]);

    // Función para dar o quitar el me gusta
    const toggleReaccion = async (idPublicacion) => {
        if (misReacciones[idPublicacion]) {
            // Quitar reacción (DELETE)
            await fetch(`http://127.0.0.1:8000/api/reacciones/${misReacciones[idPublicacion]}/`, {
                method: 'DELETE'
            });
        } else {
            // Agregar reacción (POST)
            await fetch('http://127.0.0.1:8000/api/reacciones/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_publicacion: idPublicacion,
                    id_usuario: usuarioActualId,
                    valor: 1,
                })
            });
        }
        // Refresca reacciones
        const res = await fetch('http://127.0.0.1:8000/api/reacciones/');
        const data = await res.json();
        const counts = {};
        const mis = {};
        data.forEach(r => {
            counts[r.id_publicacion] = (counts[r.id_publicacion] || 0) + 1;
            if (r.id_usuario === usuarioActualId) {
                mis[r.id_publicacion] = r.id;
            }
        });
        setReacciones(counts);
        setMisReacciones(mis);
    };

    const menuClick = (id) => {
        setMenuAbierto(menuAbierto === id ? null : id);
    };

    const editar = (id) => {
        const publi = publicaciones.find(p => p.id === id);
        setEditandoId(id);
        setEditDescripcion(publi.descripcion);
        setEditImagen(null);
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
                if (mostrarTodas) {
                    const publicacionesResponse = await fetch('http://127.0.0.1:8000/api/publicaciones/');
                    if (publicacionesResponse.ok) {
                        const publicacionesData = await publicacionesResponse.json();
                        setPublicaciones(publicacionesData);
                    }
                } else if (id_pyme) {
                    const pymeResponse = await fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`);
                    if (pymeResponse.ok) {
                        const pymeData = await pymeResponse.json();
                        setPyme(pymeData);
                        setPublicaciones(pymeData.publicaciones || []);
                    }
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
                if (mostrarTodas) {
                    const publicacionesResponse = await fetch('http://127.0.0.1:8000/api/publicaciones/');
                    if (publicacionesResponse.ok) {
                        const publicacionesData = await publicacionesResponse.json();
                        setPublicaciones(publicacionesData);
                    }
                } else if (id_pyme) {
                    const pymeResponse = await fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`);
                    if (pymeResponse.ok) {
                        const pymeData = await pymeResponse.json();
                        setPyme(pymeData);
                        setPublicaciones(pymeData.publicaciones || []);
                    }
                }
            } else {
                console.log(`Error al eliminar la publicación: ${response.statusText}`);
            }
        } catch (error) {
            console.log(`Error al eliminar la publicación: ${error.message}`);
        }
        setMenuAbierto(null);
    };

    // Filtrado por búsqueda
    const publicacionesFiltradas = filtroBusqueda
        ? publicaciones.filter(publi =>
            publi.descripcion.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
            (publi.pyme && publi.pyme.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()))
        )
        : publicaciones;

    // Si no hay publicaciones y no es mostrarTodas, muestra cargando
    if (!mostrarTodas && !pyme) return <div>Cargando...</div>;

    return (
        <div className='margencito'>
            <div className='derecha'>
                {publicacionesFiltradas && publicacionesFiltradas.length > 0 ? (
                    publicacionesFiltradas.map((publi) => (
                        <div className='cardPost' key={publi.id}>
                            {editandoId === publi.id ? (
                                <div>
                                    <div className="cardHPost">
                                        <div className="fotoPerfil">
                                            <img src={publi.pyme && publi.pyme.perfil && publi.pyme.perfil.fotoPerfil
                                                ? `http://127.0.0.1:8000${publi.pyme.perfil.fotoPerfil}`
                                                : publi.pyme_fotoPerfil ? `http://127.0.0.1:8000${publi.pyme_fotoPerfil}`
                                                    : pyme && pyme.perfil && pyme.perfil.fotoPerfil ? `http://127.0.0.1:8000${pyme.perfil.fotoPerfil}` : ''} alt="" />
                                        </div>
                                        <div className='infoPerfil'>
                                            <h2 className='titulito'>
                                                {publi.pyme && publi.pyme.nombre ? publi.pyme.nombre : publi.pyme_nombre ? publi.pyme_nombre : pyme && pyme.nombre ? pyme.nombre : ''}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className='cardBPost'>
                                        <textarea type="text" value={editDescripcion} onChange={e => setEditDescripcion(e.target.value)} />
                                        <div className="agregarImagen">
                                            <label htmlFor={`editFileInput-${publi.id}`}>
                                                {!editImagen ? (
                                                    <>
                                                        <div className="closeImage">
                                                            <img className='previewImagen' src={`http://127.0.0.1:8000${publi.imagen}`} alt="Imagen actual" />
                                                            <i onClick={() => setEditImagen(null)} className="bi bi-x-circle-fill"></i>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="closeImage">
                                                        <img className='previewImagen' src={URL.createObjectURL(editImagen)} alt="Vista previa" />
                                                        <i onClick={() => setEditImagen(null)} className="bi bi-x-circle-fill"></i>
                                                    </div>
                                                )}
                                            </label>
                                            <input hidden id={`editFileInput-${publi.id}`} type="file" accept="image/*" onChange={e => setEditImagen(e.target.files[0])} />
                                        </div>
                                    </div>
                                    <div className='cardFPostEdit'>
                                        <div>
                                            <button className='btnPost' onClick={() => guardarEdicion(publi.id)}>Guardar</button>
                                            <button className='btnPost' onClick={cancelarEdicion}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="cardHPost">
                                        <div className="fotoPerfil">
                                            <Link className='Link' to={publi.id_pyme ? `/perfilPyme/${publi.id_pyme}` : (pyme ? `/perfilPyme/${pyme.id}` : "#")}>
                                                <img src={`http://127.0.0.1:8000${publi.pyme_fotoPerfil}`} alt="" />
                                            </Link>
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
                                            <button className='follow' onClick={() => handleSeguir(publi.id_pyme)}>
                                                {siguiendo[publi.id_pyme] ? 'Siguiendo' : 'Seguir'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cardBPost">
                                        <p>{publi.descripcion}</p>
                                        <div className="img">
                                            <img src={publi.imagen ? publi.imagen.startsWith('http') ? publi.imagen : `http://127.0.0.1:8000${publi.imagen}` : ''} alt="" />
                                        </div>
                                        <Link></Link>
                                    </div>
                                    <div className="cardFPost">
                                        <div className='flexColumn'>
                                            <i
                                                className={misReacciones[publi.id] ? "bi bi-heart-fill" : "bi bi-heart"}
                                                onClick={() => toggleReaccion(publi.id)}
                                                title={misReacciones[publi.id] ? 'Quitar Me gusta' : 'Me gusta'}
                                            ></i>
                                            <span className="contador-megusta">{reacciones[publi.id] || 0}</span>
                                        </div>
                                        <div className="rating">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <React.Fragment key={star}>
                                                    <input value={star} name={`rating-${publi.id}`} id={`star${star}-${publi.id}`} type="radio" checked={ratings[publi.id] === star} onChange={() => rating(publi.id, star)} />
                                                    <label htmlFor={`star${star}-${publi.id}`}></label>
                                                </React.Fragment>
                                            ))}
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

export default Publicaciones;