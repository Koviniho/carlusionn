import { useState } from "react";
import Button from "../../../Button";
import CustomInput from "../../../Input/custoInput";
import PopUpModel from "../../../Modals/pop-up-modals";
import InvoicePreview from "../../../templateComponents/invoices/invoicePreview";

const PayInvoiceForm = () => {
  const [pdfModalOpen, setPdfModalOpen2] = useState(false);

  const viewPdfModal = () => {
    setPdfModalOpen2(true);
  };
  return (
    <div className="space-y-3">
      <CustomInput
        label="Pay"
        type="select"
        options={[
          { label: "option 1", value: "option-1" },
          { label: "option 2", value: "option-2" },
        ]}
      />
      <CustomInput
        placeholder="300.00 CHF"
        label="Amount / Currency"
        type="number"
      />
      <CustomInput
        label="Payment Method"
        type="select"
        options={[
          { label: "Credit card", value: "credit-card" },
          { label: "Cash", value: "cash" },
        ]}
      />
      <div className="w-full border">
        <Button
          type="submit"
          text="Pay Now"
          textColor="white"
          className=" px-20 w-full"
          fontSize="text-xl"
          borderRadius="rounded-lg"
          onClick={viewPdfModal}
        />
        <PopUpModel
          trigger={null}
          modalOpen={pdfModalOpen}
          setModalOpen={setPdfModalOpen2}
          heading="PDF"
        >
          <div className="p-4">
            <InvoicePreview />
          </div>
        </PopUpModel>
      </div>
    </div>
  );
};

export default PayInvoiceForm;
