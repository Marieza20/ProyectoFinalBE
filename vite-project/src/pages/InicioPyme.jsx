import React from 'react';
import { useParams } from 'react-router-dom';
import FormRedes from '../components/FormRedes'
import Imgs from '../components/Imgs'
import DatosAdicionales from '../components/DatosAdicionales'

function InicioPyme() {
  const { id_pyme } = useParams();

  return (
    <div>
      <FormRedes id_pyme={id_pyme} />
      <Imgs id_pyme={id_pyme} />
      <DatosAdicionales id_pyme={id_pyme} />
    </div>
  )
}

export default InicioPyme