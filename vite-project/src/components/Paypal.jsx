import PayPalButton from './PayPalButton';

function PayPal() {
  const handleSuccess = (details) => {
    console.log('Detalles del pago:', details);
  };

  return (
    <div>
      <h2>Pagar con PayPal</h2>
      <PayPalButton amount="14.99" onSuccess={handleSuccess} />
    </div>
  );
}

export default PayPal;