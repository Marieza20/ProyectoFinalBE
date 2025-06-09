import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

function Imgs({ id_pyme }) {
    const [foto, setFoto] = useState(null);
    const [foto2, setFoto2] = useState(null);             
    const [foto3, setFoto3] = useState(null);

    const subir = async () => {
    const formData = new FormData();
      formData.append('id_pyme', id_pyme); 
      formData.append('imagen1', foto);
      formData.append('imagen2', foto2);
      formData.append('imagen3', foto3);

    fetch('http://127.0.0.1:8000/api/imagenes/', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => {
      console.log('imagenes enviadas correctamente');
      console.log(data);
    })
    .catch(err => {
      console.error('Error al enviar las imagenes');
      console.error(err);
    });

  };


  return (
    <div className='margen'>
      <div className="form">
        <label htmlFor="imagen1Input"><i className="bi bi-image"></i> Añadir imagen 1</label>
        <input hidden type="file" id="imagen1Input" onChange={e => setFoto(e.target.files[0])}/>
        
        <label htmlFor="imagen2Input"><i className="bi bi-image"></i> Añadir imagen 2</label>
        <input hidden type="file" id="imagen2Input" onChange={e => setFoto2(e.target.files[0])}/>
        
        <label htmlFor="imagen2Input"><i className="bi bi-image"></i> Añadir imagen 3</label>
        <input hidden type="file" id="imagen3Input" onChange={e => setFoto3(e.target.files[0])}/>
        
        <button className='btn' onClick={subir}>Subir</button>
      </div>
    </div>
  )
}

export default Imgs