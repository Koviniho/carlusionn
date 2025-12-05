import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Customer from "../../components/TrashMangementComponents/Customer";
import Vehicles from "../../components/TrashMangementComponents/Vehicles";
import Contracts from "../../components/TrashMangementComponents/Contracts";
import Searches from "../../components/TrashMangementComponents/Searches";
import InfoCard from "../../components/InfoCard";
import totalSalesSvg from "../../assets/images/totalSales.svg";
import monthlySalesSvg from "../../assets/images/monthlySales.svg";

import VehicleSalesSvg from "../../assets/images/vehicleSales.svg";
import Draft from "../../components/TrashMangementComponents/Draft";

function TrashManagementPage() {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("Customer");

  // Tab names
  const tabs = ["Customer", "Vehicles", "Contracts", "Searches", "Draft"];
  const stats = [
    {
      title: "Total Sales",
      value: "3521",
      // icon: <GiPriceTag className="w-8 h-8" />,
      url: totalSalesSvg,
    },
    {
      title: "Vehicle Sales",
      value: "3521",
      // icon: <GiPriceTag className="w-8 h-8" />,
      url: VehicleSalesSvg,
    },
    {
      title: "Leasing Contracts",
      value: "3521",
      // icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Monthly Sales",
      value: "3521",
      // icon: <GiPriceTag className="w-8 h-8" />,
      url: monthlySalesSvg,
    },
  ];

  // Render the content for the selected tab
  const renderTabContent = () => {
    const tabContent = {
      Customer: <Customer />,
      Vehicles: <Vehicles />,
      Contracts: <Contracts />,
      Searches: <Searches />,
      Draft: <Draft />,
    };
    return tabContent[selectedTab] || null;
  };

  return (
    <div>
      <Breadcrumb pageName="Trash" />
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
            } rounded-md px-10 py-1.5 transition-colors duration-300 ease-in-out text-base sm:text-lg`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-6 mb-12 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              `}
          >
            <InfoCard title={stat.title} value={stat.value} url={stat?.url} />
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default TrashManagementPage;
