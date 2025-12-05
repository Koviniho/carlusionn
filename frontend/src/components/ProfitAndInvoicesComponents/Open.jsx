/* eslint-disable react/prop-types */
import CustomTable from "../Custom-Tabel";
import Button from "../Button";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllInvoices,
  setLimit,
  setPage,
} from "../../store/features/invoiceSlice/getAllInvoiceSlice";
import { formatDate } from "../../utils/dateFormate";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Images from "../../assets/images";
import Icons from "../../assets/icons";
import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../NoDataFound";
import Pagination from "../Pagination";
import Swal from "sweetalert2";
import axios from "../../services/api";
import { DELETE_INVOICE } from "../../utils/baseURL";
import showToast from "../../utils/toaster";

const PaymentProgressCircle = ({ paid, total }) => {
  const radius = 8;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.min(paid / total, 1); // ensure max 100%
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb" // light gray background
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#22c55e" // green for progress
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

// const PaymentProgressCircle = ({ paid, total }) => {
//   const radius = 8;
//   const stroke = 3;
//   const normalizedRadius = radius - stroke * 0.5;
//   const circumference = 2 * Math.PI * normalizedRadius;
//   const progress = Math.min(paid / total, 1); // ensure max 100%
//   const strokeDashoffset = circumference - progress * circumference;

//   return (
//     <svg height={radius * 2} width={radius * 2}>
//       {/* Background Circle (filled with light gray) */}
//       <circle
//         fill="#e5e7eb" // light gray background color
//         r={radius}
//         cx={radius}
//         cy={radius}
//       />
//       {/* Progress Circle (filled with green) */}
//       <circle
//         fill="#22c55e" // green progress
//         r={radius}
//         cx={radius}
//         cy={radius}
//         stroke="none" // No stroke, the circle is filled
//         style={{
//           strokeDashoffset: 0, // reset dashoffset for full circle fill
//           strokeWidth: 0, // No stroke, fully filled circle
//           transform: `rotate(-90deg)`, // to start progress from top
//           transformOrigin: '50% 50%' // to ensure rotation happens around the center
//         }}
//         strokeDasharray={circumference} // Define the full circumference
//         strokeLinecap="round"

//       />
//     </svg>
//   );
// };

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        {/* <th className="py-3.5 pl-5 text-left font-semibold text-white">
          <CustomInput type="checkbox" />
        </th> */}
        <th
          scope="col"
          className="py-3.5 pl-5 pr-3 text-left font-semibold text-white "
        >
          Trans. ID
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Customer Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          vehicle
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Subject
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Date
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Due date
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Status
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Amount
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

// const data = [
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
//   {
//     id: "TX001",
//     customerName: "John Doe",
//     type: "Anzahlung",
//     vehicle: "BMW X6 Xdrive",
//     date: "08.08.2024",
//     dueDate: "26.12.2024",
//     status: "Overdue",
//     amount: "108.90 CHF",
//   },
// ];

const TableBody = ({ data, handleDeleteClick }) => {
  console.log("🚀 ~ TableBody ~ data:", data);
  return (
    <tbody className="bg-white">
      {data &&
        data?.map((item) => (
          <tr
            key={item._id}
            className="hover:bg-gray-100   cursor-pointer border-b "
          >
            {/* <td className="py-3.5 pl-5 text-left font-semibold text-white">
              <CustomInput type="checkbox" />
            </td> */}
            <td className="py-3.5 whitespace-nowrap px-3 pl-5  text-lightBlackText ">
          
              {item._id.slice(0, 15)}...
            </td>
            <td className="whitespace-nowrap px-3  text-lightBlackText ">
             
              {item.customer?.firstName} {item.customer?.name}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText ">
              {item?.vehicle?.model}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText capitalize ">
              {item.subject}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText ">
             
              {formatDate(item.creationDate)}
            </td>{" "}
            <td className="whitespace-nowrap px-3  ">
        
              {formatDate(item.dueDate)}
            </td>
            <td
              className={`whitespace-nowrap px-3 text-lightBlackText  ${
                item.status.includes("open")
                  ? "text-green-500"
                  : item.status.includes("Overdue")
                  ? "text-red-500"
                  : item.status.includes("open")
                  ? "text-purple-500"
                  : "text-darkBlue"
              }`}
            >
             
              {item.status}
            </td>
          
            <td className="whitespace-nowrap   text-lightBlackText">
              <div className=" flex items-center justify-center  gap-1">
                {item.price} CHF
                <PaymentProgressCircle
                  paid={item.price - item.remainingAmount}
                  total={item.price}
                />
              </div>
            </td>
            <td className="text-lightBlackText  ">
              <div className="flex items-center justify-center gap-2 ">
                <Icons.FiEdit size={16} className="text-darkBlue" />
                <img
                  src={Images.bin}
                  className="text-error cursor-pointer w-4"
                  onClick={() => handleDeleteClick(item)}
                />
                <Link
                  to={`/dashboard/profit-&-invoices/${item._id}`}
                >
                  <MdOutlineRemoveRedEye
                    size={18}
                    className="text-secondary cursor-pointer"
                    // onClick={() => handleNavigate(item)}
                  />
                </Link>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

const Open = ({ status }) => {
  const dispatch = useDispatch();
  const { allInvoices, page, limit, loading } = useSelector(
    (state) => state?.fetchAllInvoicesSlice
  );

  useEffect(() => {
    if (status) {
      dispatch(fetchAllInvoices({ page, limit, status: status }));
    } else {
      dispatch(fetchAllInvoices({ page, limit }));
    }
  }, [dispatch, limit, page, status]);

  /////////////////////////  for search //////////////////
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query) {
      dispatch(fetchAllInvoices({ page, limit, search: query }));
    } else {
      dispatch(fetchAllInvoices({ page, limit }));
    }

    setSearchQuery(query);
  };
  ////////////////delete invoice //////////////////
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
      const response = await axios.delete(DELETE_INVOICE(item));
      if (response) {
        showToast("success", response?.data?.message);
        dispatch(fetchAllInvoices({ page, limit, status: status }));
      }
    }
  };
  return (
    <div>
      <div className="bg-white rounded-md mt-10 shadow-md">
        <div className="flex items-center justify-between p-4 ">
         
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
              {allInvoices?.totalCount} results found
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/dashboard/profit-&-invoices/new-invoice">
              <Button
                textColor="white"
                text="New Invoice"
                borderRadius="rounded-md"
                icon={<FaPlus />}
              />
            </Link>
          </div>
        </div>
        {loading ? (
          <ShimmerTable row={10} col={10} />
        ) : allInvoices?.results?.length > 0 ? (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => (
              <TableBody {...props} handleDeleteClick={handleDeleteClick} />
            )}
            data={allInvoices?.results}
          />
        ) : (
          <NoDataFound
            content="Invoices not found"
            height={"h-[300px]"}
            fontSize={"text-2xl"}
          />
        )}
        {allInvoices?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            itemsPerPage={limit}
            totalCount={allInvoices?.totalCount}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </div>
  );
};

export default Open;
