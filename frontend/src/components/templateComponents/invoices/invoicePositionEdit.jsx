import { useState } from "react";
import Button from "../../Button";

const InvoicePositionEdit = () => {
  const [settings, setSettings] = useState({
    arrangeValues: true,
    printDueDate: true,
    printAcceptance: false,
    printCustomerNumber: false,
    printCustomerPhone: false,
    printSender: true,
    printTireStorage: false,
    showAmountPaid: true,
    showOrderNumber: {
      order: false,
      draft: false,
      invoice: false,
      offer: true,
    },
    showPricesOnOrder: false,
    addressPosition: "left",
    nameArrangement: "lastFirst",
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const settingsOptions = [
    { key: "arrangeValues", label: "Arrange values with the same indentation" },
    { key: "printDueDate", label: "Print the due date" },
    { key: "printAcceptance", label: "Print acceptance" },
    { key: "printCustomerNumber", label: "Print customer number" },
    { key: "printCustomerPhone", label: "Print customer phone number" },
    { key: "printSender", label: "Print Sender" },
    { key: "printTireStorage", label: "Print tire storage location" },
    { key: "showAmountPaid", label: "Show the amount already paid" },
    { key: "showOrderNumber.order", label: "Show order number on order" },
    { key: "showOrderNumber.draft", label: "Show order number on draft" },
    { key: "showOrderNumber.invoice", label: "Show order number on invoice" },
    { key: "showOrderNumber.offer", label: "Show offer number on offer" },
    { key: "showPricesOnOrder", label: "Show prices on order" },
    { key: "addressPosition", label: "Address position" },
    { key: "nameArrangement", label: "Name arrangement" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-medium  text-darkBlue mb-4">
        Edit positions
      </h2>
      <p className="mb-4 text-lg text-darkBlue">
        Which data should be printed?
      </p>
      <div className=" text-darkBlue  text-sm ">
        <div className="space-y-4">
          {settingsOptions.map((option) => (
            <label key={option.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings[option.key]}
                onChange={() => toggleSetting(option.key)}
                className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-primary 
            "
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          <h3 className="font-medium ">Address position:</h3>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="address"
              checked={settings.addressPosition === "left"}
              onChange={() =>
                setSettings({ ...settings, addressPosition: "left" })
              }
              className="form-radio"
            />
            <span>Left</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="address"
              checked={settings.addressPosition === "right"}
              onChange={() =>
                setSettings({ ...settings, addressPosition: "right" })
              }
              className="form-radio"
            />
            <span>Right</span>
          </label>
        </div>

        <div className="mt-4 space-y-2.5">
          <h3 className="font-medium">Name arrangement:</h3>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="nameArrangement"
              checked={settings.nameArrangement === "lastFirst"}
              onChange={() =>
                setSettings({ ...settings, nameArrangement: "lastFirst" })
              }
              className="form-radio"
            />
            <span>Last name First Name</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="nameArrangement"
              checked={settings.nameArrangement === "firstLast"}
              onChange={() =>
                setSettings({ ...settings, nameArrangement: "firstLast" })
              }
              className="form-radio"
            />
            <span>First name Last Name</span>
          </label>
        </div>
        <div className="flex items-center justify-end gap-5">
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
    </div>
  );
};

export default InvoicePositionEdit;
