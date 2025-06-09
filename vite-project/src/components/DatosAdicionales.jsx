import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
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
    })
    .catch(err => {
      console.error('Error al enviar los datos');
      console.error(err);
    });

  };


  return (
    <div className='margen'>
      <div className="form">
        <p className='center'>Añade la información adicional para que los usuarios te conozcan</p>
        <textarea id="descripcion" type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>

        <textarea id="especialidad" type="text" placeholder="Especialidad" value={especialidad} onChange={e => setEspecialidad(e.target.value)} ></textarea>

        <input id="direccion" type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

        <label htmlFor="filePerfilInput">
          <i className="bi bi-image"> Añadir foto de perfil</i>
          {perfil && (
            <div>Archivo seleccionado: {perfil.name}</div>
          )} 
        </label>
        <input hidden type="file" id="filePerfilInput" onChange={e => setPerfil(e.target.files[0])}/>

        <label htmlFor="filePortadaInput">
          <i className="bi bi-image"> Añadir foto de portada</i>
          {portada && (
            <div>Archivo seleccionado: {portada.name}</div>
          )} 
        </label>
        <input hidden type="file" id="filePortadaInput" onChange={e => setPortada(e.target.files[0])}/>

        <button className='btn' onClick={AgregarDatos}>Agregar Datos</button>

      </div>
    </div>
  )
}

export default DatosAdicionales