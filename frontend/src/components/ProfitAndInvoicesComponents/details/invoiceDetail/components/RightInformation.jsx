/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import Text from "../../../../Heading/text";
import Documents from "./sharedComponent/Documents";
import Appointments from "./sharedComponent/Appointments";
import Calculation from "./sharedComponent/Calculation";
import { FaFilePdf } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiDownloadFill } from "react-icons/pi";
import { useState } from "react";
import { useSelector } from "react-redux";

const RightInformation = () => {
  const { singleInvoice } = useSelector(
    (state) => state?.fetchSingleInvoiceSlice
  );
  const invoiceDetail = singleInvoice?.invoice;
  const RegistrationDocuments =
  invoiceDetail?.vehicleId?.allURLs?.filter(
    (item) => item.category === "registration"
  ) || [];
  console.log("🚀 ~ Information ~ invoiceDetail:", invoiceDetail);
  const buttonIcons = [<FaFilePdf />, <MdEmail />, <PiDownloadFill />];
  return (
    <article className="space-y-6">
      <Calculation invoiceDetail={invoiceDetail} />
      <IconButtons buttonIcons={buttonIcons} />
      <Appointments />
      <section>
        <Text
          content="Notizon"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
          // icon={<FaPlus className="text-secondary cursor-pointer" size={12} />}
          iconPosition="right"
        />
        <div className="border border-lightGray rounded-sm bg-white p-2">
          <div className="max-w-[350px]">
            <Text
              content={invoiceDetail?.notes}
              textSize="text-sm"
            />
          </div>
        </div>
      </section>
      <section>
        <Text
          content="Aufgaben"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
          // icon={<FaPlus className="text-secondary cursor-pointer" size={12} />}
          iconPosition="right"
        />
        <div className="border border-lightGray rounded-sm bg-white p-2">
          <div className="max-w-[350px]">
            <Text
              content={invoiceDetail?.tasks}
              textSize="text-sm"
            />
          </div>
        </div>
      </section>
      <Documents RegistrationDocuments={RegistrationDocuments} />
    </article>
  );
};

export default RightInformation;

const IconButtons = ({ buttonIcons }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div>
      <Text
        content="Invoice"
        fontWeight="font-semibold"
        textColor="text-darkBlue"
      />
      <section className="border rounded-lg bg-white p-3 space-y-2">
        <div className="flex gap-2 items-center">
          {buttonIcons.map((icon, i) => (
            <button
              key={i}
              className={`py-2 px-5 rounded-md ${
                activeIndex === i
                  ? "bg-green-100 text-secondary"
                  : "bg-[#1E599B14] text-gray-500"
              }`}
              onClick={() => setActiveIndex(i)}
            >
              {icon}
            </button>
          ))}
        </div>
        {/* <div className="flex items-center gap-2">
          <Text textSize="text-sm" content="show more" />
          <button>
            <FaChevronDown className="text-xs" />
          </button>
        </div> */}
      </section>
    </div>
  );
};
