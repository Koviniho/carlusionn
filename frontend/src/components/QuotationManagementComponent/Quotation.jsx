/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import quotationIcon from "../../assets/images/quotation.svg";

import Button from "../Button";
import CustomTable from "../Custom-Tabel";
import InfoCard from "../InfoCard";
import PopUpModel from "../Modals/pop-up-modals";
import AddQuotationStepper from "./addQuotation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuotation,
  setLimit,
  setPage,
} from "../../store/features/quotationSlice/getAllQuotationSlice";
import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../NoDataFound";
import { formatDateToDDMMYYYY } from "../../utils/dateFormate";
import Images from "../../assets/images";
import Swal from "sweetalert2";
import { DELETE_QUOTATION } from "../../utils/baseURL";
import axios from "../../services/api";
import showToast from "../../utils/toaster";
import { FaPlus } from "react-icons/fa";
import Pagination from "../Pagination";

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary">
        <th
          scope="col"
          className="py-3.5 pl-5  text-left font-semibold text-white"
        >
          Title
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Customer
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Result
        </th>
        {/* <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Sites
        </th> */}
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Status
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Last Run
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Creation Date
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData, handleDeleteClick }) {
  const navigate = useNavigate();
  const showDetails = (id) => {
    navigate(`/dashboard/quotation-detail/${id}`);
  };

  return (
    <tbody className="bg-white">
      {data?.map((item, index) => {
        const isSelected = selectedData.includes(item);

        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100 `}
          >
            <td className="pl-5 whitespace-nowrap  py-4 text-primary">
              {item?.filters?.model}
            </td>
            <td className="whitespace-nowrap  py-4">
              {item?.customerId?.name}
            </td>
            <td className="whitespace-nowrap  py-4">
              <span className="bg-green-700 py-2 px-3 text-white rounded-md">
                {" "}
                {item.resultCount}
              </span>
            </td>

            <td className={`whitespace-nowrap   rounded-md`}>
              <span
                className={`text-white p-2 rounded-md ${
                  item.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {item.status}
              </span>
            </td>
            <td className="whitespace-nowrap  py-4">
              {formatDateToDDMMYYYY(item.updatedAt)}
            </td>
            <td className="whitespace-nowrap  py-4">
              {formatDateToDDMMYYYY(item.createdAt)}
            </td>
            <td className="text-lightBlackText  ">
              <div className="flex items-center justify-start gap-2 ">
                {/* <Icons.FiEdit size={16} className="text-darkBlue" /> */}
                <img
                  src={Images.bin}
                  className="text-error cursor-pointer w-4"
                  onClick={() => handleDeleteClick(item)}
                />
                {/* <Link
                  to={`/dashboard/profit-&-invoices/${item._id}`}
                > */}
                <MdOutlineRemoveRedEye
                  size={18}
                  className="text-secondary cursor-pointer"
                  // onClick={() => handleNavigate(item)}
                  onClick={() => showDetails(item?._id)}
                />
                {/* </Link> */}
              </div>
            </td>
            {/* <td className=" py-4 flex items-center gap-2">
              <FaRegEdit
                data-tooltip-id="edit"
                className="text-gray-400 hover:bg-gray-100 cursor-pointer"
                onClick={showDetails}
              />
              <MdOutlineDeleteOutline
                data-tooltip-id="delete"
                className="text-red-500 cursor-pointer"
              />
            </td> */}
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

export default function Quotation() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  console.log("🚀 ~ Quotation ~ modalOpen:", modalOpen);
  const { AllQuotations, page, limit, loading } = useSelector(
    (state) => state?.getAllQuotationSlice
  );
  const stats = [
    {
      title: "Total Quotations",
      value:
        (AllQuotations?.activeQuotations ?? 0) +
        (AllQuotations?.inactiveQuotations ?? 0),
      url: quotationIcon,
    },
    {
      title: "Active Quotations",
      value: AllQuotations?.activeQuotations ?? 0,
      url: quotationIcon,
    },
    {
      title: "Inactive Quotations",
      value: AllQuotations?.inactiveQuotations ?? 0,
      url: quotationIcon,
    },
  ];

  console.log("🚀 ~ Quotation ~ AllQuotations:", AllQuotations);
  useEffect(() => {
    dispatch(getAllQuotation({ page, limit }));
  }, [dispatch, limit, page]);
  ////////////////delete quotation //////////////////
  const handleDeleteClick = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E599B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await axios.delete(DELETE_QUOTATION(item));
      if (response) {
        showToast("success", response?.data?.message);
        dispatch(getAllQuotation({ page, limit }));
      }
    }
  };
  ////////////////search  quotation //////////////////
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query) {
      dispatch(getAllQuotation({ page, limit, search: query }));
    } else {
      dispatch(getAllQuotation({ page, limit }));
    }

    setSearchQuery(query);
  };
  ////////for model open in quotaion detail////////////////

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
        {stats.map((stat, index) => (
          <div key={index}>
            <InfoCard
              title={stat.title}
              value={stat.value}
              icon={stat?.icon}
              url={stat?.url}
            />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-md mt-10">
        <div className="flex items-center justify-between p-4 ">
          <div className="flex items-end gap-8">
            <div className=" flex items-center gap-2 border-b bborder-gray-100 w-[300px]">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search by make and model..."
                className=" pr-4 py-2  rounded-lg  outline-none  w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <p className="text-primary text-sm font-medium">
              {AllQuotations?.totalCount} results found
            </p>
          </div>
          <div className="flex items-center gap-5">
            <PopUpModel
              heading="Add New Quotation"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              trigger={
                <Button
                  text="New Quotation"
                  borderRadius="rounded-md"
                  textColor="white"
                  fontSize="text-base"
                  icon={<FaPlus className="h-4 w-4" />}
                  onClick={() => setModalOpen(true)}
                />
              }
            >
              <AddQuotationStepper
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
              />
            </PopUpModel>
          </div>
        </div>

        {loading ? (
          <ShimmerTable row={10} col={10} />
        ) : AllQuotations?.results?.length > 0 ? (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => (
              <TableBody {...props} handleDeleteClick={handleDeleteClick} />
            )}
            data={AllQuotations?.results}
            // data={tableData}
          />
        ) : (
          <NoDataFound
            content="Quotations not found"
            height={"h-[300px]"}
            fontSize={"text-2xl"}
          />
        )}
        {AllQuotations?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            itemsPerPage={limit}
            totalCount={AllQuotations?.totalCount}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </>
  );
}
