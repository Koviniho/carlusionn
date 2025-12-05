import React, { useState } from "react";
import CustomTable from "../Custom-Tabel";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Text from "../Heading/text";
import Button from "../Button";
function TableHeader({ checkboxRef, checked, onToggleAll }) {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className=" py-3.5 pl-5 text-left font-semibold text-white"
        >
          <input type="checkbox" className="w-3.5 h-3.5 " />
        </th>
         {/* <th
          scope="col"
          className=" pl-5 py-3.5 pr-3 text-left font-semibold text-white"
        >
         
        </th> */}
        <th
          scope="col"
          className=" pl-5 py-3.5 pr-3 text-left font-semibold text-white"
        >
          Client
        </th>
        <th
          scope="col"
          className=" px-3 py-3.5 text-left font-semibold text-white"
        >
          Manufacturer
        </th>
        <th
          scope="col"
          className=" px-3 py-3.5 text-left font-semibold text-white"
        >
          Model
        </th>
        <th
          scope="col"
          className=" px-3 py-3.5 text-left font-semibold text-white"
        >
          License
        </th>
        <th
          scope="col"
          className=" px-3 py-3.5 text-left font-semibold text-white"
        >
          First Registration
        </th>
        <th
          scope="col"
          className=" px-3 py-3.5 text-left font-semibold text-white"
        >
          Operation
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData }) {
  return (
    <tbody className="bg-white">
      {data.map((item, index) => {
        const isSelected = selectedData.includes(item);

        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100 text-grayText`}
          >
             <td className=" pl-5 whitespace-nowrap text-darkBlue font-medium px-3 py-4 text-lightBlackText">
              <input type="checkbox" />
            </td>
            <td className=" whitespace-nowrap text-darkBlue font-medium px-3 py-4 text-lightBlackText">
              John Alex
            </td>
            <td className=" whitespace-nowrap px-3 py-4 ">
              John Alex
            </td>
            <td className=" whitespace-nowrap px-3 py-4 ">
              2013
            </td>
            <td className=" whitespace-nowrap px-3 py-4 ">
              SD 123AB
            </td>
            <td className=" whitespace-nowrap px-3 py-4 ">
              11-03-2024
            </td>
            <td className=" whitespace-nowrap px-3 py-4 ">
              Mileage
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function RecentVehicles() {
  const [tabeldata, setData] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      value: `Value ${index + 1}`,
    }))
  );

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md">
        <div className="flex items-center justify-between p-4 ">
          {/* Title */}
          <Text
            content=" Recent Vehicles"
            fontWeight="font-semibold"
            textColor="text-darkBlue"
          />

          {/* Search and Button Container */}
          <div className="flex items-center gap-10">
            {/* Search Bar */}
            <div className=" flex items-center gap-2 border-b bborder-gray-100 w-[400px]">
              <IoSearchOutline className="h-5 w-5 text-darkBlue" />

              <input
                type="text"
                placeholder="Search"
                className=" pr-4 py-2  rounded-lg  outline-none placeholder:text-darkBlue placeholder:font-medium"
              />
            </div>

            {/* <Button
              text="New Vehicle"
              borderRadius="rounded"
              textColor="white"
              className={"text-base"}
              icon={<FaPlus className="h-4 w-4" />}
            /> */}
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
    </div>
  );
}

export default RecentVehicles;
