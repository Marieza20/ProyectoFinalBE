import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function DatosAdicionales({ id_pyme }) {
  const [descripcion, setDescripcion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [perfil, setPerfil] = useState(null);
  const [portada, setPortada] = useState(null);
  const [datosExistentes, setDatosExistentes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/perfil-pymes/${id_pyme}/`)
      .then(res => {
        if (!res.ok) throw new Error('No hay datos');
        return res.json();
      })
      .then(data => {
        setDatosExistentes(data);
        setDescripcion(data.descripcion || '');
        setEspecialidad(data.especialidad || '');
        setDireccion(data.ubicacion || '');
      })
      .catch(err => {
        console.log('No hay perfil existente aún');
      });
  }, [id_pyme]);

  const AgregarDatos = async () => {
    const formData = new FormData();
    formData.append('id_pyme', id_pyme);
    if (perfil) formData.append('fotoPerfil', perfil);
    if (portada) formData.append('fotoPortada', portada);
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
        setDatosExistentes(data);
        setPerfil(null);
        setPortada(null);
      })
      .catch(err => {
        console.error('Error al enviar los datos');
      });

  };

  const cargar = async () => {
    const formData = new FormData();
    if (perfil) formData.append('fotoPerfil', perfil);
    if (portada) formData.append('fotoPortada', portada);
    formData.append('especialidad', especialidad);
    formData.append('descripcion', descripcion);
    formData.append('ubicacion', direccion);

    fetch(`http://127.0.0.1:8000/api/perfil-pymes/${id_pyme}/`, {
      method: 'PATCH',
      body: formData,
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          throw error;
        }
        return res.json();
      })
      .then(data => {
        console.log('Datos actualizados correctamente');
        setDatosExistentes(data);
        setPerfil(null);
        setPortada(null);
      })
      .catch(err => {
        console.error('Error al actualizar los datos', err);
        alert('Error al actualizar los datos: ' + JSON.stringify(err));
      });
  };

  const cancelar = () => {
    if (datosExistentes) {
      setDescripcion(datosExistentes.descripcion || '');
      setEspecialidad(datosExistentes.especialidad || '');
      setDireccion(datosExistentes.ubicacion || '');
      setPerfil(null);
      setPortada(null);
    }
  };


  return (
    <div className='margencito'>
      <p className='center'>Añade la información adicional para que los usuarios te conozcan</p>

      <div className="form">
        <textarea id="descripcion" type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>

        <textarea id="especialidad" type="text" placeholder="Especialidad" value={especialidad} onChange={e => setEspecialidad(e.target.value)} ></textarea>

        <input id="direccion" type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

        <div className="flexImg">
          <div className="img closeImage">
            {perfil ? (
              <>
                <img src={URL.createObjectURL(perfil)} alt="Perfil" />
                <i className="bi bi-x-circle-fill" onClick={() => document.getElementById('filePerfilInput').click()}></i>
              </>
            ) : datosExistentes && datosExistentes.fotoPerfil ? (
              <>
                <img src={datosExistentes.fotoPerfil} alt="Perfil" />
                <i className="bi bi-x-circle-fill" onClick={() => document.getElementById('filePerfilInput').click()}></i>
              </>
            ) : (
              <label onClick={() => document.getElementById('filePerfilInput').click()}>
                <i className="bi bi-image"> Añadir foto de perfil</i>
              </label>
            )}
            <input hidden type="file" id="filePerfilInput" onChange={e => setPerfil(e.target.files[0])} />
          </div>

          <div className="img closeImage">
            {portada ? (
              <>
                <img src={URL.createObjectURL(portada)} alt="Portada" />
                <i className="bi bi-x-circle-fill" onClick={() => document.getElementById('filePortadaInput').click()}></i>
              </>
            ) : datosExistentes && datosExistentes.fotoPortada ? (
              <>
                <img src={datosExistentes.fotoPortada} alt="Portada" />
                <i className="bi bi-x-circle-fill" onClick={() => document.getElementById('filePortadaInput').click()}></i>
              </>
            ) : (
              <label onClick={() => document.getElementById('filePortadaInput').click()}>
                <i className="bi bi-image"> Añadir foto de portada</i>
              </label>
            )}
            <input hidden type="file" id="filePortadaInput" onChange={e => setPortada(e.target.files[0])} />
          </div>
        </div>

        {!datosExistentes ? (
          <button className='btn' onClick={AgregarDatos}>Guardar Información</button>
        ) : (
          <>
            <div className='botones'>
              <button className='btn' onClick={cargar}>Guardar Cambios</button>
              <button className='btn' onClick={cancelar}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DatosAdicionales