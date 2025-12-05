/* eslint-disable react/prop-types */
import Text from "../../../../../Heading/text";
import { FaFilePdf, FaPlus, FaRegFilePdf } from "react-icons/fa";
import Images from "../../../../../../assets/images";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function Documents({ RegistrationDocuments }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Text
          content="Documents"
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
        <DocumentsCard RegistrationDocuments={RegistrationDocuments} />
        <DocumentsCard />
        <DocumentsCard />

        {/* <PlannedInvestmentCard /> */}
      </div>
    </div>
  );
}

export default Documents;

const DocumentsCard = ({ RegistrationDocuments }) => {
  return (
    <div className=" flex items-center justify-between gap-4  bg-gray-100 ">
      {RegistrationDocuments?.map((image, index) => (
        <div
          key={index}
          className="p-3 flex items-center   rounded-md shadow-sm w-full max-w-md"
        >
          <div className="bg-red-500 p-2 rounded">
            <FaFilePdf className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col gap-5 truncate ml-3">
            <a href={image.s3Url} download>
              {" "}
              <Text
                content={`${image.title.slice(0, 28)}...`}
                fontWeight="font-medium"
                textColor="text-darkBlue"
                textSize="text-base"
                className="hover:underline"
              />
            </a>
          </div>
        </div>
      ))}
      {/* <div className="flex items-center gap-2 ">
        <img src={Images.download} className=" w-4 h-4" />
        <img src={Images.bin} className=" w-4 h-4" />
        <MdOutlineRemoveRedEye
          size={17}
          className="text-secondary cursor-pointer"
          onClick={() => alert("in progress")}
        />
      </div> */}
    </div>
  );
};
