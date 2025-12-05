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

function CashFlowStatement() {
  const stats = [
    {
      title: "Cash Inflows",
      value: "3521",
      icon: <PaymentSvg color="#19DB8C" className="fill-[#19DB8C]" />,
    },
    {
      title: "Cash Outflows",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Net Cash Flow",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Ending Cash Balance",
      value: "3521",
      icon: <RefundSvg />,
    },
  ];
  const assetSections = [
    {
      title: "Operating Activities",
      totalHeading: {
        label: "Net Cash from Operating Activities",
        value: "$200,78",
      },
      items: [
        { label: "Cash from Vehicle Sales", value: "$200,78" },
        { label: "Payment to Suppliers", value: "$200,78" },
        { label: "Salaries and Wages", value: "$200,78" },
        { label: "Rent and Utilities", value: "$200,78" },
      ],
    },
    {
      title: "Investing Activities",
      totalHeading: {
        label: "Net Cash from Investing Activities",
        value: "$200,78",
      },
      // profitHeading: {
      //   label: "Gross Profit",
      //   value: "$200,78",
      // },
      items: [
        { label: "Sale of Old Vehicles", value: "$200,78" },
        { label: "Purchase of New Equipment", value: "$200,78" },
        { label: "Investment in Property", value: "$200,78" },
      ],
    },
  ];

  const liabilitiesSections = [
    {
      title: "Financing Activities",
      totalHeading: {
        label: "Net Cash from Financing Activities",
        value: "$200,78",
      },

      items: [
        { label: "Loan Proceeds", value: "$200,78" },
        { label: "Loan Repayment", value: "$200,78" },
        { label: "Interest Payments", value: "$200,78" },
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
            {/* check the code that commented */}
            <Button
              text="Print"
              borderRadius="none"
              icon={<FaPrint className="h-5 w-5" />}
            />
          </div>
        </div>
        <div className="py-10">
          <div className="bg-primary">
            <div className="grid grid-cols-1 px-10 py-2 md:grid-cols-2 gap-8">
              <p className="text-white font-medium">Cash Flow Statement</p>
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
                  {section?.totalHeading && (
                    <p
                      className={`flex items-center justify-between  my-3 py-2 ${
                        section?.profitHeading?.label
                          ? "border-none"
                          : "border-b"
                      }`}
                    >
                      <span className="text-primary ">
                        {section?.totalHeading?.label}:
                      </span>
                      <span className="text-grayText">
                        {section?.totalHeading?.value}
                      </span>
                    </p>
                  )}
                  {section?.profitHeading && (
                    <p className="flex items-center justify-between ">
                      <span className="text-primary font-medium  ">
                        {section?.profitHeading?.label}:
                      </span>
                      <span className="text-grayText">
                        {section?.profitHeading?.value}
                      </span>
                    </p>
                  )}
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
                  {section?.totalHeading && (
                    <p
                      className={`flex items-center justify-between  my-3 py-2 ${
                        section?.profitHeading?.label
                          ? "border-none"
                          : "border-b"
                      }`}
                    >
                      <span className="text-primary ">
                        {section?.totalHeading?.label}:
                      </span>
                      <span className="text-grayText">
                        {section?.totalHeading?.value}
                      </span>
                    </p>
                  )}
                  {section?.profitHeading && (
                    <p
                      className={`flex items-center justify-between ${
                        section?.profitHeading?.showBorder
                          ? "border-b pb-3"
                          : "border-none"
                      } `}
                    >
                      <span className="text-primary font-medium  ">
                        {section?.profitHeading?.label}:
                      </span>
                      <span className="text-grayText">
                        {section?.profitHeading?.value}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashFlowStatement;

{
  /* <PopUpModel
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
            </PopUpModel> */
}
