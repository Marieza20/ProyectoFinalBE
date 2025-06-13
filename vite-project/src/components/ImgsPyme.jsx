import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/InfoPyme.css'

function ImgsPyme() {
    const { id_pyme } = useParams();
    const [pyme, setPyme] = useState(null);
    const [imagenes, setImagenes] = useState([null, null, null]);
    const fileInputs = Array.from({ length: imagenes.length }, () => useRef());

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`)
            .then((response) => {
                if (!response.ok) throw new Error('Error al obtener la pyme');
                return response.json();
            })
            .then((data) => {
                setPyme(data);
                if (data.imagenes && data.imagenes.length > 0) {
                    const imgs = data.imagenes[0];
                    setImagenes([
                        imgs.imagen1 ? `http://127.0.0.1:8000${imgs.imagen1}` : null,
                        imgs.imagen2 ? `http://127.0.0.1:8000${imgs.imagen2}` : null,
                        imgs.imagen3 ? `http://127.0.0.1:8000${imgs.imagen3}` : null,
                    ]);
                }
            })
            .catch((error) => console.error('Error:', error));
    }, [id_pyme]);

    const fileChange = (e, idx) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('id_pyme', id_pyme);
        formData.append(`imagen${idx + 1}`, file);

        fetch('http://127.0.0.1:8000/api/imagenes/', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                setImagenes(prev => {
                    const newImgs = [...prev];
                    newImgs[idx] = URL.createObjectURL(file);
                    return newImgs;
                });
            })
            .catch(err => {
                console.error('Error al enviar la imagen', err);
            });
    };

    const triggerFileInput = idx => {
        fileInputs[idx].current.click();
    };


    if (!pyme) return <div className='center margencito'>Cargando...</div>;



    return (
        <div className='margencito'>
            <p className="center margencitob">Muestra las mejores imágenes con las que conocerán tu negocio</p>
            <div className='misImgs'>
                {imagenes.map((img, idx) => (
                    <div key={idx} className="img closeImage">
                        {img ? (
                            <>
                                <img src={img} alt="imagen" />
                                <i className="bi bi-x-circle-fill" onClick={() => triggerFileInput(idx)}></i>
                            </>
                        ) : (
                            <>
                                <label onClick={() => triggerFileInput(idx)}>
                                    <i className="bi bi-image"> Añadir imagen</i>
                                </label>
                            </>
                        )}
                        <input hidden type="file" ref={fileInputs[idx]} onChange={e => fileChange(e, idx)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImgsPyme