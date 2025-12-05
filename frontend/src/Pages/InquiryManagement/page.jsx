/* eslint-disable react/prop-types */

import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import { IoSearchOutline } from "react-icons/io5";
import CustomTable from "../../components/Custom-Tabel";
import { FaRegEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import inquirySvg from "../../assets/images/Inquiry.svg";
import Text from "../../components/Heading/text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllInquiry,
  setLimit,
  setPage,
} from "../../store/features/inquirySlice/getAllInquirySlice";
import useUserInfo from "../../hooks/useUserInfo";
import { formatDate } from "../../utils/dateFormate";
import Pagination from "../../components/Pagination";
import Images from "../../assets/images";
import axios from "../../services/api";
import showToast from "../../utils/toaster";
import { DELETE_INQUIRY } from "../../utils/baseURL";
import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../../components/NoDataFound";
import Swal from "sweetalert2";

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary">
        {/* <th className="whitespace-nowrap py-4 px-5 font-medium">
          <CustomInput type="checkbox" />
        </th> */}
        <th
          scope="col"
          className="py-3.5 text-left font-semibold text-white pl-5"
        >
          Inquiry ID
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Date
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Customer Name
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Inquiry Type
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Vehicle
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Assigned To
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Status
        </th>
        <th scope="col" className="py-3.5 text-left font-semibold text-white">
          Actions
        </th>
      </tr>
    </thead>
  );
}
function TableBody({ data, selectedData }) {
  const dispatch = useDispatch();
  const userData = useUserInfo();
  const { page, limit } = useSelector((state) => state?.fetchAllInquirySlice);
  const navigate = useNavigate();
  const showDetails = (item) => {
    navigate(`/dashboard/inquiry-management/${item?._id}`);
  };

  /////delete inquiry//////////////
  // const deleteInquiry = async (item) => {
  //   try {
  //     const response = await axios.delete(DELETE_INQUIRY(item));
  //     if (response.status === 200) {
  //       showToast("success", "Inquiry deleted successfully!");
  //       dispatch(fetchAllInquiry({ page, limit }));
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete inquiry:", error);
  //     showToast("error", "Failed to delete inquiry. Please try again.");
  //     return false;
  //   }
  // };
  const deleteInquiry = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This inquiry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E599B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(DELETE_INQUIRY(item));
        if (response.status === 200) {
          showToast("success", "Inquiry deleted successfully!");
          dispatch(fetchAllInquiry({ page, limit }));
          return true;
        }
      } catch (error) {
        console.error("Failed to delete inquiry:", error);
        showToast("error", "Failed to delete inquiry. Please try again.");
        return false;
      }
    } else {
      // showToast("info", "Deletion cancelled.");
      return false;
    }
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
            } border-b border-gray-100`}
          >
            <td className="whitespace-nowrap  py-4 text-primary pl-5 ">
              {item?._id?.slice(0, 11) || "-"}...
            </td>
            <td className="whitespace-nowrap  py-4">
              {" "}
              {formatDate(item?.createdAt)}{" "}
            </td>
            <td className="whitespace-nowrap  py-4">
              {item.customerInformation.firstName}
              {item.customerInformation.lastName}
            </td>
            <td className="whitespace-nowrap  py-4">
              {item?.testDrive ? "Price Inquiry" : "Test Drive"}
            </td>
            <td className="whitespace-nowrap  py-4">
              {item?.vehicle[0]?.model}
            </td>
            <td className="whitespace-nowrap  py-4 capitalize">
              {userData?.username}
            </td>
            <td
              className={`whitespace-nowrap py-4 ${
                item.status === "pending"
                  ? "text-green-600"
                  : item.status === "escalated"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {item.status}
            </td>

            <td className="px-3 py-4 flex items-center gap-2">
              <img
                src={Images.bin}
                className="text-error cursor-pointer w-4"
                onClick={() => deleteInquiry(item)}
              />
              <MdOutlineRemoveRedEye
                size={18}
                className="text-secondary cursor-pointer"
                onClick={() => {
                  showDetails(item);
                }}
              />
            </td>
          </tr>
        );
      })}

      <Tooltip id="edit" place="top">
        Edit User
      </Tooltip>

      <Tooltip id="delete" place="top">
        Delete User
      </Tooltip>
    </tbody>
  );
}

const InquiryManagementPage = () => {
  const dispatch = useDispatch();
  const stats = [
    {
      title: " Total Inquiries",
      value: "3521",
      url: inquirySvg,
    },
    {
      title: "Pending Inquiries",
      value: "3521",
      url: inquirySvg,
    },
    {
      title: "Resolved Inquiries",
      value: "3521",
      url: inquirySvg,
    },
  ];

  ///////////get all inquiries////////////
  const { allInquiries, page, limit, loading } = useSelector(
    (state) => state?.fetchAllInquirySlice
  );
  console.log("🚀 ~ InquiryManagementPage ~ allInquiries:", allInquiries);
  useEffect(() => {
    dispatch(fetchAllInquiry({ page, limit }));
  }, [dispatch, limit, page]);

  //////////search////////////
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query) {
      dispatch(fetchAllInquiry({ page, limit, search: query }));
    } else {
      dispatch(fetchAllInquiry({ page, limit }));
    }

    setSearchQuery(query);
  };

  return (
    <>
      <Breadcrumb heading="Inquiry Management" pageName="Inquiry  Management" />

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
              textColor={stat.textColor}
              url={stat.url}
            />
          </div>
        ))}
        {/* <div className=" border bg-white  rounded-xl shadow-sm h-full">
          <section className="bg-primary w-full flex justify-center p-2 rounded-t-xl">
            <Text
              icon={<FaRegEnvelope />}
              content="Mailbox"
              textColor="text-white"
            />
          </section>
          <section>
            <Msg />
          </section>
        </div> */}
      </div>
      <div className="bg-white rounded-md mt-10">
        <div className="flex items-center justify-between p-4 ">
          {/* Title */}
          <div className="flex items-center gap-8">
            <div className=" flex items-center gap-2 border-b bborder-gray-100 w-[400px]">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search"
                className=" pr-4 py-2  rounded-lg  outline-none w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <p className="text-primary text-sm font-medium">
              {allInquiries?.totalCount} results found
            </p>
          </div>

          {/* <div className="flex items-center gap-5">
          
            <Button
              borderRadius="rounded-md"
              text="Filters"
              textColor="white"
              icon={<FilterSvg className="h-5 w-5" />}
            />
            <Button
              borderRadius="rounded-md"
              textColor="white"
              text="New Inquiry"
              icon={<FaPlus className="h-5 w-5" />}
            />
          </div> */}
        </div>
        {loading ? (
          <ShimmerTable row={10} col={10} />
        ) : allInquiries?.totalCount === 0 ? (
          <NoDataFound
            content="Inquiries not found"
            height={"h-[300px]"}
            fontSize={"text-2xl"}
          />
        ) : (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => <TableBody {...props} />}
            data={allInquiries?.results}
          />
        )}
        {allInquiries?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            itemsPerPage={limit}
            totalCount={allInquiries?.totalCount}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </>
  );
};

export default InquiryManagementPage;

const Msg = () => {
  return (
    <div className="p-2 space-y-1  my-2">
      <div className="flex justify-between items-center">
        <Text
          content="Welcome to your new inbox"
          textColor="text-black"
          textSize="text-xs"
          fontWeight="font-[600]"
        />
        <Text content="9:41 AM" textColor="text-black" textSize="text-xs" />
      </div>
      <Text
        content="Get started with your new messaging experience..."
        textColor="text-black"
        textSize="text-xs"
      />
    </div>
  );
};
