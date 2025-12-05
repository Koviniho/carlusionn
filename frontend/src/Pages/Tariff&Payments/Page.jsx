import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import MainHeading from "../../components/Heading/mainHeading";
import Rates from "../../components/Tariff&PaymentsComponents/rates";
import Invoices from "../../components/Tariff&PaymentsComponents/invoices";
import PaymentMethod from "../../components/Tariff&PaymentsComponents/payment-method";


const TariffAndPayments = () => {
  const [activeTab, setActiveTab] = useState("rates");

  const activeTabComponent = () => {
    switch (activeTab) {
      case "rates":
        return <Rates />;
      case "invoices":
        return <Invoices />;
      case "paymentMethod":
        return <PaymentMethod />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <Breadcrumb heading="Hallo, Willkommen Silas Rotzetter! 👋" />
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading="Invoice Overview"
      />
      <section className="flex gap-4 flex-wrap">
        <button className={` px-8 py-2 rounded-lg ${activeTab ==="rates" ? 'bg-primary text-white':'bg-[#e7e7e7]'}  `} onClick={()=> setActiveTab("rates")}> Rates</button>
         <button className={` px-8 py-2 rounded-lg ${activeTab ==="invoices" ? 'bg-primary text-white':'bg-[#e7e7e7]'}  `} onClick={()=> setActiveTab("invoices")}> Invoices</button>
         <button className={` px-8 py-2 rounded-lg ${activeTab ==="paymentMethod" ? 'bg-primary text-white':'bg-[#e7e7e7] '}  `} onClick={()=> setActiveTab("paymentMethod")}> Payments method</button>
      </section>

      <section>{activeTabComponent()}</section>
    </div>
  );
};

export default TariffAndPayments;
