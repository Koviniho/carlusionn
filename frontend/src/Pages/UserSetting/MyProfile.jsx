import { FaPlus } from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Text from "../../components/Heading/text";
import CustomInput from "../../components/Input/custoInput";
import PDFViewer from "../../components/UserSettings/PDFViewer";
import UserTabs from "../../components/UserSettings/Tabs";
import { BiEditAlt } from "react-icons/bi";
import { IoIosPhonePortrait, IoMdLaptop } from "react-icons/io";
import { useState } from "react";
import Images from "../../assets/images";
import Modal from "../../components/modal/modal";
import Password from "./password";
const openingHoursData = [
  {
    day: "25 dec ",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed ",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed",
    isOpen: "Christmas Holiday",
  },
  {
    day: "13 jan",
    timings: "Wed ",
    isOpen: "Christmas Holiday",
  },
];

export default function MyProfilePage() {
  const [isTwoway, setIstwoWay] = useState(false);
  return (
    <>
      <Breadcrumb heading={"Hallo, Willkommen Silas  Rotzetter! 👋"} />
      <div className="">
        <Text
          content="User settings"
          textColor="text-darkBlue"
          fontWeight="font-medium"
          textSize="text-2xl"
        />

        <UserTabs />
        <div>
          <Text
            content="Kristian Kovac"
            textColor="text-darkBlue"
            fontWeight="font-semibold"
            textSize="text-2xl"
            className="my-6"
          />

          <div className="  bg-white   rounded-md border border-gray-300 ">
            <div className="flex gap-3 items-center border-b w-fill border-gray-300  p-4">
              <Text
                content="Personal Information"
                textColor="text-darkBlue"
                fontWeight="font-semibold"
                className=""
              />
              <BiEditAlt
                width={18}
                height={18}
                className="fill-secondary font-bold"
              />
            </div>

            <div className="flex items-start justify-between">
              <div className="w-10/12 grid grid-cols-3 gap-6 p-5">
                {/* First Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <Text
                      content="Customer Type"
                      textColor="text-darkBlue"
                      fontWeight="font-medium"
                      textSize="text-[16px]"
                    />
                    <Text content="Private person" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="Name"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="Kristian Kovac" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="PLZ"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="4900" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="Location"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="Langenthaler" textSize="text-[14px]" />
                  </div>
                </div>

                {/* Second Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <Text
                      content="Customer Number"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="1" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="Date of Birth"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="01.01.2012" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="Position"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="CEO" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="Address"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text
                      content="Langenthaler Street 12"
                      textSize="text-[14px]"
                    />
                  </div>
                </div>

                {/* Third Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <Text
                      content="Phone Number"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="0797895571" textSize="text-[14px]" />
                  </div>
                  <div>
                    <Text
                      content="Email Address"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text
                      content="Dallaskeuchal12@gmail.com"
                      textSize="text-[14px]"
                    />
                  </div>
                  <div>
                    <Text
                      content="Marital Status"
                      textColor="text-darkBlue"
                      fontWeight="font-normal"
                      textSize="text-[16px]"
                    />
                    <Text content="Single" textSize="text-[14px]" />
                  </div>
                </div>
              </div>

              <div className=" w-2/12 my-10">
                <img
                  className="w-[131px] h-[131px] rounded-full"
                  src={Images.profile}
                />
              </div>
            </div>
          </div>
          <div className="grid mt-3 grid-cols-2 gap-3">
            {/* <div className=" bg-white border border-gray-300 rounded">
              <div className=" gap-3 items-center border-b p-4 border-gray-300 pb-2">
                <Text
                  content="Password"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
              </div>
              <div className="mt-3 p-4">
                <Text
                  content="Current Password"
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                  textSize="text-[16px]"
                />
                <Text content="**********" />
                <div className="mt-5">
                  <Button
                    text={"Reset"}
                    borderRadius=" rounded-md"
                    bgColor="primary"
                    textColor="white"
                    className={"py-2 px-12"}
                  />
                </div>
              </div>
            </div> */}
            <div className="">
            <Password/>
            </div>
            <div className="  bg-white   rounded-md border border-gray-300">
              <div className=" gap-3 items-center border-b border-gray-300 p-4">
                <Text
                  content="Two-Factor Authentication"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Text
                    content="Set up two-factor authentication:"
                    textColor="text-darkBlue"
                    fontWeight="font-medium"
                    textSize="text-[16px]"
                  />
                  <CustomInput
                    type="toggle"
                    value={true}
                    onChange={() => setIstwoWay(!isTwoway)}
                  />

                
                  <Modal
                    isOpen={isTwoway}
                    onClose={() => setIstwoWay(false)}
                    title={"All Filters"}
                    width={"max-w-5xl"}
                    setModalOpen={setIstwoWay}
                  >
                    <div className="p-4">
                      <p className="font-medium text-left">
                        Disable two-factor authentication?
                      </p>
                      <p className="text-sm  text-grayText mb-4 mt-2">
                        To disable two-factor authentication you must enter your
                        password.
                      </p>
                      <CustomInput placeholder="*****" type="password"  className="text-lg outline-none" />
                      <div className="flex items-center justify-center gap-4 my-4 mt-12 ">
                        <Button
                          text="Disable"
                          borderRadius="rounded-md"
                          textColor="white"
                          onClick={() => setIstwoWay(false)}
                          className={"py-2 px-12"}
                        />
                        <button
                          className={
                            "hover:bg-none px-12 py-2 text-error border-2 border-error rounded-md font-medium"
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
                <Text
                  content={
                    "If you enable two-factor authentication, you will receive an email with a verification code for each login, which you must enter to log in."
                  }
                  textSize="text-sm"
                  className="my-4"
                />
              </div>
            </div>
          </div>

          <div className="grid py-4 grid-cols-2 gap-3">
            <div className="  bg-white  rounded-md border border-gray-300 min-h-[420px]">
              <div className=" gap-3 items-center border-b border-gray-300 pb-2 p-4">
                <Text
                  content="Reports"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
              </div>
              <div className="mt-3 gap-2 flex flex-col p-4">
                <Text
                  content="Sale"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
                <PDFViewer />
                <PDFViewer />
              </div>
              <div className="mt-3 gap-2 flex flex-col p-4">
                <Text
                  content="Completed Contracts"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
                <PDFViewer />
                <PDFViewer />
              </div>
            </div>
            <div className="  bg-white  rounded-md border border-gray-300">
              <div className=" gap-3 flex items-center border-b border-gray-300 pb-2 p-4">
                <Text
                  content="Absentees / Vacation Plan"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
                <BiEditAlt
                  width={18}
                  height={18}
                  className="fill-secondary font-bold"
                />
              </div>
              <div className="">
                <div className="grid grid-cols-3 gap-4 text-left font-semibold text-white px-4 py-2 bg-primary">
                  <div>Date</div>
                  <div>Day</div>
                  <div>Notes</div>
                </div>
                {openingHoursData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 p-4 gap-4 py-2 items-center"
                  >
                    {/* Day */}
                    <div className="font-medium text-sm text-darkBlue">
                      {item.day}
                    </div>

                    {/* Timings */}
                    <div className="font-medium text-sm text-grayText">{item?.timings}</div>

                    {/* Availability */}
                    <div className="">
                      <div
                        className={` text-grayText flex items-center rounded-full  `}
                      >
                        {item?.isOpen}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" mt-3 bg-white   rounded-md border border-gray-300 min-h-[420px]">
            <div className=" gap-3 items-center border-b border-gray-300 pb-2 p-4">
              <Text
                content="Device Management"
                textColor="text-darkBlue"
                fontWeight="font-semibold"
                className=""
              />
            </div>
            <div className="flex flex-col space-y-3 mt-4">
              <div className="flex items-start gap-3">
                <Text
                  content="Active Session"
                  className="w-3/12 flex justify-center "
                  textColor="text-darkBlue"
                />
                <div className="border rounded-md w-full">
                  <div className="border-b flex items-start gap-5 p-3  w-full border-gray-50">
                    <IoMdLaptop size={20} />
                    <div className="flex flex-col  w-[80%]">
                      <Text
                        content="Chrome 131.0.0.0, Windows"
                        fontWeight="font-semibold"
                        textSize="text-sm"
                        textColor="text-black"
                      />
                      <Text
                        content="Last Activity 15 minutes ago Lahore, PB, Pakistan"
                        fontWeight="font-thin"
                        textSize="text-sm"
                      />
                    </div>
                    <button className="text-error underline">Logout</button>
                  </div>
                  <div className=" flex items-start gap-5 p-3  w-full border-gray-50">
                    <IoIosPhonePortrait size={20} />
                    <div className="flex flex-col  w-[80%]">
                      <Text
                        content="Chrome 131.0.0.0, Windows"
                        fontWeight="font-semibold"
                        textSize="text-sm"
                        textColor="text-black"
                      />
                      <Text
                        content="Last Activity 15 minutes ago Lahore, PB, Pakistan"
                        fontWeight="font-thin"
                        textSize="text-sm"
                      />
                    </div>
                    <button className="text-error underline">Logout</button>
                  </div>
                  <button className="text-primary underline flex items-center gap-4 py-5 px-10">
                    <FaPlus />
                    Show More
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Text
                  content="Session Log"
                  className="w-3/12 flex justify-center "
                  textColor="text-black"
                />
                <div className="border rounded-md w-full">
                  <div className="border-b flex items-start gap-5 p-3  w-full border-gray-50">
                    <IoMdLaptop size={20} />
                    <div className="flex flex-col    w-8/12">
                      <Text
                        content="Chrome 131.0.0.0, Windows"
                        fontWeight="font-semibold"
                        textSize="text-sm"
                        textColor="text-black"
                      />
                      <Text
                        content="Last Activity 15 minutes ago Lahore, PB, Pakistan"
                        fontWeight="font-thin"
                        textSize="text-sm"
                      />
                      <div className="flex items-center my-1">
                        <Text
                          content="IP Address:"
                          fontWeight="font-semibold"
                          textSize="text-sm: "
                        />
                        <span className="text-sm text-grayText ml-2">
                          93.184.216.34
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" flex items-start gap-5 p-3  w-full border-gray-50">
                    <IoIosPhonePortrait size={20} />
                    <div className="flex flex-col    w-8/12">
                      <Text
                        content="Chrome 131.0.0.0, Windows"
                        fontWeight="font-semibold"
                        textSize="text-sm"
                        textColor="text-black"
                      />
                      <Text
                        content="Last Activity 15 minutes ago Lahore, PB, Pakistan"
                        fontWeight="font-thin"
                        textSize="text-sm"
                      />
                      <div className="flex items-center my-1">
                        <Text
                          content="IP Address:"
                          fontWeight="font-semibold"
                          textSize="text-sm: "
                        />
                        <span className="text-sm text-grayText ml-2">
                          93.184.216.34
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-secondary underline flex items-center gap-4 py-5 px-10">
                    <FaPlus />
                    Show More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
