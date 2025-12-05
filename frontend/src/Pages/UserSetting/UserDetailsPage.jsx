import Breadcrumb from "../../components/Breadcrumb";
import Text from "../../components/Heading/text";
import InfoCard from "../../components/InfoCard";
import UserTabs from "../../components/UserSettings/Tabs";
import CustomInput from "../../components/Input/custoInput";
import Button from "../../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import PersonalDetails from "../../components/UserSettings/PersonalDetails";
import NotificationPreferences from "../../components/UserSettings/NotificationPreferences";
import Images from "../../assets/images";
import Password from "./password";

export default function UserDetailsPage() {
  const stats = [
    {
      title: "Totale Benutzer",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Verfügbare Fahrzeuge",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Reservierte Fahrzeuge",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Verkaufte Fahrzeuge",
      value: "3521",
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
  ];
  const card = {
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
  };
  const handlePreferenceChange = (preferenceId, value) => {
    // Update your preferences state
    console.log(`Preference ${preferenceId} changed to ${value}`);
  };

  // const initialPreferences = [
  //   {
  //     id: "jobRecommendations",
  //     title: "Job Recommendations",
  //     description: "Based on the jobs you viewed...",
  //     enabled: true,
  //   },
  //   // ... other preferences
  // ];
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
        <div className="grid grid-cols-4 gap-6 mb-12 mt-5">
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

        <div className=" mt-8 bg-white  px-5 py-3 rounded-md border border-gray-300">
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
                text="Sales"
                borderRadius="rounded-md"
                textColor="white"
                className={"text-base"}
              />
              <Button
                text="Speichern"
                borderRadius="rounded-md"
                textColor="white"
              />
            </div>
          </div>

          {/* {cardsData.map((card, index) => (
          ))} */}
          <PersonalDetails card={card} edit={true} />
          {/* Password */}
          {/* <div className="mt-5 bg-white   rounded-md border border-gray-300">
            <div className=" gap-3 items-center border-b border-gray-300 p-4">
              <Text
                content="Password"
                textColor="black"
                fontWeight="font-semibold"
                className=""
              />
            </div>
            <div className="mt-3 p-4">
              <Text
                content="Current Password"
                textColor="black"
                fontWeight="font-medium"
                textSize="text-[16px]"
              />
              <Text content="**********" />
              <div className="mt-10">
                <Button
                  text={"Reset"}
                  borderRadius=" rounded-md"
                  bgColor="primary"
                  textColor="white"
                />
              </div>
            </div>
          </div> */}
          <div className="mt-5">
            <Password />
          </div>
          {/* 2 factor */}
          <div className="mt-5 bg-white rounded-md border border-gray-300">
            {/* Header Section */}
            <div className="border-b border-gray-300 p-4">
              <Text
                content="Two-Factor Authentication"
                textColor="black"
                fontWeight="font-semibold"
              />
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Text
                  content="Set up two-factor authentication:"
                  textColor="black"
                  fontWeight="font-medium"
                  textSize="text-[16px]"
                />
                <CustomInput type="toggle" value={true} />
              </div>

              <Text
                content="If you enable two-factor authentication, you will receive an email with a verification code for each login, which you must enter to log in."
                textSize="text-sm"
                className="my-4"
              />
            </div>
          </div>

          {/* Radios */}
          <div className="mt-5 bg-white  rounded-md border border-gray-300">
            <div className=" gap-3 items-center border-b border-gray-300 p-4">
              <Text
                content="Access & Rights"
                textColor="black"
                fontWeight="font-semibold"
                className=""
              />
            </div>
            <div className="p-4">
              <div className="mt-3 flex gap-5 mb-5">
                <div className="w-full lg:w-1/2 ">
                  <CustomInput
                    name={"degree"}
                    label={"Anstellungs Grad"}
                    type="select"
                    options={[
                      { value: "", label: "Verkäufer" },
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                    ]}
                  />
                </div>
              </div>
              <div>
                <NotificationPreferences
                  onPreferenceChange={handlePreferenceChange}
                />
              </div>
            </div>
          </div>
          {/* <div className="mt-5 bg-white  rounded-md border border-gray-300">
            <CustomCalendar/>
          </div> */}
        </div>
      </div>
    </>
  );
}
