import React, { useState, useEffect } from 'react'
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";
import '../styles/Redes.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function Redes() {
  const [pyme, setPyme] = useState(null);
  const { user } = useAuth();
  const [redes, setRedes] = useState([]);
  const [todasRedes, setTodasRedes] = useState([]);
  const [redSocial, setRedSocial] = useState('');
  const [url, setUrl] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const userToken = localStorage.getItem("access")
  const idPyme = Cookies.get("idPyme")
  
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/pymes-detalles/${idPyme}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener la pyme');
        return response.json();
      })
      .then((data) => {
        setPyme(data);
        if (data.redes && data.redes.length > 0) {
          setRedes(data.redes);
        }
      })
      .catch((error) => console.error('Error:', error));

    fetch('http://127.0.0.1:8000/api/redes/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener las redes sociales');
        return response.json();
      })
      .then((data) => setTodasRedes(data))
      .catch((error) => console.error('Error:', error));
  }, []);


  const anadirRed = async () => {
    if (!pyme) {
      console.error('No se ha cargado la pyme aún');
      return;
    }

    console.log('pyme.id:', idPyme);
    const data = {
      id_pyme: idPyme,
      id_redes: redSocial,
      url: url
    };

    fetch('http://127.0.0.1:8000/api/perfil-redes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Datos enviados correctamente');
        console.log(data);
        setMostrarForm(false);

        const redSeleccionada = todasRedes.find(r => String(r.id) === String(redSocial));
        setRedes(prev => [
          ...prev,
          {
            id: redSocial,
            nombre: redSeleccionada ? redSeleccionada.nombre : 'Desconocido',
            url: url
          }
        ]);
        setRedSocial('');
        setUrl('');
      })
      .catch(err => {
        console.error('Error al enviar los datos');
        console.error(err);
      });
  };


  function getIconClass(nombre) {
    switch (nombre.toLowerCase()) {
      case 'whatsapp':
        return 'bi bi-whatsapp';
      case 'facebook':
        return 'bi bi-facebook';
      case 'instagram':
        return 'bi bi-instagram';
      case 'tik tok':
        return 'bi bi-tiktok';
      default:
        return 'bi bi-globe';
    }
  }


  return (
    <div className='margencito gap'>
      <p className='center'>Añade las redes sociales de tu negocio</p>
      {redes.length > 0 && (
        <>
          <div className='redesSociales'>
            {redes.map((red, idx) => (
              <div className="redSocial" key={red.id ? red.id : `red-${idx}`}>
                <i className={getIconClass(red.nombre)}></i>
                <div>
                  <p>{red.nombre}</p>
                  <p>{red.url}</p>
                </div>
              </div>
            ))}
            {!mostrarForm ? (
              <i className="bi bi-plus-lg" onClick={() => setMostrarForm(true)}> Añadir Red Social</i>
            ) : (
              <i className="bi bi-dash" onClick={() => setMostrarForm(false)}>Mostrar menos</i>
            )}
          </div>
        </>
      )}
      {(redes.length === 0 || mostrarForm) && (
        <div className="form">
          <select value={redSocial} onChange={e => setRedSocial(e.target.value)}>
            <option value="">Selecciona la Red Social</option>
            {todasRedes.map((red) => (
              <option key={red.id} value={red.id}>{red.nombre}</option>
            ))}
          </select>

          <input type="text" placeholder='Url Red Social' value={url} onChange={e => setUrl(e.target.value)} />

          <button className='btn' onClick={anadirRed}>Agregar Red Social</button>
        </div>
      )}
    </div>
  )
}

export default Redes