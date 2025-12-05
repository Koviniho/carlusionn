/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../Button";
import { FaPlus, FaRegEdit, FaRegEye } from "react-icons/fa";
import CustomTable from "../Custom-Tabel";
import { MdDeleteOutline, MdTune } from "react-icons/md";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewContract,
  deleteContract,
  getAllContract,
  updateContractById,
} from "../../store/features/contract/contractSlice";
import { formatDate } from "../../utils/dateFormate";
import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../NoDataFound";
import WarningModel from "../Modals/warning-model";
import PopUpModel from "../Modals/pop-up-modals";
import { useFormik } from "formik";
import CustomInput from "../Input/custoInput";
import { LuDownload } from "react-icons/lu";
import showToast from "../../utils/toaster";
import { config } from "../../services/api";
import { getAllContractTemplates } from "../../store/features/contractTemplates/contractTemplatesSlice";
import { getAllCustomers } from "../../store/features/customer/customer.slice";
import { getAllVehicle } from "../../store/features/vehicle/vehicleSlice";
import { Link } from "react-router-dom";
import { GiPriceTag } from "react-icons/gi";
import LeasingContractForm from "./forms/LeasingContractForm";
import PurchaseAgreementForm from "./forms/PurchaseAgreementForm";
import PurchaseContractForm from "./forms/PurchaseContractForm";
import LoanAgreementForm from "./forms/LoanAgreementForm";

const validationSchema = Yup.object({
  contractType: Yup.string().required("Contract Type is required"),
  customerName: Yup.string().required("Customer Name is required"),
  vehicle: Yup.string().required("Vehicle is required"),
  seller: Yup.string().required("Seller is required"),
  creationDate: Yup.date().required("Creation Date is required"),
  pickupDate: Yup.date().required("Pickup Date is required"),
  leasingProvider: Yup.string().required("Leasing Provider is required"),
  deposit: Yup.string().required("Deposit is required"),
  annualMileage: Yup.string().required("Annual Mileage is required"),
  duration: Yup.date().required("Duration is required"),
  monthlyCosts: Yup.string().required("Monthly Costs are required"),
  remainingValue: Yup.string().required("Remaining Value is required"),
  additionalMileageCosts: Yup.string().required(
    "Additional Mileage Costs are required"
  ),
});

function TableHeader({ checkboxRef, checked, onToggleAll }) {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className="py-3.5 pl-5 text-left font-semibold text-white"
        >
          <input type="checkbox" />
        </th>
        <th
          scope="col"
          className="w-1/6 pl-5 py-3.5 pr-3 text-left font-semibold text-white"
        >
          Contract ID
        </th>
        <th
          scope="col"
          className="w-1/6 px-3 py-3.5 text-left font-semibold text-white"
        >
          Customer name
        </th>
        <th
          scope="col"
          className="w-1/6 px-3 py-3.5 text-left font-semibold text-white"
        >
          Car Model
        </th>

        <th
          scope="col"
          className="w-1/6 px-3 py-3.5 text-left font-semibold text-white"
        >
          Date Created
        </th>
        <th
          scope="col"
          className="w-1/6 px-3 py-3.5 text-left font-semibold text-white"
        >
          Status
        </th>
        <th
          scope="col"
          className="w-1/6 px-3 py-3.5 text-left font-semibold text-white"
        >
          Download Contract
        </th>

        <th
          scope="col"
          className="w-1/6 px-3 py-3.5 text-left font-semibold text-white"
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData, editStateSet, editState }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractTemplate, setContractTemplates] = useState(null);
  const [addContract, setAddContract] = useState(false);
  const [contractId, setcontractId] = useState(null);
  const [customerNameId, setcustomerNameId] = useState(null);
  const [carModelId, setCarModelId] = useState(null);
  const [countractIDOption, SetCountractIdOption] = useState([
    { value: "", label: "Select Contract" },
  ]);
  const [customerNameOption, SetcustomerNameOption] = useState([
    { value: "", label: "Select name" },
  ]);
  const [vehicleOption, SetvehicleOption] = useState([
    { value: "", label: "Select Vehicle" },
  ]);

  const { contractTemplates } = useSelector((state) => state.contractTamplets);
  const { customers } = useSelector((state) => state.customer);
  const { vehicle } = useSelector((state) => state.vehicle);

  // useEffect(() => {
  //   if (contractTemplates?.results) {
  //     const contractId = [
  //       { value: "", label: "Select Contract Id" },
  //       ...contractTemplates.results.map((item) => ({
  //         value: item?.templateId,
  //         label: item?.templateId,
  //         id: item?._id,
  //       })),
  //     ];
  //     SetCountractIdOption(contractId);
  //   }
  //   if (customers?.results) {
  //     const contractName = [
  //       { value: "", label: "Select Customer Name" },
  //       ...customers.results.map((item) => ({
  //         value: item?.customerName,
  //         label: item?.customerName,
  //         id: item?._id,
  //       })),
  //     ];
  //     SetcustomerNameOption(contractName);
  //   }
  //   if (vehicle?.results) {
  //     const vehicleOptions = [
  //       { value: "", label: "Select Vehicle" }, // Add the first option
  //       ...vehicle.results.map((item) => ({
  //         value: item?.model,
  //         label: item?.model,
  //         id: item?._id,
  //       })),
  //     ];
  //     SetvehicleOption(vehicleOptions);
  //   }
  // }, [contractTemplates, customers, vehicle]);

  const formik = useFormik({
    initialValues: {
      contractType: "",
      customerName: "",
      vehicle: "",
      seller: "",
      creationDate: "",
      pickupDate: "",
      leasingProvider: "",
      deposit: "",
      annualMileage: "",
      duration: "",
      monthlyCosts: "",
      remainingValue: "",
      additionalMileageCosts: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const data = {
        contractId: contractId,
        customerName: customerNameId,
        carModel: carModelId,
        status: values.status,
      };
      const response = await dispatch(
        updateContractById({
          id: selectedContractTemplate?._id,
          body: data,
        })
      );

      if (response) {
        dispatch(getAllContract());

        // setContractModal(true);
      }
    },
  });
  const handleEditClick = async (item) => {
    try {
      setContractTemplates(item);
      setModalOpen(true);

      formik.setValues({
        contractId: item?.contractId?.templateId || "-",
        customerName: item?.customerName?.customerName || "-",
        carModel: item?.carModel?.model || "-",
        status: item?.status || "-",
      });

      setcontractId(item?.contractId?._id);
      setcustomerNameId(item?.customerName?._id);
      setCarModelId(item?.carModel?._id);
    } catch (error) {
      console.error("Error fetching data for editing:", error);
    }
  };

  const fields = [
    {
      name: "contractType",
      label: "Identify Contract",
      type: "select",
      options: [
        { value: "", label: "Select Contract" },
        { value: "Leasing Contract", label: "Leasing Contract" },
      ],
    },
    {
      name: "customerName",
      label: "Customer Name",
      type: "select",
      options: [
        { value: "", label: "Select Customer" },
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Alice Johnson", label: "Alice Johnson" },
      ],
    },
    {
      name: "vehicle",
      label: "Vehicle",
      type: "select",
      options: [
        { value: "", label: "Select Vehicle" },
        { value: "ABC123", label: "Toyota Camry - ABC123" },
        { value: "XYZ456", label: "Honda Accord - XYZ456" },
        { value: "LMN789", label: "Ford Focus - LMN789" },
      ],
    },
    {
      name: "seller",
      label: "Seller",
      type: "select",
      options: [
        { value: "", label: "Select Seller" },
        { value: "Seller A", label: "Seller A" },
        { value: "Seller B", label: "Seller B" },
        { value: "Seller C", label: "Seller C" },
      ],
    },
    { name: "creationDate", label: "Creation Date", type: "date" },
    { name: "pickupDate", label: "Pickup Date", type: "date" },
    {
      name: "leasingProvider",
      label: "Leasing Provider",
      type: "select",
      options: [
        { value: "", label: "Select Leasing Provider" },
        { value: "Provider 1", label: "Provider 1" },
        { value: "Provider 2", label: "Provider 2" },
        { value: "Provider 3", label: "Provider 3" },
      ],
    },
  ];

  const financingFields = [
    { name: "deposit", label: "Deposit", type: "text" },
    {
      name: "annualMileage",
      label: "Annual Mileage",
      type: "select",
      options: [
        { value: "", label: "Select Annual Mileage" },
        { value: "5000", label: "5,000 miles" },
        { value: "10000", label: "10,000 miles" },
        { value: "15000", label: "15,000 miles" },
        { value: "20000", label: "20,000 miles" },
        { value: "25000", label: "25,000 miles" },
      ],
    },
    { name: "duration", label: "Duration", type: "date" },
    { name: "monthlyCosts", label: "Monthly Costs", type: "text" },
    { name: "remainingValue", label: "Remaining Value", type: "text" },
    {
      name: "additionalMileageCosts",
      label: "Additional Mileage Costs",
      type: "text",
    },
  ];
  const handelDelete = async (item) => {
    const response = await dispatch(deleteContract(item?._id));
    if (response) {
      dispatch(getAllContract());
    }
  };
  const handleDownloadContract = async (item) => {
    try {
      const fileName = item?.contractId?.contractFile;

      if (!fileName) {
        throw new Error("File name not found");
      }

      // Construct the file URL
      const fileUrl = `${config.imageBaseUrl}/contractTemplates/${fileName}`;

      // Open the file URL in a new tab
      window.open(fileUrl, "_blank");

      // Display success toast
      showToast("success", "Contract opened in a new tab");
    } catch (error) {
      console.error("Error opening the file:", error.message);
      showToast("error", error.message || "Failed to open file");
    }
  };
  useEffect(() => {
    if (contractTemplates?.results) {
      const contractId = [
        { value: "", label: "Select Contract Id" },
        ...contractTemplates.results.map((item) => ({
          value: item?.templateId,
          label: item?.templateId,
          id: item?._id,
        })),
      ];
      SetCountractIdOption(contractId);
    }
    if (customers?.results) {
      const contractName = [
        { value: "", label: "Select Customer Name" },
        ...customers.results.map((item) => ({
          value: item?.customerName,
          label: item?.customerName,
          id: item?._id,
        })),
      ];
      SetcustomerNameOption(contractName);
    }
    if (vehicle?.results) {
      const vehicleOptions = [
        { value: "", label: "Select Vehicle" }, // Add the first option
        ...vehicle.results.map((item) => ({
          value: item?.model,
          label: item?.model,
          id: item?._id,
        })),
      ];
      SetvehicleOption(vehicleOptions);
    }
  }, [contractTemplates, customers, vehicle]);
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
              <input type="checkbox" />
            </td>
            <td className="w-1/6 pl-5 capitalize whitespace-nowrap text-primary px-3 py-4 text-lightBlackText">
              {item?.contractId?.templateId || "-"}{" "}
            </td>{" "}
            <td className="w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText">
              {item?.customerName?.customerName || "-"}{" "}
            </td>{" "}
            <td className="w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText">
              {item?.carModel?.brand + " " + item?.carModel?.model || "-"}{" "}
            </td>{" "}
            <td className="w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText">
              {formatDate(item?.createdAt)}{" "}
            </td>
            <td
              className={`w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText ${
                item?.status === "Signed"
                  ? "text-secondary"
                  : item?.status === "Expired"
                  ? "text-error"
                  : item?.status === "Pending"
                  ? "text-primary"
                  : "text-grayText"
              }`}
            >
              {item?.status}
            </td>
            <td className=" whitespace-nowrap px-3 py-4 text-lightBlackText ">
              <LuDownload
                size={20}
                className="text-[#137822] flex justify-center w-full"
                onClick={() => handleDownloadContract(item)}
              />
            </td>
            <td className="whitespace-nowrap px-3 py-4  flex items-center gap-3">
              <PopUpModel
                heading="Edit Contract Templates"
                trigger={
                  <button onClick={() => handleEditClick(item)}>
                    <FaRegEdit size={17} className="text-primary" />
                  </button>
                }
                modalOpen={
                  modalOpen && selectedContractTemplate?._id === item?._id
                }
                setModalOpen={setModalOpen}
              >
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-7 p-6 bg-white rounded-md shadow-md"
                >
                  {fields.map((field) => (
                    <CustomInput
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={(e) => {
                        formik.handleChange(e); // Update Formik value
                        const { name, value } = e.target;

                        // Handle setting state for contractId, customerName, and carModel
                        if (name === "contractId") {
                          const selectedOption = countractIDOption.find(
                            (option) => option.value === value
                          );
                          setcontractId(
                            selectedOption ? selectedOption.id : null
                          );
                        } else if (name === "customerName") {
                          const selectedOption = customerNameOption.find(
                            (option) => option.value === value
                          );
                          setcustomerNameId(
                            selectedOption ? selectedOption.id : null
                          );
                        } else if (name === "carModel") {
                          const selectedOption = vehicleOption.find(
                            (option) => option.value === value
                          );
                          setCarModelId(
                            selectedOption ? selectedOption.id : null
                          );
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.errors[field.name]}
                      touched={formik.touched[field.name]}
                      options={field?.options || []}
                    />
                  ))}

                  <h2 className=" text-xl font-medium pt-4 ">Financing</h2>
                  {financingFields.map((field) => (
                    <CustomInput
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors[field.name]}
                      touched={formik.touched[field.name]}
                      options={field?.options || []}
                    />
                  ))}
                  <div className="pt-10">
                    <Button
                      type="submit"
                      text="Update A Lease Agreement"
                      className="w-full"
                      borderRadius="rounded-md"
                      textColor="white"
                    />
                  </div>
                </form>
              </PopUpModel>
              <WarningModel
                buttonTwoText="Delete"
                bgColor="danger"
                trigger={
                  <button>
                    <MdDeleteOutline size={17} className="text-error" />
                  </button>
                }
                onSave={() => handelDelete(item)}
              >
                <h3 className="mt-5.5 pb-2 text-xl font-medium text-black sm:text-2xl">
                  Delete Contract
                </h3>
                <p className="my-2 text-gray-400">
                  Are you sure you want to delete this Contract?
                </p>
              </WarningModel>

              <Link to={`/dashboard/contract-management/${item?._id}`}>
                <FaRegEye className="text-secondary" />
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

const OpenContracts = () => {
  const dispatch = useDispatch();
  const [selectedContract, setSelectedContract] = useState("leasing-contract");
  const [addContract, setAddContract] = useState(false);
  const [contractId, setcontractId] = useState(null);
  const [customerNameId, setcustomerNameId] = useState(null);
  const [carModelId, setCarModelId] = useState(null);
  const [countractIDOption, SetCountractIdOption] = useState([
    { value: "", label: "Select Contract" },
  ]);

  const [customerNameOption, SetcustomerNameOption] = useState([
    { value: "", label: "Select name" },
  ]);

  const [vehicleOption, SetvehicleOption] = useState([
    { value: "", label: "Select Vehicle" },
  ]);

  const { contract, isLoading } = useSelector((state) => state.contract);
  const { contractTemplates } = useSelector((state) => state.contractTamplets);

  const { customers } = useSelector((state) => state.customer);
  const { vehicle } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getAllContract());
    dispatch(getAllContractTemplates());
    dispatch(getAllCustomers());
    dispatch(getAllVehicle({}));
  }, []);

  useEffect(() => {
    if (contractTemplates?.results) {
      const contractId = [
        { value: "", label: "Select Contract Id" },
        ...contractTemplates.results.map((item) => ({
          value: item?.templateId,
          label: item?.templateId,
          id: item?._id,
        })),
      ];
      SetCountractIdOption(contractId);
    }
    if (customers?.results) {
      const contractName = [
        { value: "", label: "Select Customer Name" },
        ...customers.results.map((item) => ({
          value: item?.customerName,
          label: item?.customerName,
          id: item?._id,
        })),
      ];
      SetcustomerNameOption(contractName);
    }
    if (vehicle?.results) {
      const vehicleOptions = [
        { value: "", label: "Select Vehicle" }, // Add the first option
        ...vehicle.results.map((item) => ({
          value: item?.model,
          label: item?.model,
          id: item?._id,
        })),
      ];
      SetvehicleOption(vehicleOptions);
    }
  }, [contractTemplates, customers, vehicle]);

  const formik = useFormik({
    initialValues: {
      contractType: "",
      customerName: "",
      vehicle: "",
      seller: "",
      creationDate: "",
      pickupDate: "",
      leasingProvider: "",
      deposit: "",
      annualMileage: "",
      duration: "",
      monthlyCosts: "",
      remainingValue: "",
      additionalMileageCosts: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        contractId: contractId,
        customerName: customerNameId,
        carModel: carModelId,
        status: values.status,
      };
      const response = await dispatch(addNewContract(data));
      if (response) {
        dispatch(getAllContract());
      }
      setAddContract(false); // Close modal after submission
    },
  });

  const fields = [
    {
      name: "contractType",
      label: "Identify Contract",
      type: "select",
      options: [
        { value: "", label: "Select Contract" },
        { value: "Leasing Contract", label: "Leasing Contract" },
      ],
    },
    {
      name: "customerName",
      label: "Customer Name",
      type: "select",
      options: [
        { value: "", label: "Select Customer" },
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Alice Johnson", label: "Alice Johnson" },
      ],
    },
    {
      name: "vehicle",
      label: "Vehicle",
      type: "select",
      options: [
        { value: "", label: "Select Vehicle" },
        { value: "ABC123", label: "Toyota Camry - ABC123" },
        { value: "XYZ456", label: "Honda Accord - XYZ456" },
        { value: "LMN789", label: "Ford Focus - LMN789" },
      ],
    },
    {
      name: "seller",
      label: "Seller",
      type: "select",
      options: [
        { value: "", label: "Select Seller" },
        { value: "Seller A", label: "Seller A" },
        { value: "Seller B", label: "Seller B" },
        { value: "Seller C", label: "Seller C" },
      ],
    },
    { name: "creationDate", label: "Creation Date", type: "date" },
    { name: "pickupDate", label: "Pickup Date", type: "date" },
    {
      name: "leasingProvider",
      label: "Leasing Provider",
      type: "select",
      options: [
        { value: "", label: "Select Leasing Provider" },
        { value: "Provider 1", label: "Provider 1" },
        { value: "Provider 2", label: "Provider 2" },
        { value: "Provider 3", label: "Provider 3" },
      ],
    },
  ];

  const financingFields = [
    { name: "deposit", label: "Deposit", type: "text" },
    {
      name: "annualMileage",
      label: "Annual Mileage",
      type: "select",
      options: [
        { value: "", label: "Select Annual Mileage" },
        { value: "5000", label: "5,000 miles" },
        { value: "10000", label: "10,000 miles" },
        { value: "15000", label: "15,000 miles" },
        { value: "20000", label: "20,000 miles" },
        { value: "25000", label: "25,000 miles" },
      ],
    },
    { name: "duration", label: "Duration", type: "date" },
    { name: "monthlyCosts", label: "Monthly Costs", type: "text" },
    { name: "remainingValue", label: "Remaining Value", type: "text" },
    {
      name: "additionalMileageCosts",
      label: "Additional Mileage Costs",
      type: "text",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-12 mt-5">{/* Stats */}</div>
      <div className="bg-white border rounded-lg shadow-2xl">
        <div className="flex items-center justify-between p-4">
          {/* Search */}
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
          <div className="flex gap-5">
            <Button
              text="Filters"
              borderRadius="rounded-md"
              textColor="white"
              icon={<MdTune className="h-5 w-5 rotate-90" />}
            />
            <PopUpModel
              heading="Create Contract"
              trigger={
                <Button
                  text="New Contract"
                  borderRadius="rounded-md"
                  textColor="white"
                  icon={<FaPlus className="h-3 w-3" />}
                />
              }
              modalOpen={addContract}
              setModalOpen={setAddContract}
            >
              {/* space-y-7 p-6 bg-white rounded-md shadow-md */}
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-7 p-6 bg-white rounded-md shadow-md"
              >
                <CustomInput
                  name="identifyContract"
                  label="Identify Contract"
                  type="select"
                  options={[
                    // { value: "", label: "Select Contract" },
                    { value: "leasing-contract", label: "Leasing Contract" },
                    { value: "lone-agreement", label: "Lone Agreement" },
                    {
                      value: "purchasing-contract",
                      label: "Purchasing Contract",
                    },
                    {
                      value: "purchasing-agreement",
                      label: "Purchasing Agreement",
                    },
                  ]}
                  onChange={(e) => setSelectedContract(e.target.value)} // Updating state on change
                />

                {/* Conditional Rendering */}
                {selectedContract === "leasing-contract" && (
                  <LeasingContractForm
                    financingFields={financingFields}
                    fields={fields}
                    formik={formik}
                    setcontractId={setcontractId}
                    setcustomerNameId={setcustomerNameId}
                    setCarModelId={setCarModelId}
                    countractIDOption={countractIDOption}
                    customerNameOption={customerNameOption}
                    vehicleOption={vehicleOption}
                  />
                )}
                {selectedContract === "purchasing-agreement" && (
                  <PurchaseAgreementForm />
                )}
                {selectedContract === "purchasing-contract" && (
                  <PurchaseContractForm />
                )}
                {selectedContract === "lone-agreement" && <LoanAgreementForm />}
              </form>
            </PopUpModel>
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={5} />
        ) : contract?.results?.length === 0 ? (
          <NoDataFound content="Contract" />
        ) : (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => <TableBody {...props} />}
            data={contract?.results}
          />
        )}
      </div>
    </div>
  );
};

export default OpenContracts;
