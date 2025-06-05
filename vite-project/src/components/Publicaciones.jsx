import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Publicaciones.css'

function Publicaciones() {
    const { id_pyme } = useParams();
    const [pyme, setPyme] = useState(null);

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

  return (
    <div className='margen'>
        <div className='cardPost'>
            <div className="cardHPost">
                <div className="perfil">
                    <img src={`http://127.0.0.1:8000${pyme.perfil.fotoPerfil}`} alt="" />
                </div>
                <h2 className='titulito'>{pyme.nombre}</h2>
            </div>
            <div className="cardBPost"></div>
        </div>
    </div>
  )
}

export default Publicaciones