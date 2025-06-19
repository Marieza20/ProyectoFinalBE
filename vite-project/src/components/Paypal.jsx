import PayPalButton from './PayPalButton';

function PayPal() {
  const handleSuccess = (details) => {
    alert('Pago realizado por ' + details.payer.name.given_name);
    // Aquí puedes hacer lo que necesites con los datos del pago
  };

  return (
    <div>
      <h2 className='titulito'>Pagar con PayPal</h2>
      <PayPalButton amount="4.99" onSuccess={handleSuccess} />
    </div>
  );
}

export default PayPal;