/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Text from "../../Heading/text";
import { FaPlus } from "react-icons/fa";
import MainHeading from "../../Heading/mainHeading";

function PlannedInvestment({vehicleDetails}) {
  console.log("🚀 ~ PlannedInvestment ~ vehicleDetails:", vehicleDetails)
  const plannedInvestmentDetails = vehicleDetails?.plannedInvestmentDetails || [];
  const totalPlannedInvestment = vehicleDetails?.purchaseDetails?.plannedInvestment || 0;
  
  // Calculate total amount spent
  const totalSpent = plannedInvestmentDetails.reduce((acc, item) => acc + item.amount_CHF, 0);
  
  // Calculate remaining investment
  const remainingInvestment = totalPlannedInvestment - totalSpent;
  return (
    <div>
      <div className="flex items-center gap-2 ">
        <Text
          content="Planned investment"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
          // className=""
        />
        <FaPlus
          className="text-primary cursor-pointer"
          size={12}
          onClick={() => alert("in progress")}
        />
      </div>
      <div className="flex items-center ">
        <MainHeading
        heading={`${remainingInvestment} CHF`}
          textColor="error"
          textSize="text-2xl"
        />
        <MainHeading
          heading={`/${vehicleDetails?.purchaseDetails?.plannedInvestment}`}
          textColor="primary"
          textSize="text-2xl"
        />
      </div>
      <div className="space-y-2">
        {plannedInvestmentDetails.length > 0 ? (
          plannedInvestmentDetails.map((item) => (
            <PlannedInvestmentCard key={item._id} item={item} />
          ))
        ) : (
          <Text content="No planned investments available" textColor="text-gray-500" />
        )}
      </div>
    </div>
  );
}

export default PlannedInvestment;

const PlannedInvestmentCard = ({ item }) => {
  return (
    <div className="flex items-center gap-4 border border-lightGray rounded-md bg-white p-2">
      <div>
        <Text
          content={item.investmentFor}
          fontWeight="font-medium"
          textColor="text-primary"
          textSize="text-[16px]"
        />
        <Text
          content={item.investmentLocation}
          fontWeight="font-normal"
          textColor="text-grayText"
          textSize="text-[16px]"
        />
      </div>
      <div>
        <Text
          content={`-${item.amount_CHF} CHF`}
          fontWeight="font-semibold"
          textColor="text-error"
          textSize="text-xl"
        />

        <button
          className="text-grayText text-sm font-normal"
          onClick={() => alert("View invoice in progress")}
        >
          View invoice
        </button>
      </div>
    </div>
  );
};