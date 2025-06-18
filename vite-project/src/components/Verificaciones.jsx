import React, { useState } from 'react';
import PayPal from './Paypal';
import { Link } from 'react-router-dom';

function Verifcaciones() {
  const [metodo, setMetodo] = useState('');
  const [pagoRealizado, setPagoRealizado] = useState(false);


  const handleSuccess = (details) => {
    setPagoRealizado(true);
  };

  const handlePago = (e) => {
    e.preventDefault();
    setPagoRealizado(true);
  };

  return (
    <div>
      <h1>Realice aquí el pago de su Verificación como pyme</h1>
      {pagoRealizado ? (
        <div style={{ color: 'green', marginTop: 20 }}>
          ¡Pago realizado con éxito!
        </div>
      ) : (
        <div onSubmit={handlePago} style={{ marginTop: 20 }}>
          <label>
            Seleccione método de pago:
            <select value={metodo} onChange={e => setMetodo(e.target.value)} required>
              <option value="">--Seleccione--</option>
              <option value="paypal">PayPal</option>
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="sinpe">Sinpe Móvil</option>
            </select>
          </label>

          {metodo === 'paypal' && (
            <div style={{ marginTop: 15 }}>
              {metodo === 'paypal' && (
                <div style={{ marginTop: 15 }}>
                  <PayPal onSuccess={handleSuccess} />
                </div>
              )}
            </div>
          )}

          {metodo === 'tarjeta' && (
            <div style={{ marginTop: 15 }}>
              <input type="text" placeholder="Número de tarjeta" required />
              <input type="text" placeholder="MM/AA" required style={{ marginLeft: 10, width: 60 }} />
              <input type="text" placeholder="CVC" required style={{ marginLeft: 10, width: 50 }} />
              <button type="submit" style={{ marginLeft: 10 }}>Pagar</button>
            </div>
          )}

          {metodo === 'sinpe' && (
            <div style={{ marginTop: 15 }}>
              <p>Realice el pago al número Sinpe: <b>6412-9832</b></p>
              <button type="submit">Ya pagué</button>
              <p>¿Tenés dudas sobre la verificación de tu pyme?<Link to="/MásInfo">Toca Aquí para más información</Link>
              </p>
            </div>
          )}
        </div>
       
      )}
    </div>

    
  );
}

export default Verifcaciones;