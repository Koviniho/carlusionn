/* eslint-disable no-unused-vars */
import React from "react";
import Text from "../../Heading/text";

function Appointments() {
  return (
    <div >
      <Text
        content="Upcoming appointments"
        fontWeight="font-semibold"
        textColor="text-darkBlue"
        className="mb-2"
      />
      <div className="space-y-2">
        <AppointmentsCard />
        <AppointmentsCard />
      </div>
    </div>
  );
}

export default Appointments;

const AppointmentsCard = (item) => {
  return (
    <div className=" flex items-start gap-4 border border-lightGray rounded-md bg-white p-2 ">
      <div className="">
        <Text
          content=" demonstration mini MFK"
          fontWeight="font-medium"
          textColor="text-primary"
          textSize="text-[16px]"
        />
        <Text
          content="Leenrütimattweg 3,4704 Niederbipp"
          fontWeight="font-medium"
          textColor="text-grayText"
          textSize="text-[16px]"
        />
      </div>
      <div>
        <Text
          content=" 24"
          fontWeight="font-semibold"
          textColor="text-primary"
        />
        <Text
          content=" 12.2024"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
          textSize="text-[13px]"
        />
        <Text
          content=" 15:30 PM"
          fontWeight="font-semibold"
          textColor="text-black"
          textSize="text-[13px]"
          className=""
        />
      </div>
    </div>
  );
};
