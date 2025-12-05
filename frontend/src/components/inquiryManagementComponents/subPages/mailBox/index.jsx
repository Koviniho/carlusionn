import { useState } from "react";
import Breadcrumb from "../../../Breadcrumb";
import Text from "../../../Heading/text";
import { PiEnvelopeLight, PiGasCanFill } from "react-icons/pi";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillFuelPumpFill, BsPrinter, BsReplyAll } from "react-icons/bs";
import {
  RiDeleteBin6Line,
  RiReplyLine,
  RiShareForwardLine,
} from "react-icons/ri";
import { IoFlagSharp, IoTrashBinOutline } from "react-icons/io5";
import Images from "../../../../assets/images";
import { BiSolidTachometer } from "react-icons/bi";
import { IoMdColorPalette } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { FaTowerBroadcast } from "react-icons/fa6";
import CarCardComponent from "../../sharedComponents/CarCardComponent";
import Button from "../../../Button";
import { Link } from "react-router-dom";

const messages = [
  {
    id: 1,
    username: "Danny Rico",

    time: "8:21 PM",
    subject: "Car for Sale – Excellent Condition & Great Price!",
    message:
      "I hope you're doing well. I'm reaching out to let you know that I have a BMW available for sale.........",
  },
  {
    id: 2,
    username: "Melody Cheung",
    time: "7:35 PM",
    subject: "",
    message:
      "Remind me what night those are. I'll need to prepare myself emotionally. Actually......",
  },
  {
    id: 3,
    username: "Melody Cheung",
    time: "7:35 PM",
    subject: "Car Inceptions",
    message:
      "Remind me what night those are. I'll need to prepare myself emotionally. Actually......",
  },
];

const Mailbox = () => {
  const [selectedUser, setSelectedUser] = useState(messages[0]);

  return (
    <div>
      <Breadcrumb heading="Mailbox Carlusion" pageName="Inquiry Management" />
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-4 rounded-lg  border-[2px] p-2">
          {messages.map((msg, index) => (
            <Msg
              key={index}
              name={msg.username}
              subject={msg.subject}
              msg={msg.message}
              time={msg.time}
              onClick={() => setSelectedUser(msg)}
              isSelected={selectedUser?.id === msg.id}
            />
          ))}
        </section>

        <section className={`col-span-8 space-y-4`}>
          <div className="border-[2px] p-4 rounded-lg  space-y-4">
            <section className="flex gap-5 text-gray-400 items-center text-lg">
              <PiEnvelopeLight />
              <LiaEditSolid />
              <BsPrinter />
              <RiDeleteBin6Line />
              <IoTrashBinOutline />
              <RiReplyLine />
              <BsReplyAll />
              <RiShareForwardLine />
              <IoFlagSharp className="text-secondary" />
            </section>

            <section className=" flex justify-between items-start pb-2 border-b">
              <div className="flex items-start gap-2">
                <img
                  // src={`${config.imageBaseUrl}/customer/${item?.profileImage}`}
                  src={Images.profile}
                  alt="customer"
                  className="h-[42px] w-[42px] object-cover rounded-full mt-1"
                />
                <div className="space-y-1">
                  <Text
                    content={
                      selectedUser ? selectedUser.username : "Select a message"
                    }
                    textColor="text-black"
                    textSize="text-lg"
                    fontWeight="font-bold"
                  />
                  <Text
                    content={
                      selectedUser
                        ? `Re: ${selectedUser.subject}`
                        : "No Subject"
                    }
                    textColor="text-black"
                    textSize="text-sm"
                    fontWeight="font-normal"
                  />
                  <Text
                    content={`To: Nisha Kumar,  CC:Trev Smith,  Sophie Sun,`}
                    textSize="text-sm"
                    fontWeight="font-normal"
                  />
                </div>
              </div>
              <Text
                content={`September 03, 2022 at 6:54 PM`}
                textSize="text-sm"
                fontWeight="font-normal"
              />
            </section>

            <section className="space-y-2">
              <div className="mt-4 mb-2">
                <div
                  // onClick={handleButtonClick}
                  style={{
                    backgroundImage: ` url(${Images.vehiclecheckimage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className=" w-full  text-white rounded-t-[10px] cursor-pointer "
                >
                  <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <img
                      src={Images.loginLogo}
                      alt=""
                      className="object-cover"
                    />
                    <p className="font-medium text-lg">
                      Welcome back! Continue checking vehicles?
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Text
                  content="Sehr geehrte Damen und Herren"
                  textColor="text-black"
                  textSize="text-lg"
                  fontWeight="font-bold"
                />

                <Text
                  content={`I hope you’re doing well. I’m reaching out to let you know that I have a BMW available for sale. The car is in excellent condition and has been well-maintained.`}
                  textSize="text-sm"
                  fontWeight="font-normal"
                />

                <Text
                  content={`- Dany`}
                  textSize="text-sm"
                  fontWeight="font-normal"
                />
              </div>
            </section>

            <section className="space-y-2">
              <div className="max-w-[45%]">
                <img src={Images.vehicleInfo} alt="" className="w-full" />
              </div>
              <Text
                content="MERCEDES-BENZ MERCEDES-AMG SL MERCEDESAMG SL 63 4MATIC"
                textColor="text-black"
                textSize="text-sm"
                fontWeight="font-bold"
              />
              <div className="grid grid-cols-2 gap-2 max-w-[40%]">
                <IconList icon={<BiSolidTachometer />} text="62780 km" />
                <IconList icon={<IoMdColorPalette />} text="White" />
                <IconList icon={<MdCalendarMonth />} text="May 2021" />
                <IconList icon={<PiGasCanFill />} text="Diesel" />
                <IconList
                  icon={<FaTowerBroadcast ometer />}
                  text="286 HP (210kW)"
                />
                <IconList icon={<BsFillFuelPumpFill />} text="6.61/100 km" />
              </div>
            </section>
          </div>
          <div className="border-[2px] p-4 rounded-lg space-y-3">
            <CarCardComponent />
            <div className="flex items-center gap-3">
              <Link to="/dashboard/inquiry-management/123/mailbox/332/client-information">
                <Button
                  text="View"
                  bgColor="primary"
                  borderRadius="rounded-md"
                  textColor="white"
                  fontSize="text-base"
                />
              </Link>
              <Button
                borderRadius="rounded-md"
                bgColor="black"
                textColor="white"
                text="Reject"
                fontSize="text-base"
                borderColor="transparent hover:border-black "
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mailbox;

const Msg = ({ name, subject, msg, time, onClick, isSelected }) => {
  return (
    <div
      className={`p-2 space-y-1 border-b my-2 cursor-pointer rounded-lg  transition-colors ${
        isSelected ? "bg-primary text-white active" : "hover:bg-primary group"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <Text
          content={name}
          textColor={`${
            isSelected ? "text-white" : "text-black group-hover:text-white"
          }`}
          textSize="text-sm"
          fontWeight="font-[600]"
        />
        <Text
          content={time}
          textColor={`${
            isSelected ? "text-white" : "text-black group-hover:text-white"
          }`}
          textSize="text-xs"
        />
      </div>
      {subject && (
        <Text
          content={subject}
          textColor={`${
            isSelected ? "text-white" : "text-black group-hover:text-white"
          }`}
          textSize="text-[13px]"
        />
      )}
      <Text
        content={msg}
        textColor={`${
          isSelected ? "text-white" : "text-black group-hover:text-white"
        }`}
        textSize="text-[12px]"
      />
    </div>
  );
};

const IconList = ({ icon, text }) => {
  return (
    <div className="flex gap-2 items-center">
      {icon}
      <Text content={text} textSize="text-base" />
    </div>
  );
};
