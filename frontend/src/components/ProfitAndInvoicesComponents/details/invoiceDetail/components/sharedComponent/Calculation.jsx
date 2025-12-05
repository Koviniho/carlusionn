/* eslint-disable react/prop-types */
const Calculation = ({invoiceDetail}) => {
  const totalPayments = invoiceDetail?.payments?.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );
  return (
    <article className="rounded-lg">
      <section className="bg-primary text-white py-2 px-4">
        <p className="text-lg ">Zahlungen</p>
      </section>
      <section className="bg-white border  p-3 space-y-3">
        <div className="flex justify-between ">
          <p className="text-base font-semibold">Gesamtbetrag</p>
          <p className="text-base text-gray-500">{invoiceDetail?.price} CHF</p>
        </div>
        <div className="flex justify-between ">
          <p className="text-base font-semibold">Zahlungen gesamt</p>
          <p className="text-base text-gray-500">{totalPayments} CHF</p>
        </div>
        <div className="flex justify-between ">
          <p className="text-base font-semibold">Offener Betrag</p>
          <p className="text-base text-secondary font-semibold">{invoiceDetail?.remainingAmount} CHF</p>
        </div>
      </section>
    </article>
  );
};

export default Calculation;
