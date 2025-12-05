import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MainHeading from "../../components/Heading/mainHeading";
import GeneralAccounting from "../../components/AccountingPageComponent/general";
import DunningProcess from "../../components/AccountingPageComponent/dunningProcess";

function AccountingPage() {
  const tabs = [
    { label: "General", component: <GeneralAccounting /> },
    { label: "Dunning process", component: <DunningProcess /> },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].label);

  return (
    <>
      <Breadcrumb heading="Hallo, Willkommen Silas Rotzetter! 👋" />
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading="Accounting"
      />
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
    </>
  );
}

export default AccountingPage;
