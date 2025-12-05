/* eslint-disable react/prop-types */
import React, { useState } from "react";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import { MdDelete } from "react-icons/md";
import CustomInput from "../Input/custoInput";
import CustomSelect from "../customSelect/customSelect";
function DunningProcess() {
  const tabs = [
    { label: "1.Mahnung", component: <Tabs amount="10 CHF" /> },
    { label: "2.Mahnung", component: <Tabs amount="25 CHF" /> },
    { label: "3.Mahnung", component: <Tabs amount="50 CHF" /> },
    { label: "Collection Step", component: <Tabs amount="100 CHF" /> },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].label);
  const options = [
    { label: "dunning", value: "-" },
    { label: "Mahnung", component: "-" },
    { label: "Tahnung", component: "-" },
  ];
  return (
    <div>
      <MainHeading
        heading="Dunning settings"
        textColor="darkBlue"
        textSize="text-[24px]"
        fontFamily="Poppins"
      />
      <div className="flex flex-col py-2">
        <Text
          content={"Zahlungsfrist"}
          textColor="darkBlue"
          textSize="text-[20px]"
        />
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col gap-2 w-20">
            <label className="text-[13px]">Zeitraum</label>
            {/* <select className="p-2 w-64"></select> */}
            <CustomSelect options={options} />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 py-5">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setSelectedTab(tab.label)}
            className={`${
              selectedTab === tab.label
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } rounded-md px-10 py-1.5 transition-colors duration-300 ease-in-out`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-5">
        {tabs.find((tab) => tab.label === selectedTab)?.component}
      </div>
    </div>
  );
}

export default DunningProcess;

const Tabs = ({amount}) => {
  const value = (
    <div className="px-7 pt-6 pb-20 text-grayText  border border-grayText rounded mt-2">
      Dear Kristian, We hope this message finds you well. Our records indicate that payment for Invoice #1 in the amount of{" "}
      <strong className="font-semibold text-darkBlue">{amount}</strong> was due on  <strong className="font-semibold text-darkBlue">12-01-2024</strong>. As of today, we have not yet received the payment. 
      <br />
      We kindly request you to process the payment at your earliest convenience to avoid any late charges. 
      If the payment has already been made, please ignore this message. 
      For any concerns or questions, feel free to reach out.  
      <br />
  
      Best regards,  
      <br />
      Carlusion Finance department.
    </div>
  );
  return (
    <>
      <div className="flex flex-col ">
        <Text
          content={"Automated Message"}
          textColor="darkBlue"
          textSize="text-[20px]"
        />
        <div
          
          className=""
       
        />
        {value}
      </div>
    </>
  );
};
