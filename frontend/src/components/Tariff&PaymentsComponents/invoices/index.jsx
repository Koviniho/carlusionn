import { useState } from "react";
import Button from "../../Button";
import MainHeading from "../../Heading/mainHeading";
import PopUpModel from "../../Modals/pop-up-modals";
import Accordion from "./components/Accordion";
import OutstandingInvoices from "./components/OutstandingInvoices";
import PaidInvoices from "./components/PaidInvoices";
import { IoMdAdd } from "react-icons/io";
import PayInvoiceForm from "./components/PayInvoiceForm";

const Invoices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  let num = 4;

  const payInvoiceModal = () => {
    setModalOpen(true);
  };
  return (
    <article className="space-y-5">
      <section className="flex flex-col gap-y-2 items-end">
        <p className="text-sm sm:text-base">Kundennummer: 12903307</p>
        <p className="text-base sm:text-lg font-bold">Offener Betrag</p>
        <p className="text-sm sm:text-base">
          CHF <span className="text-lg sm:text-xl font-bold">89.00</span>{" "}
        </p>
        <div className="mt-7">
          <Button
            type="submit"
            text="Pay Invoice"
            textColor="white"
            className=" px-20"
            fontSize="text-xl"
            borderRadius="rounded-lg"
            icon={<IoMdAdd />}
            onClick={payInvoiceModal}
          />
        </div>
        {/* ----------------------------------------MODAL */}
        <PopUpModel
          trigger={null}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          heading="Pay Invoice"
        >
          <div className="p-4">
            <PayInvoiceForm />
          </div>
        </PopUpModel>
        {/* ----------------------------------------MODAL */}
      </section>

      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading={`${num} Outstanding Invoices`}
      />
      <section className="space-y-3">
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
          isPaidInvoices={false}
        >
          <OutstandingInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
          isPaidInvoices={false}
        >
          <OutstandingInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
          isPaidInvoices={false}
        >
          <OutstandingInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
          isPaidInvoices={false}
        >
          <OutstandingInvoices />
        </Accordion>
      </section>
      {/* Paid Invoices */}
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading={`Paid Invoices`}
      />
      <section className="space-y-3">
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
        <Accordion
          title=" Click to Expand"
          price="100"
          price1="2121621"
          price2="21768393"
        >
          <PaidInvoices />
        </Accordion>
      </section>
    </article>
  );
};

export default Invoices;
