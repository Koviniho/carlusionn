/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";

import CustomTable from "../../components/Custom-Tabel";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../../components/Button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import FilterSvg from "../../assets/svg/filter";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import CustomInput from "../../components/Input/custoInput";
import {
  customerInputs,
  CustomerInitialValues,
  customervalidationSchema,
  editCustomervalidationSchema,
} from "../../Inputs/customer.input";
import {
  addNewCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomerById,
} from "../../store/features/customer/customer.slice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFormate";

import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../../components/NoDataFound";
import Images from "../../assets/images";
import FilterComponent from "../../components/VehicleManagementComponent/vehicleFilters/vehicleFilters";
import Modal from "../../components/modal/modal";
import Icons from "../../assets/icons";
import Text from "../../components/Heading/text";
import { customerDocumentInputs } from "../../Inputs/customerInputs";
import Pagination from "../Pagination";
import BarChart from "../Charts/barCharts";

function TableHeader({ headerData, totalIncome }) {
  return (
    <thead>
      {totalIncome ? (
        <tr className="bg-primary ">
          {headerData.map((header, index) => (
            <th
              key={index}
              scope="col"
              className={`py-3.5 px-2 text-left font-medium text-white ${header.className}`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      ) : (
        <tr className="bg-primary ">
          <th
            scope="col"
            className="py-3.5 pl-5 text-left font-semibold text-white w-[2%]"
          >
            <input
              type="checkbox"
              className="p-1.5  appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-white 
            "
            />
          </th>
          <th
            scope="col"
            className="py-3.5    text-left font-medium text-white w-auto"
          >
            Marke
          </th>
          <th scope="col" className="  text-left  font-medium text-white ">
            Modell
          </th>
          <th scope="col" className=" text-left  font-medium text-white ">
            Datum
          </th>
          <th
            scope="col"
            className=" py-3.5  text-left  font-medium text-white "
          >
            Kaufpreis
          </th>
          <th
            scope="col"
            className="  py-3.5  text-left  font-medium text-white "
          >
            Verkaufspreis
          </th>
          <th
            scope="col"
            className="  py-3.5 px-2  text-left font-medium text-white "
          >
            Verkaufs Datum
          </th>
          <th
            scope="col"
            className=" py-3.5  text-left font-medium text-white "
          >
            Bewertung
          </th>
          <th
            scope="col"
            className=" py-3.5  text-left font-medium text-white "
          >
            Gewinn
          </th>
        </tr>
      )}
    </thead>
  );
}

function TableBody({ data, selectedData, income, bodyData }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractTemplate, setContractTemplates] = useState(null);
  const handleEditClick = (item) => {
    setContractTemplates(item);
    formik.setValues({
      profileImage: null,
      customerName: item.customerName || "",

      phoneNunmber: item?.phoneNunmber || "",
      totalPurchases: item?.totalPurchases || "",
      lastInteraction: item?.lastInteraction
        ? new Date(item.lastInteraction).toISOString().split("T")[0] // Convert to "YYYY-MM-DD"
        : "",
      companyName: item?.companyName || "",
      address: item?.address || "",
      status: item?.status,
      insuranceProvider: item?.insuranceProvider,
      licensePlateNumber: item?.licensePlateNumber,

      email: item?.email || "",
    });

    setModalOpen(true);
  };
  const handleDeleteClick = async (item) => {
    const response = await dispatch(deleteCustomer(item._id));
    if (response) {
      dispatch(getAllCustomers());
    }
  };
  const formik = useFormik({
    initialValues: CustomerInitialValues,
    validationSchema: editCustomervalidationSchema,

    onSubmit: async (values) => {
      let formData;

      if (values.contractFile) {
        // If contractFile is provided, create a FormData object
        formData = new FormData();
        Object.keys(values).forEach((key) => {
          // Append all values to FormData, including contractFile
          formData.append(key, values[key]);
        });
      } else {
        // If no contractFile is provided, submit as a regular object
        formData = { ...values };
        delete formData.contractFile; // Optionally remove contractFile field if not needed
      }

      // Submit the form data
      const response = await dispatch(
        updateCustomerById({
          id: selectedContractTemplate?._id,
          body: formData,
        })
      );

      if (response) {
        dispatch(getAllCustomers());

        // setContractModal(true);
      }
    },
  });
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
            <td className="whitespace-nowrap py-4 px-5 font-medium">
              <input
                type="checkbox"
                className="p-1.5  appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-white 
            "
              />
            </td>
            <td className="whitespace-nowrap text-darkBlue py-4 text-lightBlackText">
              {item.make}
            </td>
            <td className="whitespace-nowrap text-grayText py-4 text-lightBlackText">
              {item?.model || "-"}
            </td>
            <td className="whitespace-nowrap py-4  text-grayText">
              {item?.recharge_date || "-"}
            </td>
            <td className="whitespace-nowrap py-4  text-grayText ">
              {item?.selling_price || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {item?.selling_price || "-"}
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {item?.recharge_date || "-"}
            </td>
            <td className="whitespace-nowrap text-left py-4 text-grayText">
              {item?.rating || "-"}
            </td>
            <td
              className={`${
                parseFloat(item.selling_price) < 0
                  ? "text-red-500" // Red for negative values
                  : parseFloat(item.selling_price) > 0
                  ? "text-green-500" // Green for positive values
                  : "text-darkblue" // Default color for zero or invalid values
              } whitespace-nowrap py-4 text-left font-medium  `}
            >
              {item?.selling_price}
            </td>

            {income ? (
              <td className="text-lightBlackText ">
                <div className="flex items-center gap-2 ">
                  <Icons.FiEdit size={16} className="text-darkBlue" />

                  <img
                    src={Images.bin}
                    className="text-error cursor-pointer w-4"
                  />

                  {/* <MdOutlineRemoveRedEye
                    size={20}
                    className="text-secondary cursor-pointer"
                  /> */}
                </div>
              </td>
            ) : null}
          </tr>
        );
      })}
    </tbody>
  );
}
const CarTrafficComponent = ({ company, income, totalIncome }) => {
  const [showDocumentfirstModal, setShowDocumentFirstModal] = useState(false);
  const fileInputRef = useRef(null);
  const data = [
    {
      id: 1,
      isSelected: false,
      make: "BMW",
      model: "X4 M Compedition",
      selling_price: "102200 CHF",
      recharge_date: "01 Aug, 2012",
      date: "01 Aug, 2012",
      rating: "A",
    },
    {
      id: 2,
      isSelected: false,
      make: "BMW",
      model: "X4 M Compedition",
      selling_price: "102200 CHF",
      trans_id: "TX001",
      customerName: "John Doe",
      recharge_date: "01 Aug, 2012",

      totalPurchases: "---",
      date: "01 Aug, 2012",
      rating: "A",
      amount: "$12,766",
      status: "Überfällig",
      payment_method: "Credit Card",
    },
    {
      id: 3,
      isSelected: false,
      make: "BMW",
      model: "X4 M Compedition",
      selling_price: "102200 CHF",
      trans_id: "TX001",
      customerName: "John Doe",
      recharge_date: "01 Aug, 2012",

      totalPurchases: "---",
      date: "01 Aug, 2012",
      rating: "A",
      amount: "$12,766",
      status: "Bezahlt",
      payment_method: "Credit Card",
    },
    {
      id: 4,
      isSelected: false,
      make: "BMW",
      model: "X4 M Compedition",
      selling_price: "102200 CHF",
      trans_id: "TX001",
      customerName: "John Doe",
      recharge_date: "01 Aug, 2012",

      totalPurchases: "---",
      date: "01 Aug, 2012",
      rating: "A",
      amount: "$12,766",
      status: "Bezahlt",
      payment_method: "Credit Card",
    },
    {
      id: 5,
      isSelected: false,
      make: "BMW",
      model: "X4 M Compedition",
      selling_price: "102200 CHF",
      trans_id: "TX001",
      customerName: "John Doe",
      recharge_date: "01 Aug, 2012",

      totalPurchases: "---",
      date: "01 Aug, 2012",
      rating: "A",
      amount: "$12,766",
      status: "Bezahlt",
      payment_method: "Credit Card",
    },
    {
      id: 6,
      isSelected: false,
      make: "BMW",
      model: "X4 M Compedition",
      selling_price: "102200 CHF",
      trans_id: "TX001",
      customerName: "John Doe",
      recharge_date: "01 Aug, 2012",

      totalPurchases: "---",
      date: "01 Aug, 2012",
      rating: "A",
      amount: "$12,766",
      status: "Bezahlt",
      payment_method: "Credit Card",
    },
  ];

  const dispatch = useDispatch();
  const [customerPopUp, setCustomerPopUp] = useState(false);
  // const { isLoading, customers } = useSelector((state) => state.customer);
  const { isLoading } = useSelector((state) => state.customer);

  /////////////////for total income /////////////////////////
  const headerData = [
    { label: "Zeitraum" },
    { label: "Umsatz Exkl. Steuer" },
    { label: "Einnahmen Exkl. Steuer" },
  ];

  const bodyData = [
    { date: "02.12.2024", revenue: "1’966.28 CHF", income: "3’715.51 CHF" },
    { date: "02.12.2024", revenue: "1’966.28 CHF", income: "3’715.51 CHF" },
    { date: "02.12.2024", revenue: "1’966.28 CHF", income: "3’715.51 CHF" },
  ];
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
    // {
    //   title: "Top Referrers",
    //   value: "3521",
    //   icon: <RefundSvg />,
    // },
  ];
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
        setCustomerPopUp(false);
        formik.resetForm();
      }
    },
  });

  const [tabeldata, setData] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      value: `Value ${index + 1}`,
    }))
  );
  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);
  ///////////////// for table header Section ///////////
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search query changes
  };
  /////////////////// pagination/////////////
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const handleItemsPerPageChange = (value) => {
    const validValue = Math.max(1, value);
    setItemsPerPage(validValue);
    setCurrentPage(1); // Reset to the first page
  };
  return (
    <>
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
              0 Results Found
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              text="Filters"
              textColor="white"
              borderRadius="rounded"
              fontSize="text-base"
              padding="px-5 py-2"
              icon={<FilterSvg />}
              onClick={() => setShowFilters(true)}
            />

            <Modal
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              title={"Add Vehicle"}
              width={"w-[70%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setShowFilters}
            >
              <FilterComponent />
            </Modal>
            <Button
              textColor="white"
              text="Exportieren"
              fontSize="text-base"
              borderRadius="rounded"
              icon={<img src={Images.upload} className="h-6 w-6" />}
              //   onClick={() => setCustomerPopUp(true)}
            />
            <Modal
              isOpen={customerPopUp}
              onClose={() => setCustomerPopUp(false)}
              title={"Add Customer"}
              width={"w-[50%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setCustomerPopUp}
            >
              <form onSubmit={formik.handleSubmit} className="">
                <div className="space-y-1.5 gap-3 grid grid-cols-2  py-4 ">
                  {customerInputs.map((field, index) => (
                    <div
                      key={index}
                      className={`
                       ${
                         ["plz", "ort", "address", "nr"].includes(field.name)
                           ? "col-span-1"
                           : "col-span-2"
                       }
                     `}
                    >
                      <CustomInput
                        type={field.type}
                        name={field.name}
                        label={field.label}
                        value={formik.values[field.name]}
                        placeholder={field.placeholder}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors[field.name]}
                        touched={formik.touched[field.name]}
                        options={field.options || []}
                      />
                    </div>
                  ))}
                </div>
                <div className=" py-8">
                  <Button
                    type="submit"
                    text="Add Customer"
                    textColor="white"
                    onClick={() => {
                      setCustomerPopUp(false);
                      setShowDocumentFirstModal(true);
                    }}
                    className="w-full"
                    fontSize="text-xl"
                    borderRadius="rounded-lg"
                  />
                </div>
              </form>
            </Modal>
            {/* //////////////////modal for add document ////////////////////////// */}
            <Modal
              isOpen={showDocumentfirstModal}
              onClose={() => setShowDocumentFirstModal(false)}
              title={"Add Document"}
              width={"w-[60%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setShowDocumentFirstModal}
            >
              <>
                <div className="space-y-4 p-5">
                  {company ? null : (
                    <div className="space-y-4">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 gap-3 ">
                          {customerDocumentInputs?.map((input) =>
                            input.type === "file" ? (
                              <div
                                key={input.name}
                                className="flex flex-col items-start gap-2 "
                              >
                                <label className="font-medium text-left text-darkBlue">
                                  {input.label}
                                </label>

                                <button
                                  type="button"
                                  onClick={() =>
                                    fileInputRef[input.name].click()
                                  }
                                  className="px-8 py-2 border border-darkBlue bg-inherit text-darkBlue rounded cursor-pointer"
                                >
                                  Upload Documents
                                </button>

                                <input
                                  type="file"
                                  name={input.name}
                                  ref={(el) => (fileInputRef[input.name] = el)}
                                  onChange={formik.handleChange}
                                  className="hidden"
                                />
                              </div>
                            ) : (
                              <CustomInput
                                key={input.name}
                                type={input.type}
                                name={input.name}
                                label={input.label}
                                required={input.required}
                                value={formik.values[input.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.errors[input.name] &&
                                  formik.touched[input.name]
                                }
                                touched={formik.touched[input.name]}
                                options={input.options || []}
                                placeholder={input.placeholder}
                                paddingY={"py-3"}
                              />
                            )
                          )}
                        </div>
                      </form>
                      <div className="space-y-3">
                        {["", ""].map((item, index) => (
                          <div
                            key={index} // Always include a unique key when mapping
                            className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                          >
                            <img
                              src={Images.idCard}
                              className="border h-[100px] w-2/12 rounded-md object-cover"
                              alt="Signup"
                            />
                            <div className="flex-grow flex flex-col gap-10">
                              <div className="flex flex-col gap-4">
                                <Text content="Title Image" textColor="black" />
                                <div className="flex items-center gap-4">
                                  <Icons.RiDeleteBin6Line size={20} />
                                  <Icons.IoReload size={20} />
                                  <Icons.IoEyeOutline size={20} />
                                </div>
                              </div>
                            </div>
                            <div className="self-center">
                              <Icons.BiGridVertical
                                size={50}
                                className="text-lightGray"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-start gap-2 ">
                    <label className="font-medium text-left text-darkBlue">
                      Documents
                    </label>

                    <button
                      type="button"
                      onClick={() => fileInputRef["documents"].click()}
                      className="px-8 py-2 border border-darkBlue bg-inherit text-darkBlue rounded cursor-pointer"
                    >
                      Upload Documents
                    </button>

                    <input
                      type="file"
                      name="documents"
                      ref={(el) => (fileInputRef["documents"] = el)}
                      onChange={formik.handleChange}
                      className="hidden"
                    />
                  </div>
                  <div className="space-y-3">
                    {["", "", ""].map((item, index) => (
                      <div
                        key={index} // Always include a unique key when mapping
                        className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                      >
                        <img
                          src={Images.carCopy}
                          className="border h-[100px] w-2/12 rounded-md object-cover"
                          alt="Signup"
                        />
                        <div className="flex-grow flex flex-col gap-10">
                          <div className="flex flex-col gap-4">
                            <Text content="Title Image" textColor="black" />
                            <div className="flex items-center gap-4">
                              <Icons.RiDeleteBin6Line size={20} />
                              <Icons.IoReload size={20} />
                              <Icons.IoEyeOutline size={20} />
                            </div>
                          </div>
                        </div>
                        <div className="self-center">
                          <Icons.BiGridVertical
                            size={50}
                            className="text-lightGray"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <Button
                    text="Add Vehicle"
                    borderRadius="rounded-md"
                    textColor="white"
                    onClick={() => {
                      showDocumentfirstModal(false);
                      // setShowSixthPopup(true);
                    }}
                    className="mt-4 w-full"
                    bgColor="primary"
                    borderColor="primary"
                  />
                </div>
              </>
            </Modal>
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={8} />
        ) : data?.length === 0 ? (
          <NoDataFound />
        ) : (
          <CustomTable
            TableHeader={(props) => (
              <TableHeader
                {...props}
                income={income}
                headerData={headerData}
                totalIncome={totalIncome}
              />
            )}
            TableBody={(props) => (
              <TableBody
                {...props}
                income={income}
                // onDropdownSelect={handleDropdownSelect}
                // setModalOpen={setModalOpen}
                // modalOpen={modalOpen} // Pass setModalOpen down
              />
            )}
            bodyData={bodyData}
            data={data}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={100}
        itemsPerPage={10}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default CarTrafficComponent;
