import { useState } from "react";
import { SlWallet } from "react-icons/sl";

const Accordion = ({
  heading,
  value,
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
          <SlWallet className="text-gray-400 text-base" />
          <p className="text-sm sm:text-base font-bold">
            {heading}:{" "}
            {value && <span className="text-blue-400"> {value} </span>}
          </p>
        </div>
      </div>
      <hr />
      {isAccordionOpen && <div className="p-3">{children}</div>}
    </section>
  );
};

export default Accordion;
