import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import llamadosUsuarios from '../services/llamadosUsuarios'
import '../styles/Registro.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2'

function RegistroUser() {
  const [username, setUsername] = useState('')
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navigate = useNavigate();

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(prev => !prev);
  };


  async function registrar() {
    const respuestaServer = await llamadosUsuarios.postUsuarios(username, first_name, last_name, email, password)
    Swal.fire({
      text: "SweetAlert2 is working!",
      timer: 1000 
  });
    navigate('/login');
  }

  

  return (
    <div className='margen'>
      <h1 className='titulo margencitob'>Registro de Usuario</h1>
      <div className='form'>
        <input type="text" placeholder='Nombre de Usuario:' value={username} onChange={e => setUsername(e.target.value)} />
        
        <input type="text" placeholder="Nombre" value={first_name} onChange={e => setFirst_Name(e.target.value)}/>

        <input type="text" placeholder="Apellido" value={last_name} onChange={e => setLast_Name(e.target.value)}/>
        
        <input type="email" placeholder='Correo Electrónico:' value={email} onChange={e => setEmail(e.target.value)}  />

        <div className="input-password-container">
          <input type={mostrarContrasena ? "text" : "password"} placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="input-password"/>
          <i className={`bi ${mostrarContrasena ? 'bi-eye' : 'bi-eye-slash'} icono-ojito`} onClick={toggleMostrarContrasena}></i>
        </div>

         <p>¿Ya tienes una cuenta? <Link className='LinkR' to={"/login"}>Inicia Sesión aquí</Link></p>

        <button onClick={registrar} className='btn'>Registrar</button>
      </div>
    </div>
  )
}

export default RegistroUser