import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";

import AllContracts from "../../components/ContractManagementComponent/AllContracts";
import InfoCard from "../../components/InfoCard";
import { useSelector } from "react-redux";

function ContractManagementPage() {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("All");
  const { contract } = useSelector((state) => state.contract);
  // Tab names
  const tabs = ["All", "Draft", "Open", "Signed", "Expired"];
  const stats = [
    {
      title: "Total Contracts",
      value:
        (contract?.openContracts ?? 0) +
        (contract?.signedContracts ?? 0) +
        (contract?.draftContracts ?? 0) +
        (contract?.expiredContracts ?? 0),
      // icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Signed Contracts",
      value: contract?.signedContracts,
      // icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Drafts Contracts",
      value: contract?.draftContracts,
      // icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Expired Contracts",
      value: contract?.expiredContracts,
      // icon: <GiPriceTag className="w-8 h-8" />,
    },
  ];

  // Render the content for the selected tab
  const renderTabContent = () => {
    const tabContent = {
      All: <AllContracts />,
      Draft: <AllContracts status={"draft"} />,
      Open: <AllContracts status={"open"} />,
      Signed: <AllContracts status={"signed"} />,
      Expired: <AllContracts status={"expired"} />,
    };
    return tabContent[selectedTab] || null;
  };

  return (
    <div>
      <Breadcrumb pageName="Contract Management" />
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-4 py-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } min-w-[180px] rounded-md px-10 py-1.5 transition-colors duration-300 ease-in-out text-base sm:text-lg`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              `}
          >
            <InfoCard title={stat.title} value={stat.value} icon={stat?.icon} />
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default ContractManagementPage;
