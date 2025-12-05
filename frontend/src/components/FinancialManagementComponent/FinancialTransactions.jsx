import React, { useState } from "react";
import InfoCard from "../InfoCard";
import PaymentSvg from "../../assets/svg/paymentSvg";
import PendingSvg from "../../assets/svg/pendingSvg";
import RefundSvg from "../../assets/svg/refundSvg";
import CustomTable from "../Custom-Tabel";
import Button from "../Button";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaFilter, FaPlus, FaRegEdit } from "react-icons/fa";
import { useFormik } from "formik";
import PopUpModel from "../Modals/pop-up-modals";
import { MdDeleteOutline } from "react-icons/md";
import CustomInput from "../Input/custoInput";
import { LoanInput } from "../../Inputs/loan.input";

function TableHeader({ checkboxRef, checked, onToggleAll }) {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className="py-3.5 pl-5 text-left font-semibold text-white"
        >
          Trans .ID
        </th>
        <th
          scope="col"
          className="py-3.5 pr-3 text-left font-semibold text-white"
        >
          Customer Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Type
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Amount
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Date
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Payment Method
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Status
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData }) {
  return (
    <tbody className="bg-white">
      {data?.map((item, index) => {
        const isSelected = selectedData.includes(item);

        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100`}
          >
            <td className="whitespace-nowrap pl-5 text-primary py-4 text-lightBlackText">
              00012
            </td>
            <td className="whitespace-nowrap text-primary py-4 text-lightBlackText">
              John Doe
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              Payment
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              $12,766
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              01 Aug, 2012
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              Credit Card
            </td>
            <td className="whitespace-nowrap py-4 text-secondary">Completed</td>
            <td className="whitespace-nowrap px-3 py-4  flex items-center gap-3">
              <FaRegEdit size={17} className="text-primary" />

              <MdDeleteOutline size={17} className="text-error" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function TransactionsComponent() {
  const [openModel, setOpenModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      contractId: "",
      customerName: "",
      carModel: "",
      status: "",
    },
    // validationSchema: validationSchema,

    onSubmit: async (values) => {
      // const data = {
      //   contractId: contractId,
      //   customerName: customerNameId,
      //   carModel: carModelId,
      //   status: values.status,
      // };
      // const response = await dispatch(
      //   updateContractById({
      //     id: selectedContractTemplate?._id,
      //     body: data,
      //   })
      // );
      // if (response) {
      //   dispatch(getAllContract());
      //   setContractModal(true);
      // }
    },
  });
  const stats = [
    {
      title: "Total Transactions",
      value: "3521",
      icon: <PaymentSvg color="#19DB8C" className="fill-[#19DB8C]" />,
    },
    {
      title: "Total Revenue",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Pending Amounts",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Refunds Issued",
      value: "3521",
      icon: <RefundSvg />,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-12 mt-5">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className={`
          
          
        `}
          >
            <InfoCard title={stat.title} value={stat.value} icon={stat?.icon} />
          </div>
        ))}
      </div>
      <div className="bg-white border rounded-lg shadow-2xl">
        <div className="flex items-center justify-between p-4">
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
          <div className="flex items-center gap-5">
            <Button
              text="Filters"
              textColor="white"
              borderRadius="none"
              icon={<FaFilter className="h-5 w-5" />}
            />

            <PopUpModel
              heading="New Transaction"
              trigger={
                <Button
                  text="New Transaction"
                  textColor="white"
                  borderRadius="none"
                  icon={<FaPlus className="h-5 w-5" />}
                />
              }
              modalOpen={openModel}
              setModalOpen={setOpenModel}
            >
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-1.5 p-6 bg-white rounded-md shadow-md"
              >
                {LoanInput.map((field) => (
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
                    options={field.options || []}
                  />
                ))}
                <Button
                  type="submit"
                  text="Submit"
                  className="w-full"
                  borderRadius="rounded-sm"
                />
              </form>
            </PopUpModel>
          </div>
        </div>

        <CustomTable
          className="table-fixed w-full"
          TableHeader={TableHeader}
          TableBody={(props) => <TableBody />}
          data={["", "", "", "", "", "", "", "", "", "", "", ""]}
        />
      </div>
    </div>
  );
}

export default TransactionsComponent;
