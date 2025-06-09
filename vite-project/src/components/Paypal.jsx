import PayPalButton from './PayPalButton';

function PayPal() {
  const handleSuccess = (details) => {
    alert('Pago realizado por ' + details.payer.name.given_name);
    // Aquí puedes hacer lo que necesites con los datos del pago
  };

  return (
    <div>
      <h2>Pagar con PayPal</h2>
      <PayPalButton amount="14.99" onSuccess={handleSuccess} />
    </div>
  );
}

export default PayPal;