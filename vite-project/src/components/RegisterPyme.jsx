import React, { useState } from 'react'
import llamadosPymes from '../services/llamadosPymes'


function RegisterPyme() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState(''); 
  const [contrasena, setContrasena] = useState('');

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
        
        <input type="file" id="fileInput" hidden/>
        <label htmlFor="fileInput" className="label">Seleccionar archivo</label>
        
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} />
        
        <button className='btn' onClick={RegistrarPyme}>Registrar Pyme</button>
      </div>
    </div>
  );
}

export default RegisterPyme