/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import CustomTable from "../../components/Custom-Tabel";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../../components/Button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import CustomInput from "../../components/Input/custoInput";
import {
  customerInputs,
  CustomerInitialValues,
  customervalidationSchema,
} from "../../Inputs/customer.input";
import {
  addNewCustomer,
  deleteCustomer,
  getAllCustomers,
  getSingleCustomer,
  setLimit,
  setPage,
  updateCustomerById,
} from "../../store/features/customer/customer.slice";
import { useDispatch, useSelector } from "react-redux";
import { formatDateByMonth } from "../../utils/dateFormate";

import { ShimmerTable } from "react-shimmer-effects";
import NoDataFound from "../../components/NoDataFound";
import Images from "../../assets/images";
import Modal from "../../components/modal/modal";
import Icons from "../../assets/icons";
import Text from "../../components/Heading/text";
import { customerDocumentInputs } from "../../Inputs/customerInputs";
import { showErrorAlert } from "../sweetAlert/sweetAlert";
import Pagination from "../Pagination";
import showToast from "../../utils/toaster";
import Swal from "sweetalert2";

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
          className="py-3.5 pl-5    text-left font-medium text-white "
        >
          Kundenprofil
        </th>
        <th scope="col" className="  text-left  font-medium text-white ">
          Kundenname
        </th>
        <th scope="col" className=" text-left  font-medium text-white">
          Kundentyp
        </th>
        <th scope="col" className=" py-3.5  text-left  font-medium text-white ">
          Telefon nummer
        </th>
        <th scope="col" className="  py-3.5  text-left  font-medium text-white">
          Kunden nummer
        </th>
        <th
          scope="col"
          className="  py-3.5 px-2  text-left font-medium text-white "
        >
          Last Interaction
        </th>
        <th scope="col" className=" py-3.5  text-left font-medium text-white ">
          Status
        </th>

        <th scope="col" className="py-3.5  text-left font-medium text-white ">
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({
  data,
  selectedData,
  setCustomerPopUp,
  formik,
  setIsUpdating,
  setIsUpdatingId,
  setAllUrls,
  setBackendDocuments,
  setSwissDocsBackend,
  setResidentDocsBackend,
}) {
  const { page, limit } = useSelector((state) => state?.customer);
  const dispatch = useDispatch();
  const handleEditClick = async (item) => {
    setIsUpdating(true);
    setIsUpdatingId(item.id);
    // Dispatch API call to get single customer details
    const response = await dispatch(getSingleCustomer(item.id));

    if (response?.payload) {
      const customerData = response?.payload?.customer;
      setAllUrls(customerData?.allURLs); // Assuming response data is in payload

      const swissImageObj = customerData?.allURLs?.find(
        (urlObj) => urlObj.category === "passport-id"
      );
      const residentImageObj = customerData?.allURLs?.find(
        (urlObj) => urlObj.category === "residence-permit"
      );
      setResidentDocsBackend(residentImageObj);
      setSwissDocsBackend(swissImageObj);
      const documentArray =
        customerData?.allURLs?.filter(
          (urlObj) => urlObj.category === "document"
        ) || [];
      setBackendDocuments(documentArray);
      // Update formik values with the fetched customer data
      formik.setValues({
        profileImage: null, // Assuming profileImage is not coming from API
        customerType: customerData?.customerType || "-",
        status: customerData?.status || "active",
        zipCode: customerData?.zipCode || "",
        address: customerData.address || "",
        houseNumber: customerData.houseNumber || "",
        phoneNumber: Number(customerData?.phoneNumber) || "",
        email: customerData.email || "",
        insuranceProvider: customerData.insuranceProvider || "",
        maritalStatus: customerData.maritalStatus || "",
        birthDate: customerData.birthDate
          ? new Date(customerData.birthDate).toISOString().split("T")[0]
          : "",
        canton: customerData.canton || "",
        nationality: customerData.nationality || "",
        residencePlace: customerData.residencePlace || "",

        // Private customer-specific fields
        firstName: customerData.firstName || "",
        lastName: customerData.name || "",
        passIdType: customerData.passIdType || "",
        // passportId and residencePermit are commented out in initial values
        // passportId: customerData.passportId || "",
        // residencePermit: customerData.residencePermit || "",

        // Company-specific field
        companyName: customerData.companyName || "",
        name: customerData.name || "",
      });

      // Open the edit modal
      setCustomerPopUp(true);
      // setModalOpen(true);
    }
  };

  // const handleDeleteClick = async (item) => {
  //   const response = await dispatch(deleteCustomer(item.id));
  //   if (response) {
  //     dispatch(getAllCustomers({ page, limit }));
  //   }
  // };

  const handleDeleteClick = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the customer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E599B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      const response = await dispatch(deleteCustomer(item.id));
      if (response) {
      
        dispatch(getAllCustomers({ page, limit }));
      }
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
            <td className="whitespace-nowrap pl-8   text-primary py-4 text-lightBlackText">
              <img
                src={item?.profileImage}
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
            <td className="whitespace-nowrap py-4 text- text-grayText ">
              {item?.id.slice(0, 11) || "-"}...
            </td>
            <td className="whitespace-nowrap py-4 text-grayText">
              {formatDateByMonth(item?.lastInteraction) || "-"}
            </td>
            <td
              className={`${
                item.status === "active"
                  ? "text-secondary"
                  : item.status === "inactive"
                  ? "text-error"
                  : "text-darkblue"
              } whitespace-nowrap py-4 text-left font-medium  capitalize`}
            >
              {item?.status}
            </td>

            <td className="text-lightBlackText ">
              <div className="flex items-center gap-2 ">
                <Icons.FiEdit
                  size={16}
                  className="text-darkBlue"
                  onClick={() => handleEditClick(item)}
                />

                <img
                  src={Images.bin}
                  className="text-error cursor-pointer w-4"
                  onClick={() => handleDeleteClick(item)}
                />
                <Link to={`/dashboard/customer-management/${item?.id}`}>
                  {" "}
                  <MdOutlineRemoveRedEye
                    size={20}
                    className="text-secondary cursor-pointer"
                    // onClick={() => handleNavigate(item)}
                  />
                </Link>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
const PrivateCustomer = ({ customerStatus }) => {
  const [showDocumentfirstModal, setShowDocumentFirstModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingId, setIsUpdatingId] = useState(false);
  const [backendDocuments, setBackendDocuments] = useState([]);
  const [swissDocsBackend, setSwissDocsBackend] = useState(null);
  const [residentDocsBackend, setResidentDocsBackend] = useState(null);

  const [allUrls, setAllUrls] = useState(null);
  const dispatch = useDispatch();
  const [customerPopUp, setCustomerPopUp] = useState(false);
  const { isLoading, customers, page, limit } = useSelector(
    (state) => state?.customer
  );

  const formik = useFormik({
    initialValues: CustomerInitialValues,
    validationSchema: customervalidationSchema,
    onSubmit: async (values) => {
      const {
        houseNumber,
        phoneNumber,
        profileImage,
        lastName,
        name,
        ...remainingValues
      } = values;
      if (uploadDocument.length === 0) {
        setCustomerPopUp(false);
        setShowDocumentFirstModal(true);
        return;
      }

      const payload = {
        ...remainingValues,
        // uploadDocument,
        name: name ? name : lastName,
        houseNumber: String(houseNumber),
        phoneNumber: String(phoneNumber),
      };
      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== null && value !== undefined && value !== ""
        )
      );

      if (isUpdating) {
        dispatch(updateCustomerById({ id: updatingId, cleanedPayload }));
        return;
      }

      const formData = new FormData();
      Object.entries(cleanedPayload).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null && value !== "N/A") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      formData.append("profile", profileImage);
      uploadDocument?.forEach((imageObj) => {
        formData.append(`documents`, imageObj);
      });

      if (values?.customerType === "private") {
        if (uploadCars.length > 0) {
          formData.append("passport-id", uploadCars[0]); // First document as passportId
        }
        if (uploadCars.length > 1 && values.passIdType === "foreign") {
          formData.append("residence-permit", uploadCars[1]); // Second document as residencePermit
        }
      }

      const response = await dispatch(addNewCustomer(formData));

      if (response) {
        dispatch(
          getAllCustomers({ page, limit, customerType: customerStatus })
        );
        setCustomerPopUp(false);
        setShowDocumentFirstModal(false);
        formik.resetForm();
        setUploadCars([]);
        setUploadDocument([]);
        setUploadCarImages([]);
        setUploadCarDocument([]);
      }
    },
  });

  useEffect(() => {
    if (
      customerStatus !== undefined &&
      customerStatus !== null &&
      customerStatus !== ""
    ) {
      dispatch(getAllCustomers({ page, limit, customerType: customerStatus }));
    }
  }, [dispatch, limit, page, customerStatus]);
  ///////////////// for table header Section ///////////

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    dispatch(getAllCustomers({ page, limit, search: query }));
    setSearchQuery(query);
  };

  const getAdditionalFields = (customerType) => {
    if (customerType === "private") {
      return [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
        },
      ];
    } else if (customerType === "company") {
      return [
        {
          name: "companyName",
          label: "Company Name",
          type: "text",
          placeholder: "Enter company name",
        },
        {
          name: "name",
          label: "Owner Name",
          type: "text",
          placeholder: "Enter your name",
        },
      ];
    }
    return [];
  };
  ///////////////// reset additional fields//////////////////
  useEffect(() => {
    const customerType = formik.values.customerType;

    // Get additional fields to reset
    const additionalFields = getAdditionalFields(customerType).map(
      (field) => field.name
    );

    // Create a new object to reset only additional fields + companyName
    const resetFields = additionalFields.reduce((acc, fieldName) => {
      acc[fieldName] = ""; // Set empty value
      return acc;
    }, {});

    // Always reset companyName regardless of customer type
    resetFields["companyName"] = "";

    // Update form values with reset fields
    formik.setValues({
      ...formik.values,
      ...resetFields,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.customerType]);
  /////////////////////// for upload Documents ///////////////////
  const documentInputRef = useRef(null);
  const [uploadCarDocument, setUploadCarDocument] = useState([]);
  const [uploadDocument, setUploadDocument] = useState([]);

  const handleDocumentClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  const handleDocumentChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg", // Image types
      "application/pdf", // PDF
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, PNG, PDF, DOC, and DOCX files are allowed."
      );
    }

    if (validFiles.length > 0) {
      setUploadDocument((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadCarDocument((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };


  const handleDeleteDocument = (index) => {
    const docToRemove = backendDocuments[index];

    const isBackendDoc = backendDocuments.some(
      (doc) => doc._id === docToRemove._id
    );

    if (isBackendDoc) {
      // Remove from allUrls and backendDocuments
      const updatedUrls = allUrls.filter(
        (url) => url.s3Url !== docToRemove.s3Url
      );

      setAllUrls(updatedUrls);
      setBackendDocuments(
        backendDocuments.filter((doc) => doc._id !== docToRemove._id)
      );
    } else {
      // Remove from uploaded documents
      setUploadCarDocument(uploadCarDocument.filter((_, i) => i !== index));
      setUploadDocument(uploadDocument.filter((_, i) => i !== index));
    }

    // Update merged documents list
    setMergedDocuments([...backendDocuments, ...uploadCarDocument]);
  };

  /////////////////for upload personal documents /////////////////////////
  ///////////////////////for upload Images ////////////
  const fileInputRef = useRef(null);
  const [uploadCarImages, setUploadCarImages] = useState([]);
  const [uploadCars, setUploadCars] = useState([]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, and PNG files are allowed."
      );
    }
    if (isUpdating && formik?.values?.passIdType === "swiss") {
      if (swissDocsBackend) {
        showToast(
          "error",
          "A passport document already exists. Please remove it before uploading a new one."
        );
        return;
      }
    }
    if (isUpdating && formik?.values?.passIdType === "foreign") {
      if (swissDocsBackend && residentDocsBackend) {
        showToast(
          "error",
          "Documents already exists. Please remove it before uploading a new one."
        );
        return;
      }
    }

    const maxFiles = formik.values.passIdType === "swiss" ? 1 : 2;

    if (uploadCars.length + validFiles.length > maxFiles) {
      showErrorAlert(
        "Upload Limit Reached",
        `You can only upload ${maxFiles} document(s).`
      );
      return;
    }

    if (validFiles.length > 0) {
      setUploadCars((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadCarImages((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };

  const handleDeleteImage = (index) => {
    setUploadCarImages(uploadCarImages.filter((_, i) => i !== index));
    setUploadCars(uploadCars.filter((_, i) => i !== index));
  };
  const handleDeleteSwissDoc = (docToRemove) => {
    if (!docToRemove || !docToRemove.s3Url) return;

    // Remove from `allUrls` based on `s3Url`
    const updatedUrls = allUrls.filter(
      (doc) => doc.s3Url !== docToRemove.s3Url
    );
    setAllUrls(updatedUrls);
    if (swissDocsBackend._id === docToRemove._id) {
      setSwissDocsBackend(null);
    }
    // Remove from `backendDocuments` based on `_id`
    // setBackendDocuments((prevDocs) =>
    //   prevDocs.filter((doc) => doc._id !== docToRemove._id)
    // );

    // // Update `mergedDocuments`
    // setMergedDocuments((prevDocs) =>
    //   prevDocs.filter((doc) => doc._id !== docToRemove._id)
    // );
  };

  const handleDeleteResidentDoc = (docToRemove) => {
    if (!docToRemove || !docToRemove.s3Url) return;

    // Remove from `allUrls` based on `s3Url`
    const updatedUrls = allUrls.filter(
      (doc) => doc.s3Url !== docToRemove.s3Url
    );
    setAllUrls(updatedUrls);
    if (residentDocsBackend._id === docToRemove._id) {
      setResidentDocsBackend(null);
    }
    // Remove from `backendDocuments` based on `_id`
    // setBackendDocuments((prevDocs) =>
    //   prevDocs.filter((doc) => doc._id !== docToRemove._id)
    // );

    // // Update `mergedDocuments`
    // setMergedDocuments((prevDocs) =>
    //   prevDocs.filter((doc) => doc._id !== docToRemove._id)
    // );
  };

  //////////////////handle Update customer ////////////////////////
  const handleUpdateCustomer = async () => {
    const {
      houseNumber,
      phoneNumber,
      profileImage,
      lastName,
      name,
      ...remainingValues
    } = formik.values;

    let filteredUrls = allUrls;

    // If profileImage is present, remove objects with category "profile" from allUrls
    if (profileImage) {
      filteredUrls = allUrls.filter((url) => url.category !== "profile");
    }
    const payload = {
      ...remainingValues,
      name: name ? name : lastName,
      houseNumber: String(houseNumber),
      phoneNumber: String(phoneNumber),
      allURLs: filteredUrls,
    };

    const cleanedPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );

    const formData = new FormData();
    Object.entries(cleanedPayload).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && value !== "N/A") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (profileImage && typeof profileImage !== "string") {
      formData.append("profile", profileImage);
    }

    uploadDocument?.forEach((imageObj) => {
      formData.append(`documents`, imageObj);
    });

    if (formik?.values?.customerType === "private") {
      if (uploadCars.length > 0 && !swissDocsBackend) {
        formData.append("passport-id", uploadCars[0]);
      }
      if (
        uploadCars.length > 0 &&
        formik?.values?.passIdType === "foreign" &&
        !residentDocsBackend
      ) {
        formData.append(
          "residence-permit",
          !swissDocsBackend ? uploadCars[1] : uploadCars[0]
        );
      }
    }
    const response = await dispatch(
      updateCustomerById({ id: updatingId, formData })
    );

    // Call the update API
    if (response) {
      dispatch(getAllCustomers({ page, limit, customerType: customerStatus }));
      setCustomerPopUp(false);
      setShowDocumentFirstModal(false);
      formik.resetForm();
      setUploadCars([]);
      setUploadDocument([]);
      setUploadCarDocument([]);
      setUploadCarImages([]);
      setBackendDocuments([]);
      setSwissDocsBackend(null);
      setIsUpdatingId(false);
      setIsUpdating(false);
    }
  };
  const [mergedDocuments, setMergedDocuments] = useState([]);
  console.log("mergedDocuments: ", mergedDocuments);
  useEffect(() => {
    const combinedDocs = [
      ...(backendDocuments || []),
      ...(uploadCarDocument || []),
    ];
    setMergedDocuments(combinedDocs);
  }, [backendDocuments, uploadCarDocument]);
  ////////////handle flow of show customers ////////////////
  const customerTypeIndex = customerInputs.findIndex(
    (field) => field.name === "customerType"
  );
  
  // Split the array into two parts: before and after the customerType field
  const beforeCustomerType = customerInputs.slice(0, customerTypeIndex + 1);
  const afterCustomerType = customerInputs.slice(customerTypeIndex + 1);
  
  // Insert additional fields right after the customerType field
  const fieldsToRender = [
    ...beforeCustomerType,
    ...getAdditionalFields(formik.values.customerType), // Inserted here
    ...afterCustomerType,
  ];
  return (
    <>
      <div className="bg-white rounded-[10px] shadow-md mt-10">
        <div className="flex items-center justify-between p-4">
          <div className="grid grid-cols-3 items-end justify-between gap-8 ">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[300px] col-span-2">
              <IoSearchOutline className="h-4 w-4 text-darkBlue" />
              <input
                type="text"
                placeholder="Search by name and number"
                className="pr-4 py-2 rounded-lg outline-none placeholder:text-grayText text-sm w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <p className="text-darkBlue text-sm font-medium capitalize">
              {customers?.totalCount} results found
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              textColor="white"
              text="New customer"
              borderRadius="rounded"
              icon={<FaPlus className="h-3 w-3" />}
              onClick={() => setCustomerPopUp(true)}
            />
            {/* ///////////////modal for add info //////////////// */}
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
                <div className="space-y-1.5 gap-3 grid grid-cols-2 py-4">
                  {fieldsToRender.map((field, index) => (
                    <div
                      key={index}
                      className={`${
                        [
                          "residencePlace",
                          "zipCode",
                          "address",
                          "houseNumber",
                        ].includes(field.name)
                          ? "col-span-1"
                          : "col-span-2"
                      }`}
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
                <div className="py-8">
                  <Button
                    type="submit"
                    text="Add Customer"
                    textColor="white"
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
                  {formik.values.customerType === "company" ? null : (
                    <div className="space-y-4">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 gap-3 ">
                          {customerDocumentInputs?.map((input) =>
                            input.type === "file" ? (
                              <div
                                key={input.name}
                                className="flex flex-col items-start gap-2 my-4"
                              >
                                <label className="font-medium text-left text-darkBlue">
                                  Upload Photos
                                </label>

                                <div
                                  onClick={handleButtonClick}
                                  className="px-8 py-2  border border-darkBlue   bg-inherit text-darkBlue rounded cursor-pointer "
                                >
                                  upload Id pictures
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                  />
                                </div>
                              </div>
                            ) : (
                              <CustomInput
                                key={input.name}
                                type={input.type}
                                name={input.name}
                                label={input.label}
                                required={input.required}
                                value={formik.values[input.name]}
                                // onChange={formik.handleChange}
                                onChange={(e) => {
                                  formik.handleChange(e);

                                  // If input is passIdType and isUpdating is true, reset the fields
                                  if (
                                    input.name === "passIdType" &&
                                    isUpdating
                                  ) {
                                    setResidentDocsBackend(null);
                                    setSwissDocsBackend(null);
                                    setUploadCarImages([]);
                                    setUploadCars([]);
                                    setAllUrls((prevUrls) =>
                                      prevUrls
                                        ? prevUrls.filter(
                                            (doc) =>
                                              doc.category !== "passport-id" &&
                                              doc.category !==
                                                "residence-permit"
                                          )
                                        : []
                                    );
                                  }
                                }}
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

                      {swissDocsBackend ? (
                        <div className="space-y-3">
                          <div
                            // Always include a unique key when mapping
                            className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                          >
                            <img
                              src={swissDocsBackend?.s3Url}
                              className="border h-[100px] w-2/12 rounded-md object-cover"
                              alt="Signup"
                            />
                            <div className="flex-grow flex flex-col gap-10">
                              <div className="flex flex-col gap-4">
                                <Text
                                  content={swissDocsBackend?.title}
                                  textColor="black"
                                  textSize="text-sm"
                                  className="capitalize"
                                />
                                <div className="flex items-center gap-4">
                                  <Icons.RiDeleteBin6Line
                                    size={20}
                                    onClick={() =>
                                      handleDeleteSwissDoc(swissDocsBackend)
                                    }
                                  />

                                  <Icons.IoEyeOutline
                                    size={20}
                                    onClick={() =>
                                      window.open(
                                        swissDocsBackend?.s3Url,
                                        "_blank"
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {residentDocsBackend ? (
                        <div className="space-y-3">
                          <div
                            // Always include a unique key when mapping
                            className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                          >
                            <img
                              src={residentDocsBackend?.s3Url}
                              className="border h-[100px] w-2/12 rounded-md object-cover"
                              alt="Signup"
                            />
                            <div className="flex-grow flex flex-col gap-10">
                              <div className="flex flex-col gap-4">
                                <Text
                                  content={residentDocsBackend?.title}
                                  textColor="black"
                                  textSize="text-sm"
                                  className="capitalize"
                                />
                                <div className="flex items-center gap-4">
                                  <Icons.RiDeleteBin6Line
                                    size={20}
                                    onClick={() =>
                                      handleDeleteResidentDoc(
                                        residentDocsBackend
                                      )
                                    }
                                  />

                                  <Icons.IoEyeOutline
                                    size={20}
                                    onClick={() =>
                                      window.open(
                                        residentDocsBackend?.s3Url,
                                        "_blank"
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="space-y-3">
                        {uploadCarImages?.length > 0 || swissDocsBackend ? (
                          uploadCarImages?.map((image, index) => (
                            <div
                              key={index} // Always include a unique key when mapping
                              className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                            >
                              <img
                                src={image}
                                className="border h-[100px] w-2/12 rounded-md object-cover"
                                alt="Signup"
                              />
                              <div className="flex-grow flex flex-col gap-10">
                                <div className="flex flex-col gap-4">
                                  <Text
                                    content={uploadCars[index]?.name}
                                    textColor="black"
                                    textSize="text-sm"
                                    className="capitalize"
                                  />
                                  <div className="flex items-center gap-4">
                                    <Icons.RiDeleteBin6Line
                                      size={20}
                                      onClick={() => handleDeleteImage(index)}
                                    />
                                    {/* <Icons.IoReload size={20} /> */}
                                    <Icons.IoEyeOutline
                                      size={20}
                                      onClick={() =>
                                        window.open(image, "_blank")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500">
                            No images uploaded
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {/* /////////////////////////documents get and uploaded////////////////////////////////// */}
                  {customerDocumentInputs?.map((input) =>
                    input.type === "file" ? (
                      <div
                        key={input?.name}
                        className="flex flex-col items-start gap-2 "
                      >
                        <label className="font-medium text-left text-darkBlue">
                          {input.label}
                        </label>

                        <button
                          type="button"
                          onClick={handleDocumentClick}
                          className="px-8 py-2 border border-darkBlue bg-inherit text-darkBlue rounded cursor-pointer"
                        >
                          Upload Documents
                        </button>

                        <input
                          type="file"
                          ref={documentInputRef}
                          className="hidden"
                          multiple
                          onChange={handleDocumentChange}
                        />
                      </div>
                    ) : null
                  )}
                  {/*///////////////////////////// frontend Documents ///////////////// */}
                  <div className="space-y-3">
                    {uploadCarDocument?.length > 0 ||
                    backendDocuments?.length > 0 ? (
                      uploadCarDocument?.map((image, index) => (
                        <div
                          key={index} // Always include a unique key when mapping
                          className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                        >
                          {["image/jpeg", "image/png", "image/jpg"].includes(
                            uploadDocument[index]?.type
                          ) ? (
                            <img
                              src={image}
                              className="border h-[100px] w-2/12 rounded-md object-cover"
                              alt={uploadDocument[index]?.name}
                            />
                          ) : (
                            <div className="border h-[100px] w-2/12 rounded-md flex items-center justify-center bg-gray-100">
                              <Icons.FaFileAlt className="text-gray-500 text-3xl" />
                            </div>
                          )}
                          <div className="flex-grow flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                              <Text
                                content={uploadDocument[index]?.name}
                                textColor="black"
                                textSize="text-sm"
                                className="capitalize "
                              />
                              <div className="flex items-center gap-4">
                                <Icons.RiDeleteBin6Line
                                  size={20}
                                  onClick={() => handleDeleteDocument(index)}
                                />

                                <Icons.IoEyeOutline
                                  size={20}
                                  onClick={() => {
                                    const fileType =
                                      uploadDocument[index]?.type;

                                    if (
                                      [
                                        "image/jpeg",
                                        "image/png",
                                        "image/jpg",
                                      ].includes(fileType)
                                    ) {
                                      window.open(image, "_blank");
                                    } else {
                                      const fileURL = URL.createObjectURL(
                                        uploadDocument[index]
                                      );
                                      window.open(fileURL, "_blank");
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        No document uploaded
                      </p>
                    )}
                  </div>
                  {/*///////////////////////////// backend Documents ///////////////// */}

                  <div className="space-y-3">
                    {backendDocuments?.map((doc, index) => {
                      const isUploadedDoc = uploadCarDocument.includes(doc);
                      const uploadedFileType = uploadDocument[index]?.type;
                      const backendFileType = doc?.s3Url
                        ?.split(".")
                        .pop()
                        ?.toLowerCase();

                      // Allowed image formats
                      const imageExtensions = ["jpeg", "png", "jpg"];

                      // Check if it's an image
                      const isImage = isUploadedDoc
                        ? imageExtensions.includes(
                            uploadedFileType?.split("/")[1]
                          ) // Check MIME type for uploaded docs
                        : imageExtensions.includes(backendFileType);
                      const fileUrl = doc?.s3Url || doc; // Use `url` if backend provides, otherwise use local path
                      const fileName =
                        doc?.title || uploadDocument[index]?.name;
                      return (
                        <div
                          key={index}
                          className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                        >
                          {isImage ? (
                            <img
                              src={fileUrl}
                              className="border h-[100px] w-2/12 rounded-md object-cover"
                              alt={fileName || `Document ${index}`}
                            />
                          ) : (
                            <div className="border h-[100px] w-2/12 rounded-md flex items-center justify-center bg-gray-100">
                              <Icons.FaFileAlt className="text-gray-500 text-3xl" />
                            </div>
                          )}

                          <div className="flex-grow flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                              <Text
                                content={fileName || `Document ${index}`}
                                textColor="black"
                                textSize="text-sm"
                                className="capitalize"
                              />
                              <div className="flex items-center gap-4">
                                <Icons.RiDeleteBin6Line
                                  size={20}
                                  onClick={() => handleDeleteDocument(index)}
                                />
                                <Icons.IoEyeOutline
                                  size={20}
                                  onClick={() => {
                                    if (isImage) {
                                      window.open(fileUrl, "_blank");
                                    } else {
                                      const fileBlobUrl = doc?.url
                                        ? doc.url
                                        : URL.createObjectURL(doc);
                                      window.open(fileBlobUrl, "_blank");
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* // ) : (
    //   <p className="text-center text-gray-500">No document uploaded</p>
    // )} */}
                  </div>
                  {/* /////////////////////////////////////////////// */}
                </div>
                <div className="p-5 flex items-center justify-between">
                  <Button
                    text="back"
                    borderRadius="rounded-md"
                    textColor="primary"
                    onClick={() => {
                      setCustomerPopUp(true);
                      setShowDocumentFirstModal(false);
                    }}
                    className="mt-4 "
                    bgColor="white"
                    borderColor="primary"
                  />
                  {isUpdating ? (
                    <Button
                      text="update Customer"
                      borderRadius="rounded-md"
                      textColor="white"
                      isLoading={isLoading}
                      onClick={handleUpdateCustomer}
                      className="mt-4 "
                      type="submit"
                      bgColor="primary"
                      borderColor="primary"
                    />
                  ) : (
                    <Button
                      text="Add Customer"
                      borderRadius="rounded-md"
                      textColor="white"
                      isLoading={isLoading}
                      onClick={formik.handleSubmit}
                      className="mt-4 "
                      type="submit"
                      bgColor="primary"
                      borderColor="primary"
                    />
                  )}
                </div>
              </>
            </Modal>
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={8} />
        ) : customers?.results?.length === 0 ? (
          <NoDataFound
            content="Customers not found"
            height={"h-[300px]"}
            fontSize={"text-2xl"}
          />
        ) : (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => (
              <TableBody
                {...props}
                setCustomerPopUp={setCustomerPopUp}
                formik={formik}
                setIsUpdating={setIsUpdating}
                setIsUpdatingId={setIsUpdatingId}
                setAllUrls={setAllUrls}
                setBackendDocuments={setBackendDocuments}
                setSwissDocsBackend={setSwissDocsBackend}
                setResidentDocsBackend={setResidentDocsBackend}
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

export default PrivateCustomer;
