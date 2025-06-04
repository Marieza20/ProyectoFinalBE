import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import llamadosRedes from '../services/llamadosRedes';
import llamadosPymes from '../services/llamadosPymes';
import { useLocation } from 'react-router-dom';

function DatosAdicionales() {
  const [redes, setRedes]=useState([]);
  const [perfilRedes, setPerfilRedes]=useState([]);
  const [pymes, setPymes]=useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [redSocial, setRedSocial] = useState('');
  const [url, setUrl] = useState('');
  const [perfil, setPerfil] = useState(null);
  const [portada, setPortada] = useState(null);
  const [pymeSeleccionada, setPymeSeleccionada] = useState('');
  const [perfilRedSeleccionada, setperfilRedSeleccionada] = useState('');
  const location = useLocation();
  const pymeId = location.state?.pymeId;
  const navigate = useNavigate();

  useEffect(() => {
    if (pymeId) {
      setPymeSeleccionada(pymeId);
    }
  }, [pymeId]);

  useEffect(() => {
    async function fetchDataRedes() {
        const datos = await llamadosRedes.getRedes();
        setRedes(datos);
    }
    fetchDataRedes();
  }, []);

  useEffect(() => {
    async function fetchDataPerfilRedes() {
        const datos = await llamadosRedes.getPerfilRedes();
        setPerfilRedes(datos);
    }
    fetchDataPerfilRedes();
  }, []);

  useEffect(() => {
    async function fetchDataPymes() {
        const datos = await llamadosPymes.getPymes();
        setPymes(datos);
    }
    fetchDataPymes();
  }, []);

  const AgregarDatos = async () => {
    const formData = new FormData();
      formData.append('id_pyme', pymeSeleccionada);
      formData.append('id_perfilRed', perfilRedSeleccionada); 
      formData.append('fotoPerfil', perfil);
      formData.append('fotoPortada', portada);
      formData.append('especialidad', especialidad);
      formData.append('descripcion', descripcion);
      formData.append('ubicacion', direccion);

    fetch('http://127.0.0.1:8000/api/perfil-pymes/', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => {
      console.log('Datos enviados correctamente');
      console.log(data);
      navigate('/inicioPyme', { state: { pymeId: data.id } });
    })
    .catch(err => {
      console.error('Error al enviar los datos');
      console.error(err);
    });

  };

  const anadirRed = async () => {
    const formData = new FormData();
      formData.append('id_pyme', pymeSeleccionada); 
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
      navigate('/inicioPyme');
    })
    .catch(err => {
      console.error('Error al enviar los datos');
      console.error(err);
    });

  };





  return (
    <div className='margen'>
      <div className="form">
        <textarea type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>

        <textarea type="text" placeholder="Especialidad" value={especialidad} onChange={e => setEspecialidad(e.target.value)} ></textarea>

        <input type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

        <input type="file" id="fileInput" onChange={e => setPerfil(e.target.files[0])}/>

        <input type="file" id="fileInput" onChange={e => setPortada(e.target.files[0])}/>

        <button className='btn' onClick={AgregarDatos}>Agregar Datos</button>

      </div>
    </div>
  )
}

export default DatosAdicionales