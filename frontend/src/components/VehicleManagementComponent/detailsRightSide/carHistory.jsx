/* eslint-disable react/prop-types */

// import Text from "../../Heading/text";
// import { FaPlus } from "react-icons/fa";

// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import Images from "../../../assets/images";
// import { useSelector } from "react-redux";

// function CarHistory() {
//   const { singleVehicle } = useSelector((state) => state?.vehicle);
//   const vehicleDetails = singleVehicle?.vehicle || {};

 

//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-2">
//         <Text
//           content="Car History"
//           fontWeight="font-semibold"
//           textColor="text-darkBlue"
          
//         />
//         <FaPlus
//           className="text-primary cursor-pointer"
//           size={12}
//           // onClick={() => alert("in progress")}
//         />
//       </div>

//       <div className="space-y-2">
//         <CarHistoryCard />
//         <CarHistoryCard />
//         <CarHistoryCard />
//       </div>
//     </div>
//   );
// }

// export default CarHistory;

// const CarHistoryCard = () => {
//   return (
//     <div className=" flex items-start gap-10 border border-lightGray rounded-md bg-white p-2 ">
//       <div>
//         <Text
//           content=" MFK"
//           fontWeight="font-medium"
//           textColor="text-primary"
//           textSize="text-base"
//         />
//         <Text
//           content=" Lorem Ipsum"
//           fontWeight="font-normal"
//           textColor="text-grayText"
//           textSize="text-base"
//         />
//       </div>

//       <div>
//         <Text
//           content=" 24"
//           fontWeight="font-semibold"
//           textColor="text-primary"
//           textSize="text-[32px]"
//         />
//         <Text
//           content=" 12.2024"
//           fontWeight="font-semibold"
//           textColor="text-black"
//           textSize="text-sm"
//         />
//       </div>

//       <div className="flex items-center gap-1 self-center justify-end ">
//       <img src={Images.download} className=" w-4 h-4" />
//           <img src={Images.bin}
//          className=" w-4 h-4"
            
//           />
//         <MdOutlineRemoveRedEye
//           size={17}
//           className="text-secondary cursor-pointer"
//           // onClick={() => alert("in progress")}
//         />
//       </div>
//     </div>
//   );
// };

import Text from "../../Heading/text";
import { FaPlus } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Images from "../../../assets/images";
import { useSelector } from "react-redux";

function CarHistory() {
  const { singleVehicle } = useSelector((state) => state?.vehicle);
  const vehicleDetails = singleVehicle?.vehicle || {};
  const vehicleHistory = vehicleDetails?.vehicleHistory || [];

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Text
          content="Car History"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
        />
        <FaPlus
          className="text-primary cursor-pointer"
          size={12}
          onClick={() => alert("In progress")}
        />
      </div>

      <div className="space-y-2">
        {vehicleHistory.length > 0 ? (
          vehicleHistory.map((history, index) => (
            <CarHistoryCard key={history._id || index} history={history} />
          ))
        ) : (
          <Text content="No history available" textColor="text-gray-500" />
        )}
      </div>
    </div>
  );
}

export default CarHistory;

const CarHistoryCard = ({ history }) => {
  // Format date to "DD.MM.YYYY"
  const formattedDate = new Date(history.date)
  .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
  .replace(/\//g, "."); // Converts "04/09/1992" → "04.09.1992"

const [day, month, year] = formattedDate.split(".");

  return (
    <div className="flex items-start justify-between gap-4 border border-lightGray rounded-md bg-white p-2">
      <div>
        <Text
          content={history.type.replace(/_/g, " ")} // Format type properly
          fontWeight="font-medium"
          textColor="text-primary"
          textSize="text-base"
        />
        <Text
          content={history.location}
          fontWeight="font-normal"
          textColor="text-grayText"
          textSize="text-base"
        />
      </div>

      <div>
        <Text
          content={day} // Show day separately
          fontWeight="font-semibold"
          textColor="text-primary"
          textSize="text-[32px]"
        />
        <Text
           content={`${month}.${year}`} // Show month and year separately
          fontWeight="font-semibold"
          textColor="text-black"
          textSize="text-sm"
        />
      </div>

      <div className="flex items-center gap-1 mt-2 justify-end flex-shrink-0">
        <img src={Images.download} className="w-4 h-4 cursor-pointer" alt="Download" />
        <img src={Images.bin} className="w-4 h-4 cursor-pointer" alt="Delete" />
        <MdOutlineRemoveRedEye
          size={17}
          className="text-secondary cursor-pointer"
          onClick={() => alert(`Viewing ${history.type}`)}
        />
      </div>
    </div>
  );
};
