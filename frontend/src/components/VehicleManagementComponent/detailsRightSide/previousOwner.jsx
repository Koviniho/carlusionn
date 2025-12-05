/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Text from "../../Heading/text";
import { FaPlus } from "react-icons/fa";
import Images from "../../../assets/images";

function PriviousOwner({ vehicleDetails }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Text
          content="Previous Owner"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
        />
        <FaPlus
          className="text-primary cursor-pointer"
          size={12}
          // onClick={() => alert("in progress")}
        />
      </div>

      <div className="space-y-2">
        {vehicleDetails?.previousOwner?.map((owner, index) => (
          <PriviousOwnerCard key={owner._id || index} owner={owner} />
        ))}
      </div>
    </div>
  );
}

export default PriviousOwner;

const PriviousOwnerCard = ({owner}) => {
  console.log("🚀 ~ PriviousOwnerCard ~ owner:", owner)
  return (
    <div className="flex items-start gap-10 border border-lightGray rounded bg-white p-2">
      <div className="flex items-start gap-3">
        <img src={Images.bmwLogo} className="h-[44px] w-[44px]" alt="owner" />
        <div>
          <Text
            content={owner?.name}
            fontWeight="font-medium"
            textColor="text-primary"
            textSize="text-base"
          />
          <Text
            content={owner?.yearOfBirth}
            fontWeight="font-medium"
            textColor="text-grayText"
            textSize="text-sm"
          />
          <Text
            content="Purchase price:"
            fontWeight="font-medium"
            textColor="text-grayText"
            textSize="text-sm"
          />
          <Text
            content={owner?.purchasePrice_CHF}
            fontWeight="font-medium"
            textColor="text-darkBlue"
            textSize="text-sm"
          />
          <Text
            content="Period:"
            fontWeight="font-medium"
            textColor="text-grayText"
            textSize="text-sm"
          />
          <Text
            content={`${new Date(owner?.from).toISOString().slice(0, 7)} - ${new Date(owner?.until).toISOString().slice(0, 7)}`}
            fontWeight="font-medium"
            textColor="text-black"
            textSize="text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Text
          content="Status"
          fontWeight="font-medium"
          textColor="text-darkBlue"
          textSize="text-normal"
        />
        <Text
          content={owner?.status}
          fontWeight="font-medium"
          textColor="text-primary"
          textSize="text-2xl"
        />
      </div>
    </div>
  );
};
