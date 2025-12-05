import Breadcrumb from "../../components/Breadcrumb";
import Text from "../../components/Heading/text";
import InfoCard from "../../components/InfoCard";
import UserTabs from "../../components/UserSettings/Tabs";

import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import PersonalDetails from "../../components/UserSettings/PersonalDetails";
import Images from "../../assets/images";
import VehicleStats from "./vehicleStats";

export default function MyUsersPage() {
  const stats = [
    {
      title: "Total Vehicles",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Available vehicles",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Reserved vehicles",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Sold vehicles",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
  ];

  const cardsData = [
    {
      customerType: "Private person",
      name: "Kristian Kovac",
      plz: "4900",
      location: "Langenthaler",
      maritalStatus: "Single",
      customerNumber: "1",
      dateOfBirth: "01.01.2012",
      position: "CEO",
      address: "Langenthaler Street 12",
      phoneNumber: "0797895571",
      emailAddress: "Dallaskeuchal12@gmail.com",
      imageSrc: Images.profile,
      status: "offline",
    },
    {
      customerType: "Business",
      name: "John Doe",
      plz: "1234",
      location: "New York",
      maritalStatus: "Married",
      customerNumber: "2",
      dateOfBirth: "05.05.1985",
      position: "Manager",
      address: "5th Avenue",
      phoneNumber: "0123456789",
      emailAddress: "johndoe@example.com",
      imageSrc: Images.profile,
      status: "online",
    },
    {
      customerType: "Business",
      name: "John Doe",
      plz: "1234",
      location: "New York",
      maritalStatus: "Married",
      customerNumber: "2",
      dateOfBirth: "05.05.1985",
      position: "Manager",
      address: "5th Avenue",
      phoneNumber: "0123456789",
      emailAddress: "johndoe@example.com",
      imageSrc: Images.profile,
      status: "offline",
    },
    {
      customerType: "Business",
      name: "John Doe",
      plz: "1234",
      location: "New York",
      maritalStatus: "Married",
      customerNumber: "2",
      dateOfBirth: "05.05.1985",
      position: "Manager",
      address: "5th Avenue",
      phoneNumber: "0123456789",
      emailAddress: "johndoe@example.com",
      imageSrc: Images.profile,
      status: "online",
    },
    // Add more card objects as needed
  ];
  return (
    <>
      <Breadcrumb heading={"Hallo, Willkommen Silas  Rotzetter! 👋"} />
      <div className="">
        <Text
          content="My Users"
          textColor="black"
          fontWeight="font-medium"
          textSize="text-2xl"
        />

        <UserTabs />
        {/* <div className="grid grid-cols-4 gap-6 mb-12 mt-5">
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
        </div> */}
        <VehicleStats />
        <div className=" mt-8 bg-white  px-5 py-3 rounded-md shadow-md border-gray-300">
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
              <p className="text-darkBlue text-sm font-medium">
                0 results found
              </p>
            </div>
            <div className="flex gap-5">
              <button className="rounded bg-primary py-2 px-4">
                <img src={Images.whiteDownload} className="h-5 w-5 " />
              </button>
              <Button
                text="Filters"
                borderRadius="rounded"
                textColor="white"
                icon={<MdTune className="h-5 w-5 rotate-90" />}
              />
              <Button
                text="New Contract"
                borderRadius="rounded"
                textColor="white"
                icon={<FaPlus className="h-3 w-3" />}
              />
            </div>
          </div>

          {cardsData.map((card, index) => (
            <PersonalDetails card={card} key={index} status={true} />
          ))}
        </div>
      </div>
    </>
  );
}
