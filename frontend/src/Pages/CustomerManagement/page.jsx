import { useEffect, useState } from "react";
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
import PrivateCustomer from "../../components/customerManagement/privateCustomer";
import { Link } from "react-router-dom";
import PATHS from "../../routes/path";

const CustomerManagmentPage = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state?.customer);

  const stats = [
    {
      title: " Total Customers",
      value:
        (customers?.activeCustomers ?? 0) + (customers?.inactiveCustomers ?? 0),
      icon: <img src={Images.person} alt="" className="w-8 h-8" />,
    },
    {
      title: "Active Customers",
      value: customers?.activeCustomers,
      icon: <img src={Images.person} alt="" className="w-8 h-8" />,
    },
    {
      title: "Inactive Customers",
      value: customers?.inactiveCustomers,
      icon: <img src={Images.person} alt="" className="w-8 h-8" />,
    },
    // {
    //   title: "Top Referrers",
    //   value: "3521",
    //   icon: <RefundSvg />,
    // },
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

  // useEffect(() => {
  //   dispatch(getAllCustomers());
  // }, []);
  console.log("🚀 ~ CustomerManagmentPage ~ customers:", customers);
  /////////// tabs management //////////
  const [selectedTab, setSelectedTab] = useState("Private customers");

  // Tab names
  const tabs = ["Private customers", "Company customers"];

  // Render the content for the selected tab
  const renderTabContent = () => {
    const tabContent = {
      "Private customers": <PrivateCustomer customerStatus={"private"} />,
      "Company customers": <PrivateCustomer customerStatus={"company"} />,
    };
    return tabContent[selectedTab] || null;
  };
  return (
    <>
      <Breadcrumb heading="Customer Lists" pageName="Customer Management" />
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
      </div>
      <div className="flex w-full items-start gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mt-5">
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
                textColor="darkBlue"
              />
            </div>
          ))}
        </div>
        <Link to={PATHS.birthdayRoute}>
          <div>
            <button className="bg-[#1E599B33] text-primary py-2 px-8 rounded font-medium mt-5">
              Geburtstagsliste
            </button>
          </div>
        </Link>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </>
  );
};

export default CustomerManagmentPage;
