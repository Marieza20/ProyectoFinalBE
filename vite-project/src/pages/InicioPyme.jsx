import React from 'react';
import { useParams } from 'react-router-dom';
import Redes from '../components/Redes'
import Imgs from '../components/Imgs'
import DatosAdicionales from '../components/DatosAdicionales'

function InicioPyme() {
  const { id_pyme } = useParams();

  return (
    <div>
      <Redes id_pyme={id_pyme} />
      <Imgs id_pyme={id_pyme} />
      <DatosAdicionales id_pyme={id_pyme} />
    </div>
  )
}

export default InicioPyme