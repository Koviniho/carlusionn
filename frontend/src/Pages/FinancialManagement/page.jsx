import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import FinancialData from "../../components/FinancialManagementComponent/financialData";
import BalanceSheet from "../../components/FinancialManagementComponent/balanceSheet";
import IncomeStatement from "../../components/FinancialManagementComponent/incomeStatement";
import CashFlowStatement from "../../components/FinancialManagementComponent/CashFlowStatement";
import Payments from "../../components/FinancialManagementComponent/Payments";
import FinancingAndLoan from "../../components/FinancialManagementComponent/FinancingAndLoan";
import TransactionsComponent from "../../components/FinancialManagementComponent/FinancialTransactions";

function FinancialManagementPage() {
  const [selectedTab, setSelectedTab] = useState("Financial Data");

  // Tab names
  const tabs = [
    "Financial Data",
    "Balance Sheet",
    "Income Statement",
    "Cash Flow Statement",
    "Payments",
    "Financing And Loan",
    "Transactions",
  ];

  // Render the content for the selected tab
  const renderTabContent = () => {
    const tabContent = {
      "Financial Data": <FinancialData />,
      "Balance Sheet": <BalanceSheet />,
      "Income Statement": <IncomeStatement />,
      "Cash Flow Statement": <CashFlowStatement />,
      Payments: <Payments />,
      "Financing And Loan": <FinancingAndLoan />,
      Transactions: <TransactionsComponent />,
    };
    return tabContent[selectedTab] || null;
  };

  return (
    <div>
      <Breadcrumb pageName={selectedTab} />
      {/* Tab Buttons */}
      <div className="flex space-x-4 py-5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } rounded-md px-6 py-1.5 !w-[900px] transition-colors duration-300 ease-in-out`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="">{renderTabContent()}</div>
    </div>
  );
}

export default FinancialManagementPage;
