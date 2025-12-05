import { useState } from "react";
import MainHeading from "../../Heading/mainHeading";
import Accordion from "./component/Accordion";
import ActivePayment from "./component/ActivePayment";
import AvailablePayment from "./component/AvailablePayment";
import PaymentCard from "./component/PaymentCard";

const PaymentMethod = () => {
  const [isPaymentCard, setIsPaymentCard] = useState(true);
  return (
    <article className="space-y-5">
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading="Payment method"
      />
      <p className="font-normal text-xl sm:text-2xl text-grayText">
        Management
      </p>

      <section className="space-y-3">
        <Accordion
          heading="Aktive Zahlungsmethode"
          value="Auf Rechnung (E-Mail)"
        >
          <ActivePayment />
        </Accordion>
        <Accordion heading="Vafurgbare Zahlungsmethode">
          <AvailablePayment />
        </Accordion>
      </section>
      <button
        className="bg-blue-400 text-white py-2 px-4 rounded-md w-fit font-bold uppercase"
        onClick={() => setIsPaymentCard(!isPaymentCard)}
      >
        Neue kreditkarte hinzufugen
      </button>
      <div className="text-center">
        {isPaymentCard && <PaymentCard setIsPaymentCard={setIsPaymentCard} />}
      </div>
    </article>
  );
};

export default PaymentMethod;
