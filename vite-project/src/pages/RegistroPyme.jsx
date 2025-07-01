import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2'
import llamadosUserGroup from '../services/llamadosUserGroup';

function RegistroPyme() {
  const [username, setUserName] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(prev => !prev);
  };

  const RegistrarPyme = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('telefono', telefono);
    formData.append('contrasena', contrasena);
    formData.append('carnet', imagen);

    fetch('http://127.0.0.1:8000/api/pymes/', {
      method: 'POST',
      body: formData,
    })
      .then(async res => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          const respuestaServer = await llamadosUserGroup.postUserGroup(user_id, 3)
          Swal.fire({
            icon: "success",
            text: "Datos enviados correctamente",
            timer: 1000
          });
          navigate('/login');

        } catch (e) {
          console.error('Respuesta del backend (no es JSON):', text);
          throw e;
        }
      })
      .catch(err => {
        Swal.fire({
          text: "Error al enviar los datos",
          icon: "error",
          draggable: true
        });
        console.error(err);
      });

  };

  return (
    <div className='margen'>
      <h1 className='titulo margencitob'>Registro de Pyme</h1>
      <div className="form">
        <input type="text" placeholder="Nombre de Usuario" value={username} onChange={e => setUserName(e.target.value)} />

        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

        <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />

        <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />

        <label htmlFor="fileInput">
          <i className="bi bi-image">  Carnet de manipulación de Alimentos</i>
          {imagen && (
            <div>Archivo seleccionado: {imagen.name}</div>
          )}
        </label>
        <input hidden type="file" id="fileInput" onChange={e => setImagen(e.target.files[0])} />


        <div className="input-password-container">
          <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} className="input-password" />
          <i className={`bi ${mostrarContrasena ? 'bi-eye' : 'bi-eye-slash'} icono-ojito`} onClick={toggleMostrarContrasena}></i>
        </div>

        <button className='btn' onClick={RegistrarPyme}>Registrar Pyme</button>
      </div>
    </div>
  )
}

export default RegistroPyme