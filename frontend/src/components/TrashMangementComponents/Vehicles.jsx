/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShimmerTable } from "react-shimmer-effects";
import { getAllContract } from "../../store/features/contract/contractSlice";
import CustomTable from "../Custom-Tabel";
import NoDataFound from "../NoDataFound";

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th className="py-3.5 pl-5 text-left font-semibold text-white">
          <input type="checkbox" />
        </th>
        <th className="w-1/6 pl-5 py-3.5 pr-3 text-left font-semibold text-white">
          Trans. ID
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Marke
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Modell
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          TG
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Löschung
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Actions
        </th>
      </tr>
    </thead>
  );
}
const data = [
  {
    id: "TX001",
    marke: "BMW",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 90 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "Ferrari",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 90 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "BMW",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 2 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "Ferrari",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 4 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "BMW",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 60 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "BMW",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 50 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "Ferrari",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 46 Tagen",
    action: "Wiederherstellen",
  },
  {
    id: "TX001",
    marke: "BMW",
    modell: "X5M Competition Steptronic Competition",
    tg: "1BC257",
    loschung: "In 90 Tagen",
    action: "Wiederherstellen",
  },
];

function TableBody() {
  return (
    <tbody className="bg-white">
      {data.map((item, index) => (
        <tr
          key={index}
          className="hover:bg-gray-50 cursor-pointer border-b border-gray-100"
        >
          <td className="whitespace-nowrap py-4 px-5 font-medium">
            <input type="checkbox" />
          </td>
          <td className="w-1/6 pl-5 capitalize whitespace-nowrap text-primary px-3 py-4">
            {item.id}
          </td>
          <td className="w-1/6 whitespace-nowrap px-3 py-4">{item.marke}</td>
          <td className="w-1/6 whitespace-nowrap px-3 py-4">{item.modell}</td>
          <td className="w-1/6 whitespace-nowrap px-3 py-4">{item.tg}</td>
          <td
            className={`w-1/6 whitespace-nowrap px-3 py-4 ${
              item.loschung.includes("Tagen")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {item.loschung}
          </td>
          <td className="whitespace-nowrap px-3 py-4 flex items-center gap-3">
            {item.action}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

const Vehicles = () => {
  const dispatch = useDispatch();
  const { contract, isLoading } = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(getAllContract());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white border rounded-lg shadow-2xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[400px]">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pr-4 py-2 rounded-lg outline-none"
              />
            </div>
            <p className="text-primary text-sm font-medium">0 results found</p>
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={5} />
        ) : data.length === 0 ? (
          <NoDataFound content="Vehicles" />
        ) : (
          <CustomTable TableHeader={TableHeader} TableBody={TableBody} />
        )}
      </div>
    </div>
  );
};

export default Vehicles;
