/* eslint-disable react/prop-types */
import { useState } from "react";
import Images from "../../../assets/images";
import Button from "../../Button";

const InvoiceFooterEdit = ({ setSavedFooterSection, setShowSection }) => {
  const [selectedFooter, setSelectedFooter] = useState(null);
  const handleSave = () => {
    setSavedFooterSection(selectedFooter);
    setShowSection("");
  };

  const footerSections = [
    {
      id: 1,
      label: "1. Company data in 3 columns",
      type: "text",
      content: (
        <div className="grid grid-cols-3 text-[6px] text-grayText">
          <div>
            <p>Konto: Autocenter Niederbipp AG</p>
            <p>Bank: XYZ</p>
            <p>IBAN: CH83 0900 0018 4950 3</p>
          </div>
          <div>
            <p>UID-Nr.: CHE-199.615.522</p>
          </div>
          <div className="">
            <p>Tel: 032 633 60 63</p>
            <p>www.autocenterniederbipp.ch</p>
            <p>E-Mail: verkauf@acnag.ch</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      label: "2. Image over the entire foot area",
      type: "image",
      content: (
        <div className="flex justify-center">
          <img src={Images.staticLogo} alt="Logo" className="" />
        </div>
      ),
    },
    {
      id: 3,
      label: "3. Blank footer area (for pre-printed invoice paper)",
      type: "blank",
      content: <div className="h-20 bg-white"></div>,
    },
    {
      id: 4,
      label: "4. Enter your own text for the footer area",
      type: "input",
      content: (
        <textarea
          rows={4}
          className="w-full  text-xs outline-none"
          placeholder="Enter footer text..."
        />
      ),
    },
  ];
  return (
    <div className="">
      <h2 className="text-2xl font-medium  text-darkBlue">
        Edit footer section
      </h2>
      <p className="mb-4 text-lg">Select the footer style you want to use:</p>
      <div className="">
        <div>
          {footerSections.map((section) => (
            <section
              key={section.id}
              onClick={() => setSelectedFooter(section)}
            >
              <p className="text-darkBlue text-xs mb-1">{section.label}</p>
              <div
                className={`bg-white  mb-4 cursor-pointer p-4 border rounded ${
                  selectedFooter?.id === section.id
                    ? "border border-primary"
                    : "border"
                }`}
              >
                {section.content}
              </div>
            </section>
          ))}
        </div>
        <div className="flex gap-2 pb-5 mb-5 ">
          <input type="checkbox" className="w-4 " />
          <p className="text-xs">Do not print the footer area</p>
        </div>

        <div className="flex items-center justify-end gap-5">
          <Button
            text="Save"
            bgColor="primary"
            textColor="white"
            borderRadius="rounded-md"
            borderColor="primary"
            padding="px-12 py-2"
            onClick={handleSave}
          />
          <button
            className={
              "hover:bg-none px-12 py-2 text-error border border-error rounded-md "
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFooterEdit;
