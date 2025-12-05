import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import { useFormik } from "formik";
import {
  CustomerInitialValues,
  customervalidationSchema,
} from "../../Inputs/customer.input";
import {
  addNewCustomer,
  getAllCustomers,
} from "../../store/features/customer/customer.slice";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../assets/images";
import ReportsComponent from "../../components/reportsComponent/reportsComponent";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const { allReports } = useSelector(
    (state) => state?.fetchAllReportsSlice
  );
  const stats = [
    {
      title: "Total Payments",
      value: allReports?.totalPayments,
      icon: <img src={Images.revenue} alt="" className="w-8 h-8" />,
    },
    {
      title: "Total Sales",
      value: allReports?.totalSales,
      icon: <img src={Images.carIcon2} alt="" className="w-8 h-8" />,
    },
    {
      title: "Leasing verträge",
      value: "0",
      icon: <img src={Images.penDiary} alt="" className="w-8 h-8" />,
    },
    {
      title: "Last Month Sales",
      value: allReports?.lastMonthSales,
      icon: <img src={Images.revenue} alt="" className="w-8 h-8" />,
    },
  ];
  const formik = useFormik({
    initialValues: CustomerInitialValues,
    validationSchema: customervalidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      const response = await dispatch(addNewCustomer(formData));
      if (response) {
        dispatch(getAllCustomers());
        // setCustomerPopUp(false);
        formik.resetForm();
      }
    },
  });

  /////////// tabs management //////////
  const [selectedTab, setSelectedTab] = useState("Rechnungen");
  const tabs = [
    "Rechnungen",
    "Einnahmen",
    "Umsatz",
    "Wagenverkehr",
    "Kartenzahlungen",
  ];

  const renderTabContent = () => {
    const incomeHeader = [
      "ID",
      "Customer",
      "Payment Date",
      "Payment Method",
      "Tax Rate",
      "Amount",
      "Status",
    ];
    const totalIncomeHeader = [
      "Zeitraum",
      "Umsatz Exkl. Steuer",
      "Einnahmen Exkl. Steuer",
    ];
    const vehicleHeader = [
      "ID",
      "Make",
      "Model",
      "Date Added",
      "Purchase Price",
      "Selling Price",
      "Gewinn", // Selling Price - Purchase Price
      "Bewertung", // Always "A"
      "Date of Selling",
    ];
    const invoiceHeader = [
      "Date of Invoice Creation",
      "Invoice ID",
      "Customer",
      "Subject",
      "Amount",
      "Payment Date",
      "Payment Method", // Will always be "Card"
      "Status",
    ];
    const tabContent = {
      Rechnungen: <ReportsComponent filter={"invoice"} />,
      Einnahmen: (
        <ReportsComponent
          headerData={incomeHeader}
          filter={"income"}
          showHeader={true}
        />
      ),
      // Umsatz: <TotalIncomeComponent totalIncome={true}  />,
      Umsatz: (
        <ReportsComponent
          headerData={totalIncomeHeader}
          filter={"revenue"}
          showHeader={true}
        />
      ),
      Wagenverkehr: (
        <ReportsComponent
          headerData={vehicleHeader}
          filter={"vehicle"}
          showHeader={true}
        />
      ),

      // Wagenverkehr: <CarTrafficComponent />,
      // Kartenzahlungen: <ReportsComponent income={true} />,
      Kartenzahlungen: (
        <ReportsComponent
          headerData={invoiceHeader}
          filter={"card"}
          showHeader={true}
        />
      ),
    };
    return tabContent[selectedTab] || null;
  };

  return (
    <>
      <Breadcrumb heading="Berichte" pageName="Berichte" />
      <div className="flex space-x-4  justify-between items-center py-4">
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
      </div>
      <div className="flex w-full items-start gap-10">
      {/* <div className=""> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
          {stats.map((stat, index) => (
            <div
              key={index}
       
            >
              <InfoCard
                title={stat.title}
                value={stat.value}
                icon={stat?.icon}
                textColor="darkBlue"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </>
  );
};

export default ReportsPage;
