/* eslint-disable react/prop-types */
import { useState } from "react";
import CustomTable from "../../components/Custom-Tabel";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../../components/Button";
import { useFormik } from "formik";
import CustomInput from "../../components/Input/custoInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../../components/NoDataFound";
import Modal from "../../components/modal/modal";
import axios from "../../services/api";
import { ADD_CASHBOOK, DELETE_CASHBOOK } from "../../utils/baseURL";
import showToast from "../../utils/toaster";
import { formatDateToDDMMYYYY } from "../../utils/dateFormate";
import useUserInfo from "../../hooks/useUserInfo";
import {
  fetchAllCashbook,
  setLimit,
  setPage,
} from "../../store/features/cashBookSlice/getAllCashBookSlice";
import Pagination from "../Pagination";
import Swal from "sweetalert2";
import Icons from "../../assets/icons";
import { Tooltip } from "react-tooltip";

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary ">
        {/* <th
          scope="col"
          className="py-3.5 pl-5 text-left font-semibold text-white w-[2%]"
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
          className="py-3.5  pl-5  text-left font-medium text-white w-auto"
        >
          Nr
        </th>
        <th scope="col" className="  text-left  font-medium text-white ">
          Datum
        </th>
        <th scope="col" className=" text-left  font-medium text-white ">
          bezogen auf
        </th>
        <th scope="col" className=" py-3.5  text-left  font-medium text-white ">
          Kunde/Lieferant
        </th>
        <th
          scope="col"
          className="  py-3.5  text-left  font-medium text-white "
        >
          Beschreibung
        </th>
        <th
          scope="col"
          className="  py-3.5   text-left font-medium text-white "
        >
          Benutzer
        </th>
        <th scope="col" className=" py-3.5  text-left font-medium text-white ">
          Zahlungsbetrag
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

function TableBody({ data, selectedData,handleDeleteClick }) {
 
  console.log("🚀 ~ TableBody ~ data:", data);
  const userData = useUserInfo();
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRowExpansion = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <tbody className="bg-white">
      {data?.map((item, index) => {
        const isSelected = selectedData.includes(item);
        const isExpanded = expandedRows.includes(index);
        const description = item?.description || "-";
        const shouldTruncate = description.length > 10;
        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100`}
          >
            {/* <td className="whitespace-nowrap py-4 px-5 font-medium">
              <input
                type="checkbox"
                className="p-1.5  appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-white 
            "
              />
            </td> */}
            <td className="whitespace-nowrap text-primary py-4 px-5 text-lightBlackText">
              {index + 1}
            </td>
            <td className="whitespace-nowrap text-grayText py-4 text-lightBlackText">
              {formatDateToDDMMYYYY(item?.date) || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {item?.invoiceId?.slice(0, 13) || "-"}
            </td>
            <td className="whitespace-nowrap py-4  text-grayText">
              {item?.customerId?.firstName || "-"}{" "}
              {item?.customerId?.name || "-"}
            </td>
            {/* <td className="whitespace-nowrap py-4 text-grayText">
              {item?.description || "-"}
            </td> */}
               <td className="py-4 text-grayText max-w-xs break-words px-2 first-letter-cap">
              {isExpanded
                ? description
                : shouldTruncate
                ? description.slice(0, 10) + "..."
                : description}
              {shouldTruncate && (
                <button
                  onClick={() => toggleRowExpansion(index)}
                  className="ml-2 text-primary text-sm underline"
                >
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {userData?.username || "-"}
            </td>
            <td
              className={`${
                parseFloat(item.amount) < 0
                  ? "text-red-500" // Red for negative values
                  : parseFloat(item.amount) > 0
                  ? "text-green-500" // Green for positive values
                  : "text-darkblue" // Default color for zero or invalid values
              } whitespace-nowrap py-4 text-left font-medium  `}
            >
              {item?.amount} CHF
            </td>
            {/* <td className="text-lightBlackText  ">
              <div className="flex items-center justify-start gap-2 pl-4">
              
               <Icons.ImBin
                  className="text-red-500 cursor-pointer w-4"
                  onClick={() => handleDeleteClick(item)}
                />
              
              </div>
            </td> */}
            <td className="text-lightBlackText">
              <div className="flex items-center justify-start gap-2 pl-4">
                <Icons.ImBin
                data-tooltip-id={item.invoiceId ? "delete" : undefined}
                  className={`w-4 cursor-pointer ${
                    item.invoiceId
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500"
                  }`}
                  onClick={() => {
                    if (!item.invoiceId) handleDeleteClick(item);
                  }}
                />
                <Tooltip id="delete" place="top">
              Delete Cashbook not allowed that have invoice id 
            </Tooltip>
              </div>
            </td>
          </tr>
        );
      })}
        
    </tbody>
  );
}
const CashBookComponent = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.customer);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query) {
      dispatch(fetchAllCashbook({ page, limit, search: query }));
    } else {
      dispatch(fetchAllCashbook({ page, limit }));
    }
    setSearchQuery(query);
  };

  ///////////for cashbook entry ///////////////////
  const [openCashBookModal, setOpenCashBookModal] = useState(false);
  const [activeTab, setActiveTab] = useState("withdrawal");

  const fields = [
    {
      name: "amount",
      label: "Payment Amount",
      type: "number", // or "number" based on your formik config
      placeholder: "Enter amount",
    },
    {
      name: "date",
      label: "Payment Date",
      type: "date",
    },
    {
      name: "description",
      label: "Description (Helps the tax advisor to assign the entry)",
      type: "textarea",
      placeholder: "Lorem Ipsum...",
      rows: 3,
    },
  ];

  ///////////add cashbook entry /////////////
  const { allCashbookEntries, page, limit } = useSelector(
    (state) => state?.fetchAllCashbookSlice
  );
  console.log("🚀 ~ CashBookComponent ~ allCashbookEntries:", allCashbookEntries)
  const formik = useFormik({
    initialValues: {
      amount: activeTab === "deposit" ? "+" : "-",
      date: "",
      description: "",
    },
    validationSchema: Yup.object({
      amount: Yup.string()
        .matches(/^[+-]?\d+(\.\d{1,2})?$/, "Enter a valid amount")
        .required("Amount is required"),
      date: Yup.date().required("Date is required"),
      // description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let rawAmount = values.amount.replace(/[^\d.]/g, ""); // remove non-numeric chars
        let amount = parseFloat(rawAmount);
        if (activeTab === "withdrawal") {
          amount = -Math.abs(amount); // ensure negative
        } else {
          amount = Math.abs(amount); // ensure positive
        }

        const payload = {
          ...values,
          amount,
        };

        const response = await axios.post(ADD_CASHBOOK, payload);
        if (response?.data?.success) {
          console.log("Response:", response.data);
          showToast("success", response?.data?.message);
          resetForm();
          setOpenCashBookModal(false);
          dispatch(fetchAllCashbook({ page, limit }));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    formik.setFieldValue("amount", ""); // Clear value
    formik.setErrors({}); // Clear validation errors
    formik.setTouched({}); // Reset touched state
  };
  const handleDeleteClick = async (item) => {
    console.log("🚀 ~ handleDeleteClick ~ item:", item)
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
      const response = await axios.delete(DELETE_CASHBOOK(item));
      if (response?.data?.success) {
        showToast("success", response?.data?.message);
        dispatch(fetchAllCashbook({ page, limit }));

      }
    }
  };
  return (
    <>
      <Modal
        isOpen={openCashBookModal}
        onClose={() => setOpenCashBookModal(false)}
        title={"New Cashbook Entry"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setOpenCashBookModal}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-3   overflow-hidden my-10">
              <button
                className={` px-8 py-2 rounded-l-md font-medium ${
                  activeTab === "withdrawal"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                // onClick={() => {
                //   setActiveTab("withdrawal");
                //   formik.setFieldValue("amount", "-");
                // }}
                onClick={() => handleTabChange("withdrawal")}
              >
                - Withdrawal
              </button>
              <button
                className={` px-8 py-2 rounded-r-md font-medium ${
                  activeTab === "deposit"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                // onClick={() => {
                //   setActiveTab("deposit");
                //   formik.setFieldValue("amount", "+");
                // }}
                onClick={() => handleTabChange("deposit")}
              >
                + Deposit
              </button>
            </div>

            {fields?.slice(0, 2).map((field) => (
              <CustomInput
                key={field.name}
                {...field}
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                onBlur={formik.handleBlur}
                error={formik.errors[field.name]}
                touched={formik.touched[field.name]}
                className={`outline-none w-full border px-3 py-2 rounded ${
                  field.name === "amount"
                    ? activeTab === "deposit"
                      ? "text-secondary"
                      : "text-error"
                    : ""
                } `}
                fontWeight={"font-medium"}
              />
            ))}

            <p className="text-base text-left text-grayText ">
              Cash balance according to cash book:{" "}
              <span className="font-medium text-darkBlue">870.00 CHF</span>
            </p>

            {fields?.slice(2).map((field) => (
              <CustomInput
                key={field.name}
                {...field}
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                onBlur={formik.handleBlur}
                error={formik.errors[field.name]}
                touched={formik.touched[field.name]}
                className="outline-none w-full border px-3 py-2 rounded"
                rows="5"
                fontWeight={"font-medium"}
              />
            ))}

            <div className="mt-4">
              <Button
                text={"Add Cashbook Entry"}
                textColor="white"
                borderRadius="rounded-md"
                type="submit"
                isLoading={formik.isSubmitting}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Modal>
      <div className="bg-white rounded-[10px] shadow-md mt-10">
        <div className="flex items-center justify-between p-4">
          <div className="grid grid-cols-3 items-end justify-between gap-8 ">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[300px] col-span-2">
              <IoSearchOutline className="h-4 w-4 text-darkBlue" />
              <input
                type="text"
                placeholder="Search..."
                className="pr-4 py-2 rounded-lg outline-none placeholder:text-graytext text-sm"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <p className="text-darkBlue text-sm font-medium capitalize">
              {allCashbookEntries?.results?.length} Results Found
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              textColor="white"
              text="New Cashbook Entry"
              borderRadius="rounded"
              icon={<FaPlus className="h-3 w-3" />}
              onClick={() => setOpenCashBookModal(true)}
            />
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={8} />
        ) : allCashbookEntries?.totalCount === 0 ? (
          <NoDataFound
            content="Entries not found"
            height={"h-[300px]"}
            fontSize={"text-2xl"}
          />
        ) : (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => <TableBody {...props} handleDeleteClick={handleDeleteClick} />}
            data={allCashbookEntries?.results}
          />
        )}
        {allCashbookEntries?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            itemsPerPage={limit}
            totalCount={allCashbookEntries?.totalCount}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </>
  );
};

export default CashBookComponent;
