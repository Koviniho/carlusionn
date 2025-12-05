import React from "react";
import Text from "../Heading/text";

export default function Countings({
  title = "Total Contracts",
  count = 0,
  icon: Icon // Accepting icon as a prop
}) {
  return (
    <div className="w-full border rounded-lg p-4 flex justify-between items-start bg-white"> 
      <div className="flex flex-col gap-1  ">
       <Text content={title} textColor="black" fontWeight="font-medium" textSize="text-[16px]" />
       <Text content={count.toLocaleString()} textColor="black" fontWeight="font-semibold" textSize="text-[16px]" />
      </div>
      {Icon && (
        <div className="bg-emerald-100 rounded-full p-2 w-12 h-12 flex justify-center items-center">
          <Icon className=" text-emerald-500" />
        </div>
      )} 
    </div>
  );
}