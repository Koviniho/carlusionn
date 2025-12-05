import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import totalSalesSvg from "../../assets/images/totalSales.svg";
import monthlySalesSvg from "../../assets/images/monthlySales.svg";
import VehicleSalesSvg from "../../assets/images/vehicleSales.svg";
import Draft from "../../components/ProfitAndInvoicesComponents/Draft";
import Order from "../../components/ProfitAndInvoicesComponents/Order";
import Open from "../../components/ProfitAndInvoicesComponents/Open";
import Paid from "../../components/ProfitAndInvoicesComponents/Paid";
import Cancellation from "../../components/ProfitAndInvoicesComponents/Cancellation";
import All from "../../components/ProfitAndInvoicesComponents/All";
import { useSelector } from "react-redux";

function ProfitAndInvoicesPage() {
  const { allInvoices } = useSelector((state) => state?.fetchAllInvoicesSlice);
  const stats = [
    {
      title: "Open Invoices",
      value: allInvoices?.openInvoicies,
      // icon: <GiPriceTag className="w-8 h-8" />,
      url: totalSalesSvg,
    },
    {
      title: "Paid Invoices",
      value: allInvoices?.paidInvoicies,
      // icon: <GiPriceTag className="w-8 h-8" />,
      url: VehicleSalesSvg,
    },
    {
      title: "Cancelled Invoices",
      value: allInvoices?.cancellationInvoices,
      // icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "All Invoices",
      value:
        (allInvoices?.openInvoicies || 0) +
        (allInvoices?.paidInvoicies || 0) +
        (allInvoices?.cancellationInvoices || 0),
      url: monthlySalesSvg,
    },
  ];
  const [selectedTab, setSelectedTab] = useState("Open");

  const tabs = [
    // "Order",
    // "Draft",
    "Open",
    "Paid",
    "Cancellation/Credit note",
    "All",
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      // case "Order":
      //   return <Order />;
      // case "Draft":
      //   return <Draft />;
      case "Open":
        return <Open status={"open"} />;
      case "Paid":
        return <Open status={"paid"} />;
      case "Cancellation/Credit note":
        return <Open status={"cancellation"} />;
      case "All":
        return <Open />;

      default:
      // return <Profits />;
    }
  };
  return (
    <>
      <Breadcrumb heading={selectedTab} pageName={"Profit & Invoices"} />{" "}
      {/* <div className="flex space-x-4 py-5">
        <button
          onClick={() => setSelectedTab("Profits")}
          className={`${
            selectedTab === "Profits"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Profits
        </button>

        <button
          onClick={() => setSelectedTab("Invoices")}
          className={`${
            selectedTab === "Invoices"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Invoices
        </button>
      </div> */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
                
                
              `}
          >
            <InfoCard
              title={stat.title}
              value={stat.value}
              icon={stat?.icon}
              url={stat?.url}
            />
          </div>
        ))}
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </>
  );
}

export default ProfitAndInvoicesPage;
