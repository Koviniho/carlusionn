import { useState } from "react";
import { FaChevronDown, FaRegFilePdf } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";

const Accordion = ({
  children,
  price,
  price1,
  price2,
  isPaidInvoices = true,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <section className="border rounded-lg">
      <div
        className="p-3 flex justify-between items-center cursor-pointer "
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          <FaRegFilePdf className="text-blue-400 text-lg" />
          <p className="text-sm sm:text-base">
            Rechnung Nr. <b>{price1}</b> vom <b>{price2}</b>
          </p>
          {isPaidInvoices && (
            <IoCheckmarkSharp className="text-green-800 text-base font-bold" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm sm:text-base">
            <b>CHF</b> {price}
          </p>
          <FaChevronDown
            className={` transition-all duration-300 ${
              isAccordionOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
      <hr />
      {isAccordionOpen && <div className="p-3">{children}</div>}
    </section>
  );
};

export default Accordion;
