/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainHeading from "../../../components/Heading/mainHeading";
import Text from "../../../components/Heading/text";
import { FaChevronDown, FaFilePdf } from "react-icons/fa";
import { formatDate } from "../../../utils/dateFormate";
import axios, { config } from "../../../services/api";
import { getSingleContract } from "../../../store/features/contract/contractSlice";
import Images from "../../../assets/images";
import Button from "../../../components/Button";
import CarGallery from "../../../components/ContractManagementComponent/CarGallery";

import { MdEmail } from "react-icons/md";
import { PiDownloadFill } from "react-icons/pi";
import useUserInfo from "../../../hooks/useUserInfo";
import showToast from "../../../utils/toaster";
import CustomSelect from "../../../components/customSelect/customSelect";
import Icons from "../../../assets/icons";
import Modal from "../../../components/modal/modal";
import SignatureCanvas from "react-signature-canvas";
function ContractDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleContract } = useSelector((state) => state.contract);
  console.log("🚀 ~ ContractDetailsPage ~ singleContract:", singleContract);
  const data = singleContract?.contract;
  console.log("🚀 ~ ContractDetailsPage ~ data:", data)
  const imageURLs =
  data?.vehicleId?.allURLs?.filter(
    (item) => item.category === "image"
  ) || [];
  console.log("🚀 ~ ContractDetailsPage ~ imageURLs:", imageURLs)
  const carData =
    data?.contractType === "purchase-agreement-buying"
      ? data?.vehicleFeatureBuy
      : data?.vehicleId;
  const userData = useUserInfo();

  useEffect(() => {
    dispatch(getSingleContract(id));
  }, [dispatch, id]);
  const customerInfo = [
    { label: "Customer Name", value: data?.customerName?.customerName || "-" },
    {
      label: "Date Of Birth",
      value: formatDate(data?.customerName?.createdAt) || "-",
    },
    {
      label: "Marital Status",
      value: data?.customerName?.maritalStatus || "Single",
    },
    { label: "Address", value: data?.customerName?.address || "-" },
    {
      label: "Residential Address",
      value: data?.customerName?.residentialAddress || "-",
    },
    { label: "ZIP Code", value: data?.customerName?.zipCode || "3000" },
    {
      label: "Nationality",
      value: data?.customerName?.nationality || "Switzerland",
    },
    {
      label: "Residence Permit",
      value: data?.customerName?.permit || "Schweiz",
    },
    { label: "Canton", value: data?.customerName?.canton || "-" },
  ];

  const sellerInfo = [
    { label: "Seller Name", value: userData?.username || "-" },
    {
      label: "Date Of Birth",
      value: formatDate(data?.seller?.createdAt) || "-",
    },
    {
      label: "Marital Status",
      value: data?.seller?.maritalStatus || "Single",
    },
    { label: "Address", value: data?.customerName?.asellerddress || "-" },
    {
      label: "Residential Address",
      value: data?.seller?.residentialAddress || "-",
    },
    { label: "ZIP Code", value: data?.seller?.zipCode || "3000" },
    {
      label: "Nationality",
      value: data?.seller?.nationality || "Switzerland",
    },
    {
      label: "Residence Permit",
      value: data?.seller?.permit || "Schweiz",
    },
    { label: "Canton", value: data?.seller?.canton || "-" },
  ];
  const vehicleData = [
    { label: "Brand", value: carData?.make || "-" },
    {
      label: "Model",
      value: carData?.model || "-",
    },
    {
      label: "Year Of Manufacture",
      value: carData?.manufactureYear || "-",
    },
    { label: "Address", value: carData?.location || "-" },
    {
      label: "PS/KW",
      value: carData?.psKw || "-",
    },
    { label: "Kilometer", value: carData?.condition?.kilometer || "-" },
    {
      label: "Type",
      value: carData?.bodyType || "-",
    },
    {
      label: "Fuel",
      value: carData?.fuel || "-",
    },
    { label: "Drive", value: carData?.drive || "all-wheel drive" },
    {
      label: "Transmission Type",
      value: data?.carModel?.transitionType || "Automatic",
    },
  ];

  const buttonIcons = [<FaFilePdf />, <MdEmail />, <PiDownloadFill />];
  //////////////////////for status changed////////////////////
  useEffect(() => {
    setSelectedStatus(singleContract.contract?.status);
  }, [singleContract.contract?.status]);
  const options = [
    { label: "Draft", value: "draft" },
    { label: "Open", value: "open" },
    { label: "Signed", value: "signed" },
    { label: "Expired", value: "expired" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    try {
      const response = await axios.put("/contracts/update-status", {
        id: id,
        status: newStatus,
      });

      showToast("success", response?.data?.message);
    } catch (error) {
      showToast("error", error?.response?.data?.error);
    }
  };
  ///////////////add sign functionality //////////////////////////
  const [showSignModel, setShowSignModel] = useState(false);
  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState(null);



  // Clear Signature Pad
  const handleClear = () => {
    sigCanvas.current.clear();
    setImageURL(null);
  };

  // Send Signature to Backend
  const handleUpload = async () => {
    if (!sigCanvas.current) return alert("Please sign before uploading!");

    const signatureImage = sigCanvas.current.toDataURL("image/png");
    console.log("🚀 ~ handleUpload ~ signatureImage:", signatureImage)
    const blob = await fetch(signatureImage).then(res => res.blob());

    // Create a File object (optional, useful for setting filename)
    const file = new File([blob], "signature.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("esignature", file);

   
    

    try {
      await axios.put(
        `/contracts/document/${id}/esignature`,
        formData,
       
      );
      showToast("success","Signature uploaded successfully!");
      setShowSignModel(false)
      sigCanvas.current.clear();
    } catch (error) {
      console.error("Upload error:", error);
      showToast("error", error?.message);
    }
  };
  return (
    <div>
      <Breadcrumb pageName="Contract  Details" />
      <div className="mt-20">
        <div className="flex items-center justify-between">
          <MainHeading
            heading={`Contract # ${data?._id}`}
            textColor="primary"
            textSize="text-[24px]"
            fontWeight="font-bold"
            className="font-poppins capitalize "
          />
          {/* <GoBack pageName="Contract Templates" /> */}
          <div className=" flex gap-3">
            {/* <CustomInput
              type="select"
              options={options}
              value={selectedStatus}
              onChange={handleStatusChange}
            /> */}
            <img
              src={Images.signPen}
              alt=""
              onClick={() => setShowSignModel(true)}
              className="px-3 py-2 bg-[#1E599B33] rounded"
            />
            <Modal
              isOpen={showSignModel}
              onClose={() => setShowSignModel(false)}
              title={"Add E-Signature"}
              width={"w-[45%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setShowSignModel}
            >
              <>
                <div className="flex gap-2 items-center">
                  <h2 className="text-lg font-medium  text-left">
                    Signature Here
                  </h2>
                  <Icons.MdOutlineRefresh
                    size={20}
                    className="text-grayText"
                    onClick={handleClear}
                  />
                </div>
                <div className="my-2 flex justify-center ">
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                      width: 600,
                      height: 400,
                      className: "border  bg-white rounded",
                    }}
                  />
                </div>
                <div className="flex justify-center">
                    {imageURL && (
                  <img
                    src={imageURL}
                    alt="Signature preview"
                    className="mt-3 w-40"
                  />
                )}
                </div>
                <div className=" flex items-center justify-between">
                  {/* <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  
                  <button
                    onClick={handleUpload}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Upload
                  </button> */}
                  <Button
                    text="Add Signature"
                    borderRadius="rounded-md"
                    textColor="white"
                    // isLoading={isLoading}
                    onClick={handleUpload}
                    className="mt-4 w-full "
                    type="submit"
                    bgColor="primary"
                    borderColor="primary"
                  />
                </div>
              
              </>
            </Modal>
            <CustomSelect
              name="event"
              options={options}
             
              value={selectedStatus}
              onChange={handleStatusChange}
            
              backgroundColor="bg-primary"
              textColor="text-white"
              
            />
            <Button
              text={"Download"}
              className={"rounded-md "}
              bgColor="primary"
              textColor="white"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-12 ">
          <div className="border mt-10 col-span-3  2xl:col-span-2 order-2 2xl:order-1  ">
            {/* Contract information */}
            <div className="bg-white">
              <Text
                content="Contract Information"
                fontWeight="font-semibold "
                className="px-6 py-4 border-b font-poppins"
                textColor="text-primary"
              />
              <div className="p-6 bg-white rounded-md ">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  pb-4">
                  {/* Contract ID */}
                  <div>
                    <Text
                      content="Contract ID"
                      textSize="text-16px"
                      fontWeight="font-semibold"
                      textColor="primary"
                    />

                    <Text
                      content={`${data?._id ? data._id.slice(0, 7) : "-"}...`}
                      textSize="text-[14px]"
                      className="capitalize"
                    />
                  </div>

                  {/* Customer Name */}
                  <div>
                    <Text
                      content="Customer Name"
                      textSize="text-16px"
                      fontWeight="font-semibold"
                      textColor="primary"
                    />
                    <Text
                      content={data?.customerId?.customerName || "John Doe"}
                      textSize="text-[14px]"
                      className="capitalize"
                    />
                  </div>

                  {/* Car Model */}
                  <div>
                    <Text
                      content="Car Model"
                      textSize="text-16px"
                      fontWeight="font-semibold"
                      textColor="primary"
                    />
                    <Text
                      content={data?.carModel?.model || "-"}
                      textSize="text-[14px]"
                      className="capitalize"
                    />
                  </div>

                  {/* Salesperson */}
                  <div>
                    <Text
                      content="Salesperson"
                      textSize="text-16px"
                      fontWeight="font-semibold"
                      textColor="primary"
                    />
                    <Text
                      content={data?.sellerId?.username || "-"}
                      textSize="text-[14px]"
                      className="capitalize"
                    />
                  </div>

                  <div>
                    <Text
                      content="Date Created"
                      textSize="text-16px"
                      fontWeight="font-semibold"
                      textColor="primary"
                    />
                    <Text
                      content={formatDate(data?.creationDate) || "-"}
                      textSize="text-[14px]"
                      className="capitalize"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <Text
                      content="Status"
                      textSize="text-16px"
                      fontWeight="font-semibold"
                      textColor="primary"
                    />
                    <Text
                      content={data?.status || "-"}
                      textSize="text-[14px]"
                      className="capitalize"
                      textColor="text-secondary"
                    />
                  </div>
                </div>

                {/* Bottom Section */}

                {/* <div className="col-span-2 mt-5">
                <Text
                  content="Document"
                  textSize="text-16px"
                  fontWeight="font-semibold"
                  textColor="primary"
                />
                <div className="mt-2 flex items-center p-3 bg-gray-100 rounded-md shadow-sm w-full max-w-md">
                  <div className="bg-red-500 p-2 rounded">
                    <FaFilePdf className="text-white w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <a
                      target="_blank"
                      href={`${config.imageBaseUrl}/contractTemplates/${data?.contractId?.contractFile}`} // Replace with your file URL
                      download={data?.contractId?.contractFile} // Triggers download with the file name
                      className="text-gray-800 font-medium text-sm cursor-pointer hover:underline"
                    >
                      {data?.contractId?.contractFile}
                    </a>

                    <p className="text-gray-500 text-xs">19.06 KB</p>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
            {/* Customer information */}
            <div className="bg-white">
              <Text
                content="Customer Information"
                fontWeight="font-semibold"
                className="px-6 py-4 border-b font-poppins"
                textColor="text-primary"
              />
              <div className="p-6 bg-white rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-4">
                  {customerInfo.map((info, index) => (
                    <div key={index}>
                      <Text
                        content={info.label}
                        textSize="text-16px"
                        fontWeight="font-semibold"
                        textColor="primary"
                      />
                      <Text
                        content={info.value}
                        textSize="text-[14px]"
                        className="capitalize"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Sellerr Info */}
            <div className="bg-white">
              <Text
                content="Seller Information"
                fontWeight="font-semibold"
                className="px-6 py-4 border-b font-poppins"
                textColor="text-primary"
              />
              <div className="p-6 bg-white rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-4">
                  {sellerInfo.map((info, index) => (
                    <div key={index}>
                      <Text
                        content={info.label}
                        textSize="text-16px"
                        fontWeight="font-semibold"
                        textColor="primary"
                      />
                      <Text
                        content={info.value}
                        textSize="text-[14px]"
                        className="capitalize"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Vehicle data  */}
            <div className="bg-white">
              <Text
                content="Vehicle Information"
                fontWeight="font-semibold"
                className="px-6 py-4 border-b font-poppins"
                textColor="text-primary"
              />
              <div className="p-6 bg-white rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-4">
                  {vehicleData.map((info, index) => (
                    <div key={index}>
                      <Text
                        content={info.label}
                        textSize="text-16px"
                        fontWeight="font-semibold"
                        textColor="primary"
                      />
                      <Text
                        content={info.value}
                        textSize="text-[14px]"
                        className="capitalize"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3  2xl:col-span-1 mt-10 order-1 2xl:order-2 flex flex-col lg:flex-row 2xl:flex-col  items-start gap-3">
            <div className="w-96 2xl:w-full ">
              <CarGallery imageURLs={imageURLs} />
            </div>
            <div className=" flex flex-col gap-4">
              <div className=" flex 2xl:flex-col gap-3  ">
                <Text
                  content="Standort"
                  fontWeight="font-semibold"
                  className="  font-poppins"
                  textColor="text-primary"
                />
                <div className=" bg-white border p-4 rounded-lg h-fit ">
                  <Text
                    content="Autocenter Niederbipp AG"
                    fontWeight="font-medium"
                    className="  font-poppins "
                    textColor="text-secondary"
                  />
                  <Text
                    content="Leenrütimattweg 3, 4704 Niederbipp"
                    // fontWeight="font-medium"
                    className="w-1/2 text-[#CCCCCC]"
                    // textColor="gr"
                  />
                </div>
              </div>

              <IconButtons buttonIcons={buttonIcons} heading="Contract" />

              <IconButtons buttonIcons={buttonIcons} heading="Invoice" />

              <div className=" flex 2xl:flex-col gap-2 ">
                <Text
                  content="Käufer"
                  fontWeight="font-semibold"
                  className="  font-poppins"
                  textColor="text-primary"
                />
                <div className="  bg-white h-fit w-[100%] border p-4 rounded-lg">
                  <Text
                    content="Tiago Tiguan"
                    fontWeight="font-medium"
                    className=" font-poppins "
                    textColor="text-primary"
                  />
                  <Text
                    content="Verkäufer"
                    // fontWeight="font-medium"
                    className="w-1/2 text-[#CCCCCC]"
                    // textColor="gr"
                  />
                  <Text
                    content="02.11.2004"
                    // fontWeight="font-medium"
                    className="w-1/2 text-[#CCCCCC]"
                    // textColor="gr"
                  />
                </div>
              </div>

              <div className=" flex 2xl:flex-col gap-2 ">
                <Text
                  content="Verkäufer"
                  fontWeight="font-semibold"
                  className="  font-poppins"
                  textColor="text-primary"
                />
                <div className="  bg-white h-fit w-[100%] border p-4 rounded-lg">
                  <Text
                    content="Tiago Tiguan"
                    fontWeight="font-medium"
                    className=" font-poppins "
                    textColor="text-primary"
                  />
                  <Text
                    content="Verkäufer"
                    // fontWeight="font-medium"
                    className="w-1/2 text-[#CCCCCC]"
                    // textColor="gr"
                  />
                  <Text
                    content="02.11.2004"
                    // fontWeight="font-medium"
                    className="w-1/2 text-[#CCCCCC]"
                    // textColor="gr"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 mt-5">
              <Text
                content="Document"
                textSize="text-16px"
                fontWeight="font-semibold"
                textColor="primary"
              />
              <div className="mt-2 flex items-center p-3 bg-gray-100 rounded-md shadow-sm w-full max-w-md">
                <div className="bg-red-500 p-2 rounded">
                  <FaFilePdf className="text-white w-5 h-5" />
                </div>
                <div className="ml-3">
                  <a
                    target="_blank"
                    href={`${config.imageBaseUrl}/contractTemplates/${data?.contractId?.contractFile}`} // Replace with your file URL
                    download={data?.contractId?.contractFile} // Triggers download with the file name
                    className="text-gray-800 font-medium text-sm cursor-pointer hover:underline"
                  >
                    {data?.contractId?.contractFile}
                  </a>

                  <p className="text-gray-500 text-xs">19.06 KB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractDetailsPage;

const IconButtons = ({ buttonIcons, heading }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div>
      <Text
        content={heading}
        fontWeight="font-semibold"
        textColor="text-primary"
      />
      <section className="border rounded-lg bg-white p-2 space-y-2">
        <div className="flex gap-2 items-center">
          {buttonIcons.map((icon, i) => (
            <button
              key={i}
              className={`py-2 px-5 rounded-md ${
                activeIndex === i
                  ? "bg-green-100 text-secondary"
                  : "bg-[#1E599B14] text-gray-500"
              }`}
              onClick={() => setActiveIndex(i)}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Text textSize="text-sm" content="show more" />
          <button>
            <FaChevronDown className="text-xs" />
          </button>
        </div>
      </section>
    </div>
  );
};
