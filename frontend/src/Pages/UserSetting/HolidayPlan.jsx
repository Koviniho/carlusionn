import { GiPriceTag } from "react-icons/gi";
import Breadcrumb from "../../components/Breadcrumb";
import Text from "../../components/Heading/text";
import InfoCard from "../../components/InfoCard";
import CustomCalendar from "../../components/UserSettings/CustomCalendar";
import PersonalDetails from "../../components/UserSettings/PersonalDetails";
import UserTabs from "../../components/UserSettings/Tabs";
import Images from "../../assets/images";
import VehicleStats from "./vehicleStats";

export default function HolidayPlanPage() {
  const stats = [
    {
      title: "Totale Benutzer",
      value: "3521",
      icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Verfügbare Fahrzeuge",
      value: "3521",
      icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Reservierte Fahrzeuge",
      value: "3521",
      icon: <GiPriceTag className="w-8 h-8" />,
    },
    {
      title: "Verkaufte Fahrzeuge",
      value: "3521",
      icon: <GiPriceTag className="w-8 h-8" />,
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
    },

    // Add more card objects as needed
  ];

  return (
    <>
      <Breadcrumb heading={"Hallo, Willkommen Silas  Rotzetter! 👋"} />
      <div className="">
        {/* <Text
          content="Holiday Plan"
          textColor="black"
          fontWeight="font-medium"
          textSize="text-2xl"
        /> */}
        <div className="">
          <Text
            content="Vacation Plan"
            textColor="black"
            fontWeight="font-medium"
            textSize="text-2xl"
          />

          <UserTabs />
          <VehicleStats />
          <div className=" mt-8 -white  px-5 py-3 rounded-md border border-gray-300 bg-white">
            <div className="container">
              <CustomCalendar />
            </div>
            <div className="mt-8">
              <Text
                content="Aktueller Arbeitstag"
                fontWeight="font-semibold"
                textSize="text-[24px]"
                textColor="black"
              />
              <Text
                content="24.12.2024"
                fontWeight="font-normal"
                textSize="text-[24px]"
                textColor="black"
              />
            </div>

            {cardsData.map((card, index) => (
              <PersonalDetails card={card} key={index} status={true} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
