import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Quotation from "../../components/QuotationManagementComponent/Quotation";
import Payment from "../../components/QuotationManagementComponent/payment";
import AddQuotationStepper from "../../components/QuotationManagementComponent/addQuotation";

function QuotationManagementPage() {
  const [selectedTab, setSelectedTab] = useState("Quotation");

  // Render the content for the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Quotation":
        return <Quotation />;
      case "Payments":
        return <Payment />;

      default:
        return <Quotation />;
    }
  };

  return (
    <>
      <Breadcrumb
        heading="Quotation Management"
        pageName="Quotation Management"
      />
      {/* <div className="flex space-x-4 py-5">
        <button
          onClick={() => setSelectedTab("Quotation")}
          className={`${
            selectedTab === "Quotation"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Quotation
        </button>

        <button
          onClick={() => setSelectedTab("Payments")}
          className={`${
            selectedTab === "Payments"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Payments
        </button>
      </div> */}
      <div className="tab-content">{renderTabContent()}</div>
    </>
  );
}

export default QuotationManagementPage;
