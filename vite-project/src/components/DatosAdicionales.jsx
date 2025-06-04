import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function DatosAdicionales({ id_pyme }) {
  const [descripcion, setDescripcion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [perfil, setPerfil] = useState(null);
  const [portada, setPortada] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const AgregarDatos = async () => {
    const formData = new FormData();
      formData.append('id_pyme', id_pyme);
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