import React, {useState, useEffect} from 'react'
import llamadosRedes from '../services/llamadosRedes';

function FormRedes({ id_pyme }) {
    const [redes, setRedes]=useState([]);
    const [redSocial, setRedSocial] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        async function fetchDataRedes() {
            const datos = await llamadosRedes.getRedes();
            setRedes(datos);
        }
        fetchDataRedes();
    }, []);

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
        })
        .catch(err => {
        console.error('Error al enviar los datos');
        console.error(err);
        });

    };
  return (
    <div className='margen'>
        <h1 className='titulo'>Completa el Perfil</h1>
        <p>Llena los siguientes datos para terminar de crear tu perfil</p>

        <div className="form">
          <select value={redSocial} onChange={e => setRedSocial (e.target.value)}>
            <option value="">Selecciona la Red Social</option>
            {redes.map((red) =>(
              <option key={red.id} value={red.id}>{red.nombre}</option>
            ))}
          </select>

          <input type="text" placeholder='Url Red Social' value={url} onChange={e => setUrl (e.target.value)} />
          
          <button className='btn' onClick={anadirRed}>Añadir Red Social</button>
        </div>
    </div>
  )
}

export default FormRedes