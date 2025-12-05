/* eslint-disable no-unused-vars */
import React from "react";
import Text from "../../../../../Heading/text";

function Appointments() {
  return (
    <div>
      <Text
        content="Termine"
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
    <div className=" flex justify-between items-center gap-4 border border-lightGray rounded-md bg-white p-2 ">
      <div className="">
        <Text
          content=" Failing Am"
          fontWeight="font-medium"
          textColor="text-primary"
          textSize="text-[16px]"
        />
        <div className="max-w-[150px]">
          <Text
            content="Musterstrasse 3,4000 Bützberg"
            fontWeight="font-medium"
            textColor="text-grayText"
            textSize="text-[16px]"
          />
        </div>
      </div>
      <div>
        <Text
          content=" 24"
          fontWeight="font-semibold"
          textColor="text-secondary"
          textSize="text-[32px]"
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
        />
      </div>
    </div>
  );
};
