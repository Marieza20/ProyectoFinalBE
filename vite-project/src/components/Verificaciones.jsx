import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PayPal from './Paypal';

function Verifcaciones() {
  const [metodo, setMetodo] = useState('');
  const [pagoRealizado, setPagoRealizado] = useState(false);


  const handleSuccess = (details) => {
    setPagoRealizado(true);
    // Puedes hacer algo con los detalles del pago si lo necesitas
  };

  const handlePago = (e) => {
    e.preventDefault();
    // Aquí iría la integración real con el método de pago
    setPagoRealizado(true);
  };

  return (
    <div className='margen'>
      <h1 className='titulo'>Verificación como pyme</h1>
      <p className='center margencitob'>Realice aquí el pago de su cerificación</p>

      {pagoRealizado ? (
        <div>
          ¡Pago realizado con éxito!
        </div>
      ) : (
        <form className='form' onSubmit={handlePago}>
          <select className='margencitob' value={metodo} onChange={e => setMetodo(e.target.value)} required>
            <option value="">Seleccione el método de pago</option>
            <option value="paypal">PayPal</option>
            <option value="sinpe">Sinpe Móvil</option>
          </select>

          {metodo === 'paypal' && (
            <div className='margencitob'>
              <PayPal onSuccess={handleSuccess} />
            </div>
          )}

          {metodo === 'sinpe' && (
            <div className='margencitob'>
              <p className='center'>Realice el pago al número Sinpe: <b>6412-9832</b></p>
              <div className='form'>
                <button className='btn' type="submit">Ya pagué</button>
              </div>
            </div>
          )}
        </form>
      )}

      <p className='center'>¿Quieres verificar tu pyme? <Link className='LinkR' to="/masInfoVerificacion">Haz click aquí</Link></p>
    </div>
  );
}

export default Verifcaciones;