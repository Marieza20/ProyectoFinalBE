import React, { useEffect, useState } from 'react'
import Publicaciones from '../Publicaciones'
import DashboardAdmin from './DashboardAdmin'
import llamadosPublicaciones from '../../services/llamadosPublicaciones';

function AdminPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
      async function FetchDataPublicaciones() {
        const datos = await llamadosPublicaciones.GetPublicaciones();
        setPublicaciones(datos)
      }
      FetchDataPublicaciones();
    }, []);
  
    function editar() {
      
    }
  
    function eliminar() {
      
    }

  return (
    <div className='margen'>
      <DashboardAdmin />
      <Publicaciones mostrarTodas={true} />


      <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Nombre</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Correo</th>
              <th scope="col">Carnet</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {publicaciones.map((publi) => (
              <tr  key={publi.id}>
                <th scope="row">{publi.id}</th>
                <td>{publi.descripción}</td>
                <td>{publi.nombre}</td>
                <td>{publi.fechaPublicacion}</td>
                <td>{publi.pyme.nombre}</td>
                <td>
                  <button onClick={editar}>Editar</button>
                  <button onClick={eliminar}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default AdminPublicaciones