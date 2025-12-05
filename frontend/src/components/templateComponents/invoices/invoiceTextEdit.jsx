/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../Button";

const InvoiceTextEdit = ({ contractPage }) => {
  const [selectedTab, setSelectedTab] = useState("Invoice");
  return (
    <div className=" ">
      {/* Tabs */}
      {contractPage ? (
        <div>
          <h2 className="text-2xl font-medium  text-darkBlue mb-5 mt-12">
          Editing Text data
          </h2>
          <p className="mb-4 text-lg text-grayText">
            Which data should be printed?
          </p>
        </div>
      ) : (
        <div className={`flex border-b mb-4`}>
          {["Offer", "Order", "Invoice"].map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-2 text-center ${
                tab === selectedTab
                  ? "border-b-2 border-primary text-primary font-bold text-xl"
                  : "text-grayText"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      {/* Text Inputs */}
      <div className="space-y-4 ">
        {!contractPage &&(
        <div>
          <label className="block font-medium text-darkBlue mb-2">
            Text Über Der Position
          </label>
          <textarea
            rows={4}
            className="w-full p-2 border rounded-md  outline-none text-sm"
          ></textarea>
        </div>
)}
        <div>
          <label className="block font-medium text-darkBlue">
            Text Unter Den Positionen
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border rounded-md outline-none text-sm"
          >
            Das Autocenter Niederbipp AG Team Dankt Ihnen Für Den Auftrag Und
            Wünscht Gute Fahrt.
          </textarea>
        </div>
      </div>

      {/* Checkbox */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="checkbox"
          id="qr-code"
          className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-primary 
            "
        />
        <label htmlFor="qr-code" className="text-gray-700">
          QR Code für Überweisung aufdrucken
        </label>
      </div>
      <div className="flex items-center justify-end gap-5 mt-8">
          <Button
            text="Save"
            bgColor="primary"
            textColor="white"
            borderRadius="rounded-md"
            borderColor="primary"
            padding="px-12 py-2"
            // onClick={handleSave}
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
  );
};
export default InvoiceTextEdit;
