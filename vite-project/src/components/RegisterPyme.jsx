import React, { useState } from 'react'
import llamadosPymes from '../services/llamadosPymes'
import "bootstrap-icons/font/bootstrap-icons.css";

function RegisterPyme() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState(''); 
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);


  const toggleMostrarContrasena = () => {
    setMostrarContrasena(prev => !prev);
  };

  const RegistrarPyme = async () => {
    llamadosPymes.registrarPyme(nombre, correo, telefono, contrasena)
  };


  return (
    <div className='margen'>
      <h1 className='titulo'>Registro de Pyme</h1>
      <div className="form">
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        
        <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />
        
        <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />  
        
        <input type="file" id="fileInput" hidden />
        <label htmlFor="fileInput" className="label">Seleccionar archivo</label>
        
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