import React from 'react'
import { useState } from 'react';
//import llamadosPerfilPyme from '../services/llamadosPerfilPyme';

function ImgPrueba() {

    const [imagen, setImagen] = useState(null);

    const foto = (e) => {
      setImagen(e.target.files[0]); 
    };

    const subirimg = () => {
        const formData = new FormData();
        formData.append('imagen', imagen);

        fetch('http://127.0.0.1:8000/api/perfil-pymes/', {
              method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            console.log('Imagen subida correctamente');
            console.log(data);
          })
          .catch(err => {
            console.error('Error al subir la imagen');
            console.error(err);
          });
    };   

  return (
    <div>
        <input type="file" onChange={foto}/>
        <button onClick={subirimg}>Subir Imagen</button>
    </div>
  )
}

export default ImgPrueba