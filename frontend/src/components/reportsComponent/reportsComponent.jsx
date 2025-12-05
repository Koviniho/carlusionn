/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import CustomTable from "../../components/Custom-Tabel";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../../components/Button";
import FilterSvg from "../../assets/svg/filter";
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
import { formatDateToDDMMYYYY } from "../../utils/dateFormate";
import NoDataFound from "../../components/NoDataFound";

import Icons from "../../assets/icons";
import {
  fetchAllReports,
  setLimit,
  setPage,
} from "../../store/features/reportsSlice/getAllReportsSlice";
import truncateText from "../../utils/truncateText";
import Pagination from "../Pagination";
import * as XLSX from "xlsx";
import showToast from "../../utils/toaster";
import CustomInput from "../Input/custoInput";
import BarChart from "../Charts/barCharts";
import CheckLoader from "../Loading/carLoader";
import { ShimmerTable } from "react-shimmer-effects";
function TableHeader({ headerData, showHeader, filter }) {
  return (
    <thead>
      {showHeader ? (
        <tr className="bg-primary ">
          {headerData.map((header, index) => (
            <th
              key={index}
              scope="col"
              className={`py-3.5 ${
                header === "ID" || header === "Date of Invoice Creation"
                  ? "pl-5"
                  : ""
              } ${
                filter === "revenue" ? "text-center" : "text-left"
              }    font-medium text-white ${header.className}`}
            >
              {header}
            </th>
          ))}
        </tr>
      ) : (
        <tr className="bg-primary ">
          {/* <th
            scope="col"
            className="py-3.5  text-left font-semibold text-white w-[2%]"
          >
            <input
              type="checkbox"
              className="p-1.5  appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-white 
            "
            />
          </th> */}
          <th
            scope="col"
            className="py-3.5   pl-5 text-left font-medium text-white "
          >
            ID
          </th>
          <th scope="col" className="  text-left  font-medium text-white ">
            Customer Name
          </th>
          <th scope="col" className=" text-left  font-medium text-white ">
            Creation Date
          </th>
          <th
            scope="col"
            className=" py-3.5  text-left  font-medium text-white "
          >
            Due Date
          </th>
          <th
            scope="col"
            className="  py-3.5  text-left  font-medium text-white "
          >
            Total Amount
          </th>
          <th
            scope="col"
            className="  py-3.5 px-2  text-left font-medium text-white "
          >
            Paid Amount
          </th>
          <th
            scope="col"
            className=" py-3.5  text-left font-medium text-white "
          >
            Status
          </th>
          <th
            scope="col"
            className=" py-3.5  text-left font-medium text-white "
          >
            Payment method
          </th>
          {/* {income && (
            <th
              scope="col"
              className=" py-3.5  text-left font-medium text-white "
            >
              Actions
            </th>
          )} */}
        </tr>
      )}
    </thead>
  );
}

function TableBody({ data, selectedData, filter }) {
  return (
    <tbody className="bg-white">
      {data?.map((item, index) => {
        const isSelected = selectedData.includes(item);
        if (filter === "card") {
          return (
            <tr
              key={index}
              className={`${
                isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
              } border-b border-gray-100`}
            >
              <td className="whitespace-nowrap py-4 px-5 text-grayText">
                {formatDateToDDMMYYYY(item?.creationDate)}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {truncateText(item?.invoiceId)}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.customer?.firstName || "-"} {item?.customer?.name || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.subject || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.payment?.amount || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {formatDateToDDMMYYYY(item?.payment?.date)}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText capitalize">
                {item?.payment?.method || "Card"}
              </td>
              <td
                className={`whitespace-nowrap py-4 font-semibold capitalize ${
                  item.status === "paid"
                    ? "text-red-500"
                    : item.status === "open"
                    ? "text-green-500"
                    : "text-darkblue"
                }`}
              >
                {item?.status || ""}
              </td>
            </tr>
          );
        }
        if (filter === "vehicle") {
          return (
            <tr
              key={index}
              className={`${
                isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
              } border-b border-gray-100`}
            >
              <td className="whitespace-nowrap py-4 px-5 text-grayText">
                {truncateText(item?.vehicleId || item?._id)}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.make || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.model || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {formatDateToDDMMYYYY(item?.createdAt)}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.purchasePrice}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.sellingPrice}
              </td>
              <td
                className={`whitespace-nowrap py-4 ${
                  item?.profit < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {item?.profit}
              </td>
              <td className="whitespace-nowrap py-4 text-darkblue font-semibold">
                {item?.evaluation || "A"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {formatDateToDDMMYYYY(item?.updatedToSold)}
              </td>
            </tr>
          );
        }
        if (filter === "revenue") {
          return (
            <tr
              key={index}
              className={`${
                isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
              } border-b border-gray-100`}
            >
              <td className="whitespace-nowrap py-4 px-5 text-center text-grayText">
                {formatDateToDDMMYYYY(item?.date)}
              </td>
              <td className="whitespace-nowrap py-4 text-center text-grayText">
                {item?.sales}
              </td>
              <td className="whitespace-nowrap py-4 text-center text-grayText">
                {item?.income}
              </td>
            </tr>
          );
        }
        if (filter === "income") {
          // Format income-specific data here
          return (
            <tr
              key={index}
              className={`${
                isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
              } border-b border-gray-100`}
            >
              <td className="whitespace-nowrap py-4 px-5 text-primary text-lightBlackText">
                {truncateText(item?._id)}
              </td>
              <td className="whitespace-nowrap py-4 text-lightBlackText">
                {item?.customerId?.firstName || "-"}{" "}
                {item?.customerId?.name || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {formatDateToDDMMYYYY(item?.date) || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText capitalize">
                {item?.method || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.taxRate ? `${item.taxRate}%` : "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-grayText">
                {item?.amount || "-"}
              </td>
              <td className="whitespace-nowrap py-4 text-green-600 font-medium capitalize">
                {item?.status || "-"}
              </td>
            </tr>
          );
        }
        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100`}
          >
            {/* <td className="whitespace-nowrap py-4 font-medium">
              <input
                type="checkbox"
                className="p-1.5  appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-white 
            "
              />
            </td> */}
            <td className="whitespace-nowrap text-primary py-4 px-5  text-lightBlackText">
              {truncateText(item?._id)}
            </td>
            <td className="whitespace-nowrap text-grayText py-4 text-lightBlackText">
              {item?.customerId?.firstName || "-"}{" "}
              {item?.customerId?.name || "-"}
            </td>
            <td className="whitespace-nowrap py-4  text-grayText">
              {formatDateToDDMMYYYY(item?.creationDate) || "-"}
            </td>
            <td className="whitespace-nowrap py-4  text-grayText ">
              {formatDateToDDMMYYYY(item?.dueDate) || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {item?.price || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {item?.totalPaid}
            </td>
            <td
              className={`${
                item.status === "paid"
                  ? "text-red-500" // Red for negative values
                  : item.status === "open"
                  ? "text-green-500" // Green for positive values
                  : "text-darkblue" // Default color for zero or invalid values
              } whitespace-nowrap py-4 text-left font-medium capitalize `}
            >
              {item?.status}
            </td>
            <td className="whitespace-nowrap py-4 px-4 text-grayText capitalize">
              {item?.latestPaymentMethod || "-"}
            </td>

            {/* {income ? (
              <td className="text-lightBlackText ">
                <div className="flex items-center gap-2 ">
                  <Icons.FiEdit size={16} className="text-darkBlue" />

                  <img
                    src={Images.bin}
                    className="text-error cursor-pointer w-4"
                  />

                  <MdOutlineRemoveRedEye
                    size={20}
                    className="text-secondary cursor-pointer"
                  />
                </div>
              </td>
            ) : null} */}
          </tr>
        );
      })}
    </tbody>
  );
}
const ReportsComponent = ({ totalIncome, filter, headerData, showHeader }) => {
  const dispatch = useDispatch();
  /////////////////for total income /////////////////////////

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

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);
  ///////////////// for table header Section ///////////

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query) {
      dispatch(fetchAllReports({ page, limit, get: filter, search: query }));
    } else {
      dispatch(fetchAllReports({ page, limit, get: filter }));
    }
    setSearchQuery(query);
  };

  const { allReports, page, limit, loading } = useSelector(
    (state) => state?.fetchAllReportsSlice
  );
  ////////for date filters ///////////////////////////
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        fetchAllReports({ page, limit, get: filter, startDate, endDate })
      );
    } else {
      dispatch(fetchAllReports({ page, limit, get: filter }));
    }
  }, [dispatch, endDate, filter, limit, page, startDate]);

  /////////////////////  // download entries in excel ////////////////////////
  const handleDownloadExcel = async () => {
    try {
      const response = await dispatch(fetchAllReports({ get: filter }));

      console.log("🚀 ~ handleDownloadExcel ~ response:", response);
      const entries = response?.payload?.results || [];

      if (entries.length === 0) {
        showToast("error", "No entries available to download.");
        return;
      }
      let formattedData = [];

      if (filter === "card") {
        formattedData = entries.map((entry, index) => ({
          "S.No": index + 1,
          "Date of Invoice Creation": formatDateToDDMMYYYY(entry?.creationDate),
          "Invoice Number": entry?.invoiceId,
          Customer: `${entry?.customer?.firstName || "-"} ${
            entry?.customer?.name || "-"
          }`,
          "Subject Type": entry?.subject || "-",
          Amount: entry?.payment?.amount || "-",
          "Payment Date": formatDateToDDMMYYYY(entry?.payment?.date),
          "Payment Method": entry?.payment?.method || "Card",
          Status: entry?.status || "Paid",
        }));
      } else if (filter === "vehicle") {
        formattedData = entries.map((entry, index) => {
          return {
            "S.No": index + 1,
            ID: entry?.vehicleId || entry?._id,
            Make: entry?.make || "-",
            Model: entry?.model || "-",
            "Date Added": formatDateToDDMMYYYY(entry?.createdAt),
            "Purchase Price": entry?.purchasePrice,
            "Selling Price": entry?.sellingPrice,
            Profit: entry?.profit,
            Evaluation: entry?.evaluation || "A",
            "Date Sold": formatDateToDDMMYYYY(entry?.updatedToSold),
          };
        });
      } else if (filter === "revenue") {
        formattedData = entries.map((entry, index) => ({
          "S.No": index + 1,
          Date: formatDateToDDMMYYYY(entry?.date),
          Sales: entry?.sales,
          Income: entry?.income,
        }));
      } else if (filter === "income") {
        formattedData = entries.map((entry, index) => ({
          "S.No": index + 1,
          ID: entry?._id,
          Customer: `${entry?.customerId?.firstName || "-"} ${
            entry?.customerId?.name || "-"
          }`,
          "Payment Date": formatDateToDDMMYYYY(entry?.date),
          "Payment Method": entry?.method || "-",
          "Tax Rate": entry?.taxRate ? `${entry.taxRate}%` : "-",
          Amount: entry?.amount || "-",
          Status: entry?.status || "Paid",
        }));
      } else {
        // Default fallback structure
        formattedData = entries.map((entry, index) => ({
          "S.No": index + 1,
          Name: `${entry?.customerId?.firstName || "-"} ${
            entry?.customerId?.name || "-"
          }`,
          CreationDate: formatDateToDDMMYYYY(entry?.creationDate) || "-",
          DueDate: formatDateToDDMMYYYY(entry?.dueDate) || "-",
          Price: entry?.price ? Number(entry.price).toFixed(2) : "-",
          TotalPaid: entry?.totalPaid
            ? Number(entry.totalPaid).toFixed(2)
            : "-",
          Status: entry?.status || "-",
          PaymentMethod: entry?.latestPaymentMethod || "-",
        }));
      }

      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      // 🔥 Auto-width columns
      const columnWidths = Object.keys(formattedData[0]).map((key) => {
        const maxLength = Math.max(
          key.length,
          ...formattedData.map((item) =>
            item[key] ? item[key].toString().length : 0
          )
        );
        return { wch: maxLength + 5 };
      });
      worksheet["!cols"] = columnWidths;

      const today = new Date().toISOString().slice(0, 10); // e.g., "2025-04-12"
      const fileName = `${filter} Report ${today}.xlsx`;
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
      XLSX.writeFile(workbook, fileName);
    } catch (err) {
      console.error("Failed to download Excel:", err);
      showToast("error", "Failed to download Excel file.");
    }
  };

  // if (loading) {
  //   return <CheckLoader size={80} />;
  // }
  return (
    <>
      {filter === "revenue" && <BarChart />}
      <div className="bg-white rounded-[10px] shadow-md mt-10">
        <div className="flex items-center justify-between p-4">
          <div className="grid grid-cols-3 items-end justify-between gap-8 ">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[300px] col-span-2">
              <IoSearchOutline className="h-4 w-4 text-darkBlue" />
              <input
                type="text"
                placeholder="Search"
                className="pr-4 py-2 rounded-lg outline-none placeholder:text-darkBlue text-sm"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <p className="text-darkBlue text-sm font-medium capitalize">
              {allReports?.results?.length} Results Found
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-5 ">
              {/* <p className="font-semibold text-base capitalize ">
                select date:
              </p> */}
              <input
                name="startDate"
                type="date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Select Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-2 py-2 rounded-md placeholder:text-darkBlue text-sm "
              />
              <input
                name="endDate"
                type="date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Select End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border px-2 py-2 rounded-md placeholder:text-darkBlue outline-none text-sm"
              />
              {/* <Button
              textColor="white"
              text="Reset"
              fontSize="text-sm"
              borderRadius="rounded"
                onClick={() => {
                setStartDate("");
                setEndDate("");
              
              }}
              icon={<Icons.MdOutlineRefresh size={20}  />}
            
            /> */}
            </div>
            <Button
              textColor="white"
              text="Exportieren"
              fontSize="text-sm"
              borderRadius="rounded"
              icon={<Icons.FiUpload />}
              onClick={handleDownloadExcel}
            />
          </div>
        </div>
        {loading ? (
          <ShimmerTable row={10} col={8} />
        ) : allReports?.totalCount === 0 ? (
          <NoDataFound
            content="reports not found"
            height={"h-[300px]"}
            fontSize={"text-2xl"}
          />
        ) : (
          <div>
            <CustomTable
              TableHeader={(props) => (
                <TableHeader
                  {...props}
                  filter={filter}
                  headerData={headerData}
                  showHeader={showHeader}
                  totalIncome={totalIncome}
                />
              )}
              TableBody={(props) => (
                <TableBody {...props} filter={filter} showHeader={showHeader} />
              )}
              data={allReports?.results}
            />
          </div>
        )}
        {allReports?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            itemsPerPage={limit}
            totalCount={allReports?.totalCount}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </>
  );
};

export default ReportsComponent;
