import React, { useState } from 'react'
//import llamadosPymes from '../services/llamadosPymes'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';

function RegisterPyme() {
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
      <h1 className='titulo'>Registro de Pyme</h1>
      <div className="form">
        <input type="text" placeholder="Nombre de Usuario" value={username} onChange={e => setUserName(e.target.value)} />

        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        
        <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />
        
        <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />  

        <input type="file" id="fileInput" onChange={e => setImagen(e.target.files[0])}/>
        
        <div className="input-password-container">
          <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} className="input-password"/>
          <i className={`bi ${mostrarContrasena ? 'bi-eye' : 'bi-eye-slash'} icono-ojito`} onClick={toggleMostrarContrasena}></i>
        </div>

        <button className='btn' onClick={RegistrarPyme}>Registrar Pyme</button>
      </div>
    </div>
  );
}

export default RegisterPyme