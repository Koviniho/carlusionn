/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useSelector } from "react-redux";
import Images from "../../../../../assets/images";
import Text from "../../../../Heading/text";
import VehicleSlider from "../../../../VehicleManagementComponent/detailsRightSide/vehicleSlider";
import {
  formatDate,
  formatDateByMonth,
  formatDateToDDMMYYYY,
} from "../../../../../utils/dateFormate";

const Information = () => {
  const { singleInvoice } = useSelector(
    (state) => state?.fetchSingleInvoiceSlice
  );
  const invoiceDetail = singleInvoice?.invoice;
  const customerInfo = invoiceDetail?.customerId;
  const vehicle = invoiceDetail?.vehicleId;
  const customerInformation = [
    { label: "Customer Type", value: customerInfo?.customerType || "-" },
    {
      label: "Customer id",
      value: `${customerInfo?._id.slice(0, 10)}...` || "-",
    },
    { label: "Phone Number", value: customerInfo?.phoneNumber || "-" },
    {
      label: "Name",
      value: `${customerInfo?.firstName}  ${customerInfo?.name}` || "-",
    },
    {
      label: "Date of Birth",
      value: formatDate(customerInfo?.birthDate) || "-",
    },
    { label: "Email Address", value: customerInfo?.email || "-" },
    { label: "PLZ", value: customerInfo?.zipCode || "-" },
    // { label: "Ort", value: "4900" || "-" },
    { label: "Marital Status", value: customerInfo?.maritalStatus || "-" },
    { label: "Location", value: customerInfo?.residencePlace || "-" },
    // { label: "Position", value: "CEO" || "-" },
    { label: "Address", value: customerInfo?.address || "-" },
  ];

  const vehicleInformation = [
    { label: "Brand", value: vehicle?.make || "-" },
    { label: "Model", value: vehicle?.model || "-" },
    {
      label: "First Registration",
      value: vehicle?.firstRegistration
        ? new Date(vehicle.firstRegistration).toLocaleDateString("en-GB")
        : "-",
    },
    {
      label: "Kilometer",
      value: vehicle?.condition?.kilometer
        ? `${vehicle.condition.kilometer}'000 Km`
        : "-",
    },
    { label: "Body Type", value: vehicle?.bodyType?.replace(/_/g, " ") || "-" },
    { label: "Drive System", value: vehicle?.drive?.replace(/_/g, " ") || "-" },
    { label: "Transmission", value: vehicle?.type || "-" },
    { label: "PS/KW", value: vehicle?.psKw || "-" }, // crude example
    // { label: "KW", value: vehicle?.psKw?.split(" ")[2] || "-" }, // crude example
    {
      label: "Vehicle Color",
      value: vehicle?.vehicleFeatures?.vehicleColor || "-",
    },
    {
      label: "Interior Color",
      value: vehicle?.vehicleFeatures?.interiorColor || "-",
    },
    { label: "New Price", value: `${vehicle?.price.newPrice_CHF} CHF` || "-" }, // not in API
    { label: "Number Of Gears", value: vehicle?.noOfGears || "-" },
    { label: "Seats", value: vehicle?.seats || "-" },
    { label: "Doors", value: vehicle?.doors || "-" },
    {
      label: "Displacement (Cm3)",
      value: vehicle?.capacity_cm3 ? `${vehicle.capacity_cm3} cm` : "-",
    },
    {
      label: "Letzer MFK",
      value: vehicle?.condition?.lastMFK
        ? formatDateByMonth(vehicle?.condition?.lastMFK)
        : "-",
    },
    { label: "Typengenehmigung", value: vehicle?.typeApproval || "-" },
    { label: "Stammnummer", value: vehicle?.trunkNumber || "-" },
    { label: "Fahrgestellnummer", value: "CHI-F4354-43BL-2JA8" || "-" },
    {
      label: "Vehicle Condition",
      value: vehicle?.condition?.vehicleCondition || "-",
    },
    { label: "Warranty", value: vehicle?.condition?.warranty || "-" },
  ];

  const inspectionListing = [
    {
      id: 1,
      heading: "",
      points: [`${invoiceDetail?.vehicleDescription}`],
    },
  ];

  const vehicleImages = [
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
  ];
  return (
    <div>
      <div className=" border rounded">
        <div className="p-2 bg-white space-y-7">
          <section className="flex flex-col-reverse lg:flex-row  justify-between items-start w-full">
            <ExpandableSection
              title="Customer Information"
              details={customerInformation}
            />

            <div className=" my-10 mr-5">
              <img
                className="min-w-[111px] h-[111px] rounded-full flex-shrink-0 object-cover"
                src={ invoiceDetail? invoiceDetail?.customerId?.allURLs[0]?.s3Url: Images.emptyAvatar}
              />
            </div>
            {/* ================= Customer Information  End */}
          </section>

      {vehicle && (    <section className="flex flex-col-reverse lg:flex-row  justify-between items-start">
            <ExpandableSection
              title="Vehicle Information"
              details={vehicleInformation}
            />
            <div className="mx-4 mt-10">
              <VehicleSlider vehicle={true} vehicleImages={vehicleImages} />
            </div>
          </section>
)}
          <section className="flex flex-col-reverse lg:flex-row  justify-between items-start">
            <InspectionListing
              title="Vehicle Inspection"
              inspectionListing={inspectionListing}
            />
          </section>

          <section className="mx-4">
          
            <div className="flex justify-between max-w-[300px]">
              <p className="text-base text-darkBlue font-semibold ">Customer Name</p>
              <p className="text-base ">
              {invoiceDetail?.customerId?.firstName} {invoiceDetail?.customerId?.name}
               
              </p>
            </div>
          </section>

          <section className="mx-4 space-y-3">
            <Text
              content="Invoice Data"
              fontWeight="font-semibold"
              textColor="#000000"
            />
            <Calculation label="Invoice Date:" value={formatDateToDDMMYYYY(invoiceDetail?.creationDate)} />
            <Calculation label="Due Date:" value={formatDateToDDMMYYYY(invoiceDetail?.dueDate)} />
            {/* <Calculation label="Acceptance Date:" value="02.12.2024" /> */}
            <Calculation label="Handled By:" value={invoiceDetail?.editorId.username} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Information;

const ExpandableSection = ({ title, details }) => {
  return (
    <div className="w-full">
      <div className="flex items-center p-4 gap-4">
        <Text
          content={title}
          textColor="text-DarkBlue"
          fontWeight="font-semibold"
        />
      </div>
      <div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 px-4 text-gray-800">
          {details?.map((detail, index) => (
            <div key={index} className="">
              <p className="font-semibold text-darkBlue">{detail?.label}</p>
              <p className={`text-grayText`}>{detail?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InspectionListing = ({ title, inspectionListing }) => {
  return (
    <div>
      <section className="flex items-center p-4 gap-4">
        <Text
          content={title}
          textColor="text-DarkBlue"
          fontWeight="font-semibold"
        />
      </section>
      <section>
        {inspectionListing.map((item) => (
          <div key={item.id} className="px-4">
            {/* <Text
              content={`${item.id}. ${"\u00A0"} ${item.heading}`}
              textColor="text-DarkBlue"
              fontWeight="font-semibold"
            /> */}
            <p className="space-y-2 mb-2">
              {item.points.map((point, i) => (
                <div key={i}>
                  <Text content={`- ${point}`} />
                </div>
              ))}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

const Calculation = ({ label, value }) => {
  return (
    <div className="flex justify-between max-w-[300px]">
      <p className="text-base font-semibold">{label}</p>
      <p className="text-base text-gray-500">{value}</p>
    </div>
  );
};
