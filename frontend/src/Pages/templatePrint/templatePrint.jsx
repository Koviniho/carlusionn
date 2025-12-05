import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MainHeading from "../../components/Heading/mainHeading";
import Modal from "../../components/modal/modal";
import CustomInput from "../../components/Input/custoInput";
import Button from "../../components/Button";
import TemplateInvoices from "../../components/templateComponents/invoices/templateInvoices";
import CashReceipt from "../../components/templateComponents/cashReceipt/cashReceipt";
import TemplateContracts from "../../components/templateComponents/templateContracts/templateContracts";
import PriceList from "../../components/templateComponents/priceList/priceList";

 const TemplatePrint=()=> {
  const [selectedTab, setSelectedTab] = useState("Invoices");

  // Tab names
  const tabs = ["Invoices","Cash Receipt","Contracts","Price List"];

  // Render the content for the selected tab
  const renderTabContent = () => {
    const tabContent = {
      "Invoices": <TemplateInvoices/>,
      "Cash Receipt": <CashReceipt/>,
      "Contracts": <TemplateContracts/>,
      "Price List": <PriceList/>,
    };
    return tabContent[selectedTab] || null;
  };
  const [openLocationModal, setOpenLocationModal] = useState(false);
  return (
    <div>
      <Breadcrumb heading="Hallo, Willkommen Silas Rotzetter! 👋" />
      <MainHeading
        heading="Template Management"
        textColor="darkBlue"
        fontWeight="font-medium"
        textSize="text-[27px]"
        fontFamily="poppins"
      />
      <div className="flex space-x-4 py-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } rounded-md px-10 py-1.5 transition-colors text-lg duration-300 ease-in-out`}
          >
            {tab}
          </button>
        ))}
        {/* <button  onClick={() => setOpenLocationModal(true)} className="bg-gray-100 py-2 px-12 rounded-md text-grayText font-medium text-lg outline-none">Add Location</button> */}
      </div>

      <Modal
        isOpen={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
        title={"Add Location"}
        width={"w-[40%]"}
        setModalOpen={setOpenLocationModal}
      >
        <div className="p-4">
          {/* <p className="font-medium text-left">
            Disable two-factor authentication?
          </p>
          <p className="text-sm  text-grayText mb-4 mt-2">
            To disable two-factor authentication you must enter your password.
          </p> */}
          <div className="space-y-4">
          <CustomInput
            placeholder="vehicles"
            type="file"
            label={"Upload Images"}
            className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
          />
          <CustomInput
            placeholder="Sale"
            type="text"
            label={"Branch Name"}
           
            className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
          />
            <CustomInput
            placeholder="enter your company name"
            type="text"
            label={"Company Name"}
            className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
          />
           <CustomInput
            placeholder="address..."
            type="text"
            label={"Address"}
            className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
          />
            <CustomInput
            placeholder="vehicles"
            type="number"
            label={"No. of Vehicles"}
            className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
          />
          <div className="flex gap-8">
          <div className="flex gap-1">
           <input
           
            type="radio"
           
            className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
          />
          <p className="text-darkBlue text-sm">Current</p>

          </div>
          <div className="flex gap-1">
           <input
           
            type="radio"
           
            className="text-sm outline-none pl-4 py-3 w-4 h-4 bg-[#F5F9FE]"
          />
          <p className="text-darkBlue text-sm">Other</p>

          </div>
          </div>
          </div>
          <div className="flex items-center justify-center gap-4 my-4 mt-12 ">
            <Button
              text="Save"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => setOpenLocationModal(false)}
              className={"py-2 px-12"}
            />
            <button
              className={
                "hover:bg-none px-12 py-2 text-error border-2 border-error rounded-md font-medium"
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default TemplatePrint