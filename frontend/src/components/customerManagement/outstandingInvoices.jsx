import { FaPlus, FaRegFilePdf } from "react-icons/fa";
import Text from "../Heading/text";
import Icons from "../../assets/icons";

const OutstandingInvoices = () => {
  const invoices = [
    { number: "7335646", date: "22.12.2024" },
    { number: "7335647", date: "23.12.2024" },
    { number: "7335648", date: "24.12.2024" },
    { number: "7335649", date: "25.12.2024" },
    { number: "7335650", date: "26.12.2024" },
    { number: "7335651", date: "27.12.2024" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Text
          content="Offene Rechnungen"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
        />
        <FaPlus
          className="text-primary cursor-pointer"
          size={12}
          // onClick={() => alert("in progress")}
        />
      </div>

      <div className="space-y-2">
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="flex gap-2 items-center bg-gray-100 p-2 rounded"
          >
            <FaRegFilePdf className="text-error" size={17} />
            <p className="text-grayText text-sm">
              Rechnung Nr. <strong>{invoice.number}</strong> vom{" "}
              <strong>{invoice.date}</strong>
            </p>
          </div>
        ))}

        {/* <PlannedInvestmentCard /> */}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Text
          content="Bezahlte Rechnungen"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
        />
        <FaPlus
          className="text-primary cursor-pointer"
          size={12}
          // onClick={() => alert("in progress")}
        />
      </div>

      <div className="space-y-2">
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="flex gap-2 items-center bg-gray-100 p-2 rounded"
          >
            <FaRegFilePdf className="text-error" size={17} />
            <p className="text-grayText text-sm">
              Rechnung Nr. <strong>{invoice.number}</strong> vom{" "}
              <strong>{invoice.date}</strong>
            </p>
          </div>
        ))}

        {/* <PlannedInvestmentCard /> */}
      </div>
      <button
        //   onClick={loadMore}
        className="text-primary flex  items-center gap-1 mt-4 "
      >
        <Icons.FiPlus /> View More <Icons.IoIosArrowDown />
      </button>
    </div>
  );
};
export default OutstandingInvoices;
