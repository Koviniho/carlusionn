/* eslint-disable react/prop-types */


import { useEffect, useRef, useState } from "react";

import CustomTable from "../../components/Custom-Tabel";
import { IoSearchOutline } from "react-icons/io5";

import { useFormik } from "formik";
import {
  CustomerInitialValues,
  customervalidationSchema,
  editCustomervalidationSchema,
} from "../../Inputs/customer.input";
import {
  addNewCustomer,
  deleteCustomer,
  getAllCustomers,
  setLimit,
  setPage,
  updateCustomerById,
} from "../../store/features/customer/customer.slice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDateByMonth } from "../../utils/dateFormate";

import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../../components/NoDataFound";
import Images from "../../assets/images";

import InfoCard from "../InfoCard";
import Pagination from "../Pagination";
import Breadcrumb from "../Breadcrumb";
import Icons from "../../assets/icons";

function TableHeader({ checkboxRef, checked, onToggleAll }) {
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
          className="py-3.5 pl-5   text-left font-medium text-white "
        >
          Kundenprofil
        </th>
        <th scope="col" className="  text-left  font-medium text-white">
          Kundenname
        </th>
        <th scope="col" className=" text-left  font-medium text-white ">
          Kundentyp
        </th>
        <th
          scope="col"
          className=" py-3.5  text-left  font-medium text-white "
        >
          Telefon nummer
        </th>
        <th
          scope="col"
          className="  py-3.5  text-center  font-medium text-white "
        >
          Kunden nummer
        </th>
        <th
          scope="col"
          className="  py-3.5 px-2  text-left font-medium text-white"
        >
          Last Interaction
        </th>
        <th
          scope="col"
          className=" py-3.5  text-left font-medium text-white "
        >
          Status
        </th>

        <th
          scope="col"
          className="py-3.5   font-medium text-white  "
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData }) {
  // const dispatch = useDispatch();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedContractTemplate, setContractTemplates] = useState(null);
  // const handleEditClick = (item) => {
  //   setContractTemplates(item);
  //   formik.setValues({
  //     profileImage: null,
  //     customerName: item.customerName || "",

  //     phoneNunmber: item?.phoneNunmber || "",
  //     totalPurchases: item?.totalPurchases || "",
  //     lastInteraction: item?.lastInteraction
  //       ? new Date(item.lastInteraction).toISOString().split("T")[0] // Convert to "YYYY-MM-DD"
  //       : "",
  //     companyName: item?.companyName || "",
  //     address: item?.address || "",
  //     status: item?.status,
  //     insuranceProvider: item?.insuranceProvider,
  //     licensePlateNumber: item?.licensePlateNumber,

  //     email: item?.email || "",
  //   });

  //   setModalOpen(true);
  // };
  // const handleDeleteClick = async (item) => {
  //   const response = await dispatch(deleteCustomer(item._id));
  //   if (response) {
  //     dispatch(getAllCustomers());
  //   }
  // };
  // const formik = useFormik({
  //   initialValues: CustomerInitialValues,
  //   validationSchema: editCustomervalidationSchema,

  //   onSubmit: async (values) => {
  //     let formData;

  //     if (values.contractFile) {
  //       // If contractFile is provided, create a FormData object
  //       formData = new FormData();
  //       Object.keys(values).forEach((key) => {
  //         // Append all values to FormData, including contractFile
  //         formData.append(key, values[key]);
  //       });
  //     } else {
  //       // If no contractFile is provided, submit as a regular object
  //       formData = { ...values };
  //       delete formData.contractFile; // Optionally remove contractFile field if not needed
  //     }

  //     // Submit the form data
  //     const response = await dispatch(
  //       updateCustomerById({
  //         id: selectedContractTemplate?._id,
  //         body: formData,
  //       })
  //     );

  //     if (response) {
  //       dispatch(getAllCustomers());

  //       // setContractModal(true);
  //     }
  //   },
  // });
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
            {/* <td className="whitespace-nowrap py-4 px-5 font-medium">
              <input
                type="checkbox"
                className="p-1.5  appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-white 
            "
              />
            </td> */}
            <td className="whitespace-nowrap pl-8 text-primary py-4 text-lightBlackText">
              <img
                // src={`${config.imageBaseUrl}/customer/${item?.profileImage}`}
                src={item.profileImage}
                alt="customer"
                className="h-[42px] w-[42px] object-cover rounded-full"
              />
            </td>
            <td className="whitespace-nowrap text-darkBlue py-4 text-lightBlackText">
              {item?.customerName || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {item?.customerType || "-"}
            </td>
            <td className="whitespace-nowrap py-4  text-grayText">
              {item?.phoneNumber || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-center text-grayText ">
            {item?.id.slice(0,11) || "-"}...
            </td>
            <td className="whitespace-nowrap py-4 text-center text-grayText">
              {formatDateByMonth(item?.lastInteraction) || "-"}
            </td>
            <td
              className={`${
                item.status === "active"
                  ? "text-secondary"
                  : item.status === "inactive"
                  ? "text-error"
                  : "text-darkblue"
              } whitespace-nowrap py-4 capitalize text-left font-medium  `}
            >
              {item?.status}
            </td>
            <td className={` whitespace-nowrap py-4 text-center font-medium px-4 `}>
              <div
                className={`${
                  item.action === "Sent"
                    ? "text-white bg-secondary px-8"
                    : item.action === "Congratulations"
                    ? "text-primary border-primary px-4"
                    : "text-darkblue"
                }  whitespace-nowrap inline-block py-2  rounded-md border text-primary border-primary px-4`}
              >
                 Congratulations
              </div>
            </td>
            
          </tr>
        );
      })}
    </tbody>
  );
}
const BirthdayList = () => {
  // const [showDocumentfirstModal, setShowDocumentFirstModal] = useState(false);
  // const fileInputRef = useRef(null);
  const data = [
    {
      id: 1,
      isSelected: false,
      profileImage: Images.profile,
      customerName: "John Doe",
      customerType: "Privat Person",
      phoneNumber: "+123-456-7890",
      totalPurchases: 305,
      lastInteraction: "2024-03-01",
      status: "Active",
      action: "Sent",
    },
    {
      id: 2,
      isSelected: false,
      profileImage: Images.profile,
      customerName: "Jane Smith",
      customerType: "Partner Garage",
      phoneNumber: "+987-654-3210",
      totalPurchases: 101,
      lastInteraction: "2024-02-28",
      status: "Inactive",
      action: "Congratulations",
    },
    {
      id: 3,
      isSelected: false,
      profileImage: Images.profile,
      customerName: "Alice Johnson",
      customerType: "Returning",
      phoneNumber: "+456-789-1230",
      totalPurchases: 201,
      lastInteraction: "2024-03-02",
      status: "Active",
      action: "Sent",
    },
    {
      id: 4, // Unique identifier
      isSelected: false, // Selection state
      profileImage: Images.profile, // Customer profile image filename
      customerName: "John Doe", // Customer name
      customerType: "Privat Person",
      phoneNumber: "+123-456-7890", // Phone number
      totalPurchases: 305, // Total number of purchases
      lastInteraction: "2024-03-01", // Last interaction date
      status: "Active",
      action: "Congratulations",
    },
    {
      id: 5,
      isSelected: false,
      profileImage: Images.profile,
      customerName: "Jane Smith",
      customerType: "Partner Garage",
      phoneNumber: "+987-654-3210",
      totalPurchases: 101,
      lastInteraction: "2024-02-28",
      status: "Inactive",
      action: "Congratulations",
    },
    {
      id: 6,
      isSelected: false,
      profileImage: Images.profile,
      customerName: "Alice Johnson",
      customerType: "Returning",
      phoneNumber: "+456-789-1230",
      totalPurchases: 201,
      lastInteraction: "2024-03-02",
      status: "Active",
      action: "Congratulations",
    },
  ];

  const dispatch = useDispatch();
  // const [customerPopUp, setCustomerPopUp] = useState(false);


  // const formik = useFormik({
  //   initialValues: CustomerInitialValues,
  //   validationSchema: customervalidationSchema,
  //   onSubmit: async (values) => {
  //     const formData = new FormData();

  //     Object.keys(values).forEach((key) => {
  //       formData.append(key, values[key]);
  //     });
  //     const response = await dispatch(addNewCustomer(formData));
  //     if (response) {
  //       dispatch(getAllCustomers());
  //       setCustomerPopUp(false);
  //       formik.resetForm();
  //     }
  //   },
  // });



  ///////////////// for table header Section ///////////

  // const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    dispatch(getAllCustomers({ page, limit, search: query,  birthDateDay,birthDateMonth }));
    setSearchQuery(query);
  };
  const stats = [
    {
      title: " Total Customers",
      value: "3521",
      icon: <img src={Images.person} alt="" className="w-8 h-8" />,
    },
    {
      title: "New Customers",
      value: "3521",
      icon: <img src={Images.person} alt="" className="w-8 h-8" />,
    },
    {
      title: "Returning Customers",
      value: "3521",
      icon: <img src={Images.person} alt="" className="w-8 h-8" />,
    },
  ];

  //////////   for birthday list /////////
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);
  const birthDateDay = new Date(selectedDate).getDate(); // Day (1-31)
const birthDateMonth = new Date(selectedDate).getMonth() + 1; // Month (1-12)
  console.log("🚀 ~ BirthdayList ~ selectedDate:", selectedDate)
  const [animate, setAnimate] = useState(""); // Controls animation class

  const changeDate = (days) => {
    setAnimate(days > 0 ? "animate-slide-in-left" : "animate-slide-in-right");
    setTimeout(() => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
      setSelectedDate(newDate.toISOString().split("T")[0]);
      setAnimate(""); // Reset animation
    }, 200);
  };
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const handleItemsPerPageChange = (value) => {
  //   const validValue = Math.max(1, value);
  //   setItemsPerPage(validValue);
  //   setCurrentPage(1); // Reset to the first page
  // };

  const { isLoading,customers,page,limit } = useSelector((state) => state?.customer);
  console.log("🚀 ~ BirthdayList ~ customers:", customers)

    useEffect(() => {
      dispatch(getAllCustomers({page,limit,  birthDateDay,birthDateMonth}));
    }, [birthDateDay, birthDateMonth, dispatch, limit, page]);
  return (
    <>
      <Breadcrumb heading="Customer Lists" pageName="Customer Management" />
      <div className="flex w-full items-start gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mt-5">
          {stats.map((stat, index) => (
            <div key={index}>
              <InfoCard
                title={stat.title}
                value={stat.value}
                icon={stat?.icon}
                textColor="darkBlue"
              />
            </div>
          ))}
        </div>

        <div className="  bg-white rounded shadow-md  mt-5 ">
          <div className="bg-primary text-white px-4 py-2 rounded-t-lg w-full text-center font-semibold">
            Geburtstagsliste
          </div>
          <div className="flex items-center justify-between gap-2 w-full py-4 px-8">
            <button
              onClick={() => changeDate(-1)}
              className="text-grayText hover:text-black transition"
            >
              <Icons.FaCaretLeft size={24} />
            </button>
            <div className={`text-2xl font-semibold transition-all ${animate}`}>
              {new Date(selectedDate).toLocaleDateString("de-DE")}
            </div>
            <button
              onClick={() => changeDate(1)}
              disabled={selectedDate === today}
              className={`transition ${
                selectedDate === today
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-grayText hover:text-black"
              }`}
            >
              <Icons.FaCaretRight size={24} />
            </button>
          </div>
        </div>
      </div>
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
            {customers?.totalCount} results found
            </p>
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={8} />
        ) : customers?.results?.length === 0 ? (
          <NoDataFound content="Customers not found" height={"h-[300px]"} fontSize={"text-2xl"} />
        ) : (
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
            data={customers?.results}
          />
        )}
        {customers?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            totalCount={customers?.totalCount}
            itemsPerPage={limit}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </>
  );
};

export default BirthdayList;
