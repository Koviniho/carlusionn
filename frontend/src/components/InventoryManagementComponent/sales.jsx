import React, { useState } from "react";
import CustomTable from "../Custom-Tabel";
import { FaEye, FaPlus, FaRegEdit } from "react-icons/fa";
import FilterSvg from "../../assets/svg/filter";
import { IoSearchOutline } from "react-icons/io5";
import RefundSvg from "../../assets/svg/refundSvg";
import { MdOutlineDeleteOutline } from "react-icons/md";
import PersonSvg from "../../assets/svg/personSvg";
import InfoCard from "../InfoCard";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary">
        <th
          scope="col"
          className="py-3.5 pl-5 text-left font-semibold text-white"
        >
          Sale ID
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Date
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Customer Name
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Vehicle
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Price
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Payment Status
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Salesperson
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData }) {
  const navigate = useNavigate();
  const showDetails = () => {
    navigate(`/dashboard/customer-details/1233`);
  };
  return (
    <tbody className="bg-white">
      {data.map((item, index) => {
        const isSelected = selectedData.includes(item);

        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100`}
          >
            <td className="pl-5 whitespace-nowrap px-3 py-4 text-primary">
              S0001
            </td>
            <td className="whitespace-nowrap px-3 py-4">02-12-2023</td>
            <td className="whitespace-nowrap px-3 py-4">John Doe</td>

            <td className="whitespace-nowrap px-3 py-4">Toyota</td>
            <td className="whitespace-nowrap px-3 py-4">$231,98</td>
            <td className="whitespace-nowrap px-3 py-4 text-secondary">Paid</td>
            <td className="whitespace-nowrap px-3 py-4">Sarah Wilson</td>

            <td className="px-3 py-4 flex items-center gap-2">
              <FaRegEdit
                data-tooltip-id="edit"
                className="text-gray-400 hover:bg-gray-100 cursor-pointer"
              />
              {/* <FaEye
                onClick={() => {
                  showDetails(item);
                }}
                data-tooltip-id="show-details"
                className="text-gray-400 hover:bg-gray-100 cursor-pointer"
              /> */}
              <MdOutlineDeleteOutline
                data-tooltip-id="delete"
                className="text-red-500"
              />
            </td>
          </tr>
        );
      })}
      {/* Tooltips rendered globally */}
      <Tooltip id="edit" place="top">
        Edit User
      </Tooltip>
      {/* <Tooltip id="show-details" place="top">
        Show Details
      </Tooltip> */}
      <Tooltip id="delete" place="top">
        Delete User
      </Tooltip>
    </tbody>
  );
}

export default function Sales() {
  const stats = [
    {
      title: " Total Sales",
      value: "3521",
      icon: <PersonSvg className="text-secondary" />,
    },
    {
      title: "Revenue",
      value: "3521",
      icon: <PersonSvg className="text-secondary" />,
    },
    {
      title: "Pending Payments",
      value: "3521",
      icon: <PersonSvg className="text-secondary" />,
    },
    {
      title: "Best-Selling Vehicle",
      value: "Toyota corolla-30 units",
      icon: <RefundSvg />,
    },
  ];
  const [tabeldata, setData] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      value: `Value ${index + 1}`,
    }))
  );
  return (
    <>
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
              // subTitle={stat?.subTitle}
            />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-md mt-10">
        <div className="flex items-center justify-between p-4 ">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className=" flex items-center gap-2 border-b bborder-gray-100 w-[400px]">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search"
                className=" pr-4 py-2  rounded-lg  outline-none "
              />
            </div>
            <p className="text-primary text-sm font-medium">0 results found</p>
          </div>
          {/* Search and Button Container */}
          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <Button
              borderRadius="rounded-md"
              text="Filters"
              icon={<FilterSvg className="h-5 w-5" />}
            />
            <Button
              borderRadius="rounded-md"
              text="New Sale"
              icon={<FaPlus className="h-5 w-5" />}
            />
          </div>
        </div>
        <CustomTable
          TableHeader={TableHeader}
          TableBody={(props) => (
            <TableBody
              {...props}
              // onDropdownSelect={handleDropdownSelect}
              // setModalOpen={setModalOpen}
              // modalOpen={modalOpen} // Pass setModalOpen down
            />
          )}
          data={tabeldata}
        />
      </div>
    </>
  );
}
