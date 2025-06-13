import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Redes.css'

function Redes() {
  const { id_pyme } = useParams();
  const [pyme, setPyme] = useState(null);
  const [redes, setRedes] = useState([]);
  const [todasRedes, setTodasRedes] = useState([]);
  const [redSocial, setRedSocial] = useState('');
  const [url, setUrl] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id_pyme}/`)
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

    fetch('http://127.0.0.1:8000/api/redes/')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener las redes sociales');
        return response.json();
      })
      .then((data) => setTodasRedes(data))
      .catch((error) => console.error('Error:', error));
  }, [id_pyme]);



  const anadirRed = async () => {
    const formData = new FormData();
    formData.append('id_pyme', id_pyme);
    formData.append('id_redes', redSocial);
    formData.append('url', url);

    fetch('http://127.0.0.1:8000/api/perfil-redes/', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log('Datos enviados correctamente');
        console.log(data);
        setMostrarForm(false);
        setRedes(prev => [...prev, { id: redSocial, nombre: data.nombre, url }]);
        setRedSocial('');
        setUrl('');
      })
      .catch(err => {
        console.error('Error al enviar los datos');
        console.error(err);
      });
  };

  return (
    <div className='margencito'>
      <p className='center'>Añade las redes sociales de tu negocio</p>
      {redes.length > 0 && (
        <>
          <div className='redesSociales'>
            <div >
              {redes.map((red) => (
                <div className="redSocial" key={red.id}>
                  <div></div>
                  <div>
                    <p>{red.nombre}</p>
                    <p>{red.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className='btn' onClick={() => setMostrarForm(true)}>Añadir Red Social</button>
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

          <button className='btn' onClick={anadirRed}>Añadir Red Social</button>
        </div>
      )}
    </div>
  )
}

export default Redes