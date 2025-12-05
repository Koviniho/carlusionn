import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Inventory from "../../components/InventoryManagementComponent/inventory";
import Sales from "../../components/InventoryManagementComponent/sales";

function InventoryManagementPage() {
  const [selectedTab, setSelectedTab] = useState("Inventory");

  // Render the content for the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Inventory":
        return <Inventory />;
      case "Sales":
        return <Sales />;

      default:
        return <Inventory />;
    }
  };

  return (
    <>
      <Breadcrumb
        heading="Inventory Management Lists"
        pageName=" Inventory Management"
      />
      <div className="flex space-x-4 py-5">
        <button
          onClick={() => setSelectedTab("Inventory")}
          className={`${
            selectedTab === "Inventory"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Inventory
        </button>

        <button
          onClick={() => setSelectedTab("Sales")}
          className={`${
            selectedTab === "Sales"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Sales
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </>
  );
}

export default InventoryManagementPage;
