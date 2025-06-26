import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../components/AuthContext'
import Cookies from "js-cookie";
import '../styles/InfoPyme.css'

function ImgsPyme() {
    const [pyme, setPyme] = useState(null);
    const { user } = useAuth();
    const idPyme = Cookies.get("idPyme")
    const [imagenes, setImagenes] = useState([null, null, null]);
    const [imagenesId, setImagenesId] = useState(null);
    const fileInputs = Array.from({ length: imagenes.length }, () => useRef());
    const [imgsPendientes, setImgsPendientes] = useState([null, null, null]);
    const userToken = localStorage.getItem("access")

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/pymes-detalles/${idPyme}/`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        })
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
                    setImagenesId(imgs.id);
                }
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    const fileChange = (e, idx) => {
        const file = e.target.files[0];
        if (!file) return;
        setImgsPendientes(prev => {
            const newPendiente = [...prev];
            newPendiente[idx] = file;
            return newPendiente;
        });
    };

    const uploadImage = (idx) => {
        if (!imgsPendientes.some(Boolean)) return;

        const formData = new FormData();
        formData.append('id_pyme', idPyme);
        imgsPendientes.forEach((img, i) => {
            if (img) formData.append(`imagen${i + 1}`, img);
        });

        const method = imagenesId ? 'PATCH' : 'POST';
        const url = imagenesId
            ? `http://127.0.0.1:8000/api/imagenes/${imagenesId}/`
            : 'http://127.0.0.1:8000/api/imagenes/';

        fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
            body: formData,
        })
            .then(async res => {
                const text = await res.json();
                try {
                    const json = JSON.parse(text);
                    if (!res.ok) {
                        console.error('Error del backend:', json);
                    } else {
                        console.log('Imágenes guardadas:', json);

                        if (!imagenesId && json.id) {
                            setImagenesId(json.id);
                        }

                        setImagenes(prev =>
                            prev.map((img, idx) =>
                                imgsPendientes[idx] ? URL.createObjectURL(imgsPendientes[idx]) : img
                            )
                        );
                        setImgsPendientes([null, null, null]);
                    }
                } catch (e) {
                    console.error('Respuesta no es JSON:', text);
                }
            })
            .catch(err => {
                console.error('Error al enviar la imagen', err);
            });
    };

    const cancelar = () => {
        setImgsPendientes([null, null, null]);
    };

    const triggerFileInput = idx => {
        fileInputs[idx].current.click();
    };


    if (!user) return <div className='center margencito'>Cargando...</div>;



    return (
        <div className='margencito'>
            <p className="center margencitob">Muestra las mejores imágenes con las que conocerán tu negocio</p>
            <div className='misImgs'>
                {imagenes.map((img, idx) => (
                    <div key={idx} className="img closeImage">
                        {img || imgsPendientes[idx] ? (
                            <>
                                <img src={imgsPendientes[idx] ? URL.createObjectURL(imgsPendientes[idx]) : img} alt="imagen" />
                                <i className="bi bi-x-circle-fill" onClick={() => triggerFileInput(idx)}></i>
                            </>
                        ) : (
                            <>
                                <label onClick={() => triggerFileInput(idx)}>
                                    <i className="bi bi-image"> Añadir imagen</i>
                                </label>
                            </>
                        )}
                        <input hidden type="file" ref={fileInputs[idx]} onChange={e => fileChange(e, idx)} />
                    </div>
                ))}
            </div>
            {imgsPendientes.some(Boolean) && (() => {
                const idx = imgsPendientes.findIndex(Boolean);
                return (
                    <div className="botones">
                        <button className="btn" onClick={uploadImage}>Guardar cambios</button>
                        <button className="btn" onClick={cancelar}>Cancelar</button>
                    </div>
                );
            })()}
        </div>
    )
}

export default ImgsPyme