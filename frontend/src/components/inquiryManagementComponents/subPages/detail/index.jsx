import Breadcrumb from "../../../Breadcrumb";
import Button from "../../../Button";
import MainHeading from "../../../Heading/mainHeading";
import Text from "../../../Heading/text";
import { FaFilePdf } from "react-icons/fa";
import CarGallery from "../../../ContractManagementComponent/CarGallery";
import CustomInput from "../../../Input/custoInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSingleInquiry } from "../../../../store/features/inquirySlice/getSingleInquirySlice";
import Modal from "../../../modal/modal";
import axios from "../../../../services/api";
import showToast from "../../../../utils/toaster";
import CustomSelect from "../../../customSelect/customSelect";
import { ANSWER_INQUIRY } from "../../../../utils/baseURL";

const InquiryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openAnswerModel, setOpenAnswerModel] = useState(false);
  const { singleInquiry } = useSelector(
    (state) => state?.fetchSingleInquirySlice
  );
  console.log("🚀 ~ InquiryDetail ~ singleInquiry:", singleInquiry)
  const imageURLs =
    singleInquiry?.inquiry?.vehicleId?.allURLs?.filter(
      (item) => item.category === "image"
    ) || [];
  const RegistrationDocuments =
    singleInquiry?.inquiry?.vehicleId?.allURLs?.filter(
      (item) => item.category === "registration"
    ) || [];
  useEffect(() => {
    dispatch(fetchSingleInquiry(id));
  }, [dispatch, id]);
  const information = [
    // { label: "Salutation", value: "Herr" },
    {
      label: "First Name",
      value: singleInquiry?.inquiry?.customerInformation?.firstName,
    },
    {
      label: "Last Name",
      value: singleInquiry?.inquiry?.customerInformation?.lastName,
    },
    {
      label: "Phone Number",
      value: singleInquiry?.inquiry?.customerInformation?.phoneNumber,
    },
    {
      label: "Email Address",
      value: singleInquiry?.inquiry.customerInformation.email,
    },
  ];

  const vehicleData = [
    { label: "Brand", value: singleInquiry?.inquiry?.vehicleId?.make },
    { label: "Model", value: singleInquiry?.inquiry?.vehicleId?.model },
    {
      label: "Year of Manufacture",
      value: singleInquiry?.inquiry?.vehicleId?.manufactureYear,
    },
    { label: "PS/KW", value: singleInquiry?.inquiry?.vehicleId?.psKw },
    {
      label: "Transmission Type",
      value: singleInquiry?.inquiry?.vehicleId?.type,
    },
    {
      label: "Body Type",
      value: singleInquiry?.inquiry?.vehicleId?.bodyType?.replace(/_/g, " "),
    },
    {
      label: "Kilometers",
      value: singleInquiry?.inquiry?.vehicleId?.condition?.kilometer,
    },
    { label: "Fuel Type", value: singleInquiry?.inquiry?.vehicleId?.fuel },
    {
      label: "Drive Type",
      value: singleInquiry?.inquiry?.vehicleId?.drive?.replace(/_/g, " "),
    },
  ];
  const navigate = useNavigate();

  const goToMailboxPage = () => {
    navigate("/dashboard/inquiry-management/123/4");
  };
  /////////////for status update ///////////
  const options = [
    { label: "pending", value: "pending" },
    { label: "escalated", value: "escalated" },
    { label: "completed", value: "completed" },
  ];
  useEffect(() => {
    setSelectedStatus(singleInquiry?.inquiry?.status);
  }, [singleInquiry?.inquiry?.status]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    try {
      const response = await axios.put("/inquiry/update-status", {
        id: id,
        status: newStatus,
      });

      showToast("success", response?.data?.message);
    } catch (error) {
      showToast("error", error?.response?.data?.error);
    }
  };

  //////////////answer api integration ///////////////
  const [answer, setAnswer] = useState("");
  const handleSend = async () => {
    if (!answer.trim()) {
      showToast("error", "Answer is required.");
      return;
    }
    try {
      const payload = { inquiryResponse: answer };

      const response = await axios.post(ANSWER_INQUIRY(id), payload);

      console.log("🚀 ~ handleSend ~ response:", response);
      showToast("success",response?.data?.message)
      // Optionally show success feedback
      setAnswer(""); // reset
      setOpenAnswerModel(false); // close
    } catch (error) {
      showToast("error",error?.response?.data?.error)
      console.error("Error sending answer:", error);
      // Optionally show error feedback
    }
  };

  const handleCancel = () => {
    setAnswer("");
    setOpenAnswerModel(false);
  };
  return (
    <div>
      <Modal
        isOpen={openAnswerModel}
        onClose={() => setOpenAnswerModel(false)}
        title={"Answers"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setOpenAnswerModel}
      >
        <CustomInput
          label={"Write your Answer Here"}
          type="textarea"
          rows="10"
          placeholder="Your message..."
          className="outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="space-y-2">
          <Button
            text={"Send Answer"}
            textColor="white"
            className={"w-full"}
            borderRadius="rounded-md"
            onClick={handleSend}
          />
          <Button
            text={"Cancel"}
            textColor="darkBlue"
            className={"w-full "}
            borderRadius="rounded-md"
            bgColor="white"
            borderColor="darkBlue"
            onClick={handleCancel}
          />
        </div>
      </Modal>
      <Breadcrumb heading="Inquiry Detail" pageName="Inquiry  Detail" />
      <section className="flex items-center justify-between">
        <MainHeading
          heading={`${singleInquiry?.inquiry?._id} | ${singleInquiry?.inquiry?.customerInformation?.firstName} ${singleInquiry?.inquiry?.customerInformation?.lastName}`}
          textColor="[#1A2042]"
          textSize="text-[24px]"
          fontWeight="font-bold"
          className="font-poppins capitalize "
        />
        <div className=" flex gap-3">
          {/* <Button
            borderRadius="rounded-md"
            text="Filters"
            textColor="white"
            icon={<FilterSvg className="h-5 w-5" />}
          /> */}
          {/* <Link to="/dashboard/inquiry-management/123/mailbox/332"> */}
          <CustomSelect
            name="event"
            options={options}
            value={selectedStatus}
            onChange={handleStatusChange}
            backgroundColor="bg-primary"
            textColor="text-white"
          />
          <Button
            borderRadius="rounded-md"
            textColor="white"
            text="Answer"
            // onClick={goToMailboxPage}
            onClick={() => setOpenAnswerModel(true)}
          />
          {/* </Link> */}
        </div>
      </section>
      <section className="grid grid-cols-3 gap-12 ">
        <div className="border mt-10 col-span-3  2xl:col-span-2 order-2 2xl:order-1  ">
          {/* Sellerr Info */}
          <div className="bg-white border-b">
            <Text
              content="Information"
              fontWeight="font-semibold"
              className="px-6 py-4 border-b font-poppins"
              textColor="text-[#1A2042]"
            />
            <div className="p-6 bg-white rounded-md">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-4">
                {information.map((info, index) => (
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
          {/* customer  */}
          <div className="bg-white">
            <Text
              content="Information"
              fontWeight="font-semibold"
              className="px-6 py-4  font-poppins"
              textColor="text-[#1A2042]"
            />
            <Text
              content={singleInquiry?.inquiry?.remarks}
              fontWeight="font-normal"
              textSize="text-base"
              className="px-6 pb-4 border-b font-poppins"
            />
          </div>
          {/* Vehicle data  */}
          <div className="bg-white border-b">
            <Text
              content="Vehicle Information"
              fontWeight="font-semibold"
              className="px-6 py-4 font-poppins"
              textColor="text-[#1A2042]"
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
          {/* Addition */}
          <div className="bg-white space-y-3">
            <Text
              content="Addition"
              fontWeight="font-semibold"
              className="px-6 py-4  font-poppins"
              textColor="text-[#1A2042]"
            />

            <div className="max-w-[300px] flex justify-between">
              <Text
                content="Desired test drive"
                fontWeight="font-semibold"
                textSize="text-base"
                className="px-6  font-poppins"
                textColor="text-[#1A2042]"
              />
              <Text
                content={singleInquiry?.inquiry?.testDrive ? "Yes" : "No"}
                fontWeight="font-normal"
                textSize="text-base"
                className=" font-poppins"
              />
            </div>
            <div className="max-w-[500px] flex justify-between items-start">
              <Text
                content="Information About"
                fontWeight="font-semibold"
                textSize="text-base"
                className="px-6  font-poppins"
                textColor="text-[#1A2042]"
              />
              <div>
                {singleInquiry?.inquiry?.informationAbout?.map(
                  (info, index) => (
                    <Text
                      key={index}
                      content={info}
                      fontWeight="font-normal"
                      textSize="text-sm"
                      className="pr-3 font-poppins mt-1"
                      textColor="text-grayText"
                    />
                  )
                )}
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
                content="Location"
                fontWeight="font-semibold"
                className="font-poppins"
                textColor="text-[#1A2042]"
              />
              <div className=" bg-white border p-4 rounded-lg h-fit ">
                {/* <Text
                  content="Autocenter Niederbipp AG"
                  fontWeight="font-medium"
                  className="  font-poppins "
                  textColor="text-primary"
                /> */}
                <Text
                  content={singleInquiry?.inquiry?.vehicleId?.location}
                  className="w-full text-[#CCCCCC]"
                  textSize="text-base"
                />
              </div>
            </div>

            {/* <div className=" flex 2xl:flex-col gap-2 ">
              <Text
                content="Käufer"
                fontWeight="font-semibold"
                className="  font-poppins"
                textColor="text-[#1A2042]"
              />
              <div className="  bg-white h-fit w-[100%] border p-4 rounded-lg flex items-start gap-4">
                <img src={Images.person} alt="" />
                <div>
                  <Text
                    content="Tiago Tiguan"
                    fontWeight="font-medium"
                    className=" font-poppins "
                    textColor="text-primary"
                  />
                  <Text content="Verkäufer" className="w-3/2 text-[#CCCCCC]" />
                  <Text content="02.11.2004" className="w-1/2 text-[#CCCCCC]" />
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-span-2 mt-5">
            <Text
              content="Registration Document"
              textSize="text-16px"
              fontWeight="font-semibold"
              textColor="primary"
            />
            {RegistrationDocuments?.map((image, index) => (
              <div
                key={index}
                className="mt-2 flex items-start p-3 bg-gray-100 rounded-md shadow-sm w-full max-w-md"
              >
                <div className="bg-red-500 p-2 rounded">
                  <FaFilePdf className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col gap-5 truncate ml-3">
                  <a href={image.s3Url} download>
                    {" "}
                    <Text
                      content={`${image.title.slice(0, 28)}...`}
                      fontWeight="font-medium"
                      textColor="text-darkBlue"
                      textSize="text-base"
                      className="hover:underline"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InquiryDetail;
