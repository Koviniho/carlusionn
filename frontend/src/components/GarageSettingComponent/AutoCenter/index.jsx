import InfoCard from "../../InfoCard";
import Text from "../../Heading/text";
import Images from "../../../assets/images";
import { MdEdit } from "react-icons/md";
import EmailSending from "./emailSending";
import DetailedBank from "./detailsBank";
import CompanyDetails from "./companyDetailed";
import OtherLocation from "./otherLocation";
import OpeningHours from "./openingHours";


export default function AutoCenter() {
  const stats = [
    {
      title: "Total Locations",
      value: "3521",
      icon: (
        <img
          src={Images.locationMark}
          alt="location"
          className="text-primary"
        />
      ),
    },
    {
      title: "Available Vehicles",
      value: "3521",
      icon: (
        <img src={Images.carIcon2} alt="location" className="text-primary" />
      ),
    },
    {
      title: "Reserved Vehicles",
      value: "3521",
      icon: (
        <img src={Images.carIcon2} alt="location" className="text-primary" />
      ),
    },
    {
      title: "Sold Vehicles",
      value: "3521",
      icon: (
        <img src={Images.carIcon2} alt="location" className="text-primary" />
      ),
    },
  ];
  const locationInfoData = [
    { title: "Company Name", value: "Autocenter Niederbipp AG" },
    { title: "Customer  Name", value: "1" },
    { title: "Address", value: "Kristian Kovac" },
    { title: "Location", value: "01.01.2012" },
    { title: "Postal Code", value: "CEO" },
    { title: "PLZ", value: "4900" },
    { title: "City", value: "Langenthal" },
    { title: "Adresse", value: "Langenthalerstrasse 12" },
    { title: "Marital status", value: "Single" },
    { title: "Phone Number", value: "0797895571" },
    { title: "Email Address ", value: "Dallaskeuchal12@gmail.com" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {stats.map((stat, index) => (
          <InfoCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat?.icon}
            textColor="darkBlue"
          />
        ))}
      </div>
      <div className=" border my-10 border-lightGray rounded-md bg-white">
        <div className="flex items-center gap-4 border-b border-lightGray px-4 py-2">
          <Text
            content="Main location information"
            textColor="text-darkBlue"
            fontWeight="font-semibold"
          />
          <MdEdit className="text-secondary" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Contract ID */}
            {locationInfoData?.map((item, index) => (
              <div key={index}>
                <Text
                  content={item?.title}
                  textSize="text-16px"
                  fontWeight="font-semibold"
                  textColor="text-darkBlue"
                />

                <Text
                  content={item?.value}
                  textSize="text-[14px]"
                  className="capitalize"
                />
              </div>
            ))}
          </div>
          <div className="col-span-3     flex items-center justify-center p-4">
            <img
              src={Images.cardCar}
              className="rounded-full h-[131px] w-[131px]"
            />
          </div>
        </div>{" "}
      </div>
      <div className="grid grid-cols-12 gap-4 mb-40 ">
        <div className="col-span-8  ">
          <EmailSending />
        </div>
        <div className="col-span-4 ">
          <OpeningHours />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 ">
          <DetailedBank />
        </div>
        <div className="col-span-6">
          <CompanyDetails />
        </div>
      </div>
      <OtherLocation />
    </div>
  );
}
