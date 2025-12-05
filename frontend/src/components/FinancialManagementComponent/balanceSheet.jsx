import React from "react";
import InfoCard from "../InfoCard";
import PaymentSvg from "../../assets/svg/paymentSvg";
import PendingSvg from "../../assets/svg/pendingSvg";
import RefundSvg from "../../assets/svg/refundSvg";
import CustomTable from "../Custom-Tabel";
import Button from "../Button";
import { IoSearchCircleOutline, IoSearchOutline } from "react-icons/io5";
import { FaFilter, FaPlus, FaPrint, FaRegEdit } from "react-icons/fa";
import { useFormik } from "formik";
import PopUpModel from "../Modals/pop-up-modals";
import WarningModel from "../Modals/warning-model";
import { MdDeleteOutline } from "react-icons/md";
import Text from "../Heading/text";

function BalanceSheet() {
  const stats = [
    {
      title: "Net Income",
      value: "3521",
      icon: <PaymentSvg color="#19DB8C" className="fill-[#19DB8C]" />,
    },
    {
      title: "Total Assets",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Total Liabilities",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Total Equity",
      value: "3521",
      icon: <RefundSvg />,
    },
  ];
  const assetSections = [
    {
      title: "Current Assets",
      items: [
        { label: "Cash", value: "$200,78" },
        { label: "Accounts Receivable", value: "$200,78" },
        { label: "Inventory", value: "$200,78" },
      ],
    },
    {
      title: "Non-Current Assets",
      items: [
        { label: "Property & Equipment", value: "$200,78" },
        { label: "Intangible Assets", value: "$200,78" },
      ],
    },
  ];

  const liabilitiesSections = [
    {
      title: "Current Liabilities",
      items: [
        { label: "Accounts Payable", value: "$200,78" },
        { label: "Short-term Loans", value: "$200,78" },
        { label: "Accrued Expenses", value: "$200,78" },
      ],
    },
    {
      title: "Non-Current Liabilities",
      items: [{ label: "Long-term Debt", value: "$200,78" }],
    },
    {
      title: "Owner's Equity",
      items: [
        { label: "Retained Earnings", value: "$200,78" },
        { label: "Additional Capital", value: "$200,78" },
      ],
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-12 mt-5">
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
      <div className="bg-white">
        <div className="flex items-center  justify-between p-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[400px]">
              <IoSearchCircleOutline className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pr-4 py-2 rounded-lg outline-none"
              />
            </div>
            <p className="text-primary text-sm font-medium">0 results found</p>
          </div>
          {/* Search and Button Container */}
          <div className="flex items-center gap-5">
            <Button
              text="Filters"
              borderRadius="none"
              icon={<FaFilter className="h-5 w-5" />}
            />
            <Button
              text="Print"
              borderRadius="none"
              icon={<FaPrint className="h-5 w-5" />}
            />
            {/* <PopUpModel
              heading="New Template"
              trigger={
                <Button
                  text="New Template"
                  borderRadius="none"
                  icon={<FaPlus className="h-5 w-5" />}
                />
              }
              modalOpen={contractModal}
              setModalOpen={setContractModal}
            >
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-1.5 p-6 bg-white rounded-md shadow-md"
              >
                {fields.map((field) => (
                  <CustomInput
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors[field.name]}
                    touched={formik.touched[field.name]}
                    options={field.options || []} // Pass options only if they exist
                  />
                ))}
                <Button
                  type="submit"
                  text="Submit"
                  className="w-full"
                  borderRadius="rounded-sm"
                  isLoading={isLoading}
                />
              </form>
            </PopUpModel> */}
          </div>
        </div>
        <div className="py-10">
          <div className="bg-primary">
            <div className="grid grid-cols-1 px-10 py-2 md:grid-cols-2 gap-8">
              <p className="text-white font-medium">Assets</p>
              <p className="text-white font-medium">Liabilities & Equity</p>
            </div>
          </div>
          <div className="grid grid-cols-1 px-10 py-2 md:grid-cols-2 gap-8">
            <div className="border-r pr-7">
              {assetSections.map((section) => (
                <div key={section.title}>
                  <p className="border-b py-2 font-medium text-primary">
                    {section.title}
                  </p>
                  <ul className="list-disc list-inside">
                    {section.items.map((item) => (
                      <li key={item.label} className="border-b py-2 ">
                        <span className="text-primary   inline-block w-6/12 ">
                          {item.label}
                        </span>
                        <span className=" text-grayText !w-5/12 inline-block text-end ">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              {liabilitiesSections.map((section) => (
                <div key={section.title}>
                  <p className="border-b py-2 font-medium text-primary">
                    {section.title}
                  </p>
                  <ul className="list-disc list-inside">
                    {section.items.map((item) => (
                      <li key={item.label} className="border-b py-2 ">
                        <span className="text-primary   inline-block w-6/12 ">
                          {item.label}
                        </span>
                        <span className=" text-grayText !w-5/12 inline-block text-end ">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheet;
