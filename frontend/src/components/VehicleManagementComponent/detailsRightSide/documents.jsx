/* eslint-disable react/prop-types */

import Text from "../../Heading/text";
import { FaPlus } from "react-icons/fa";
import Images from "../../../assets/images";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../assets/icons";
import { useParams } from "react-router-dom";
import { deleteFile } from "../../../store/features/deleteFileSlice/deleteFileSlice";
import { getSingleVehicle } from "../../../store/features/vehicle/vehicleSlice";

function Documents() {
  const { singleVehicle } = useSelector((state) => state?.vehicle);
  const vehicleDetails = singleVehicle?.vehicle || {};

  const imageURLs = vehicleDetails?.allURLs?.filter(
    (item) => item.category === "document"
  );
  console.log("🚀 ~ RegistrationCertification ~ imageURLs:", vehicleDetails);

  const vehicleImages = imageURLs?.map((image) => ({
    original: image.s3Url,
    thumbnail: image.s3Url,
    name: image.title || "vehicle_document.pdf", // Assuming fileName is available
  }));
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

      {/* <div className="space-y-2">
        <DocumentsCard />
        <DocumentsCard />
        <DocumentsCard />

       
      </div> */}
          <div className="space-y-2">
        {vehicleImages?.length > 0 ? (
          vehicleImages?.map((image, index) => (
            <DocumentsCard key={index} image={image} />
          ))
        ) : (
          <Text
            content="No registration images available."
            textColor="text-gray-500"
          />
        )}
      </div>
    </div>
  );
}

export default Documents;

const DocumentsCard = ({ image }) => {
   const { id } = useParams();
    const dispatch = useDispatch();
  
    const handleDelete = async () => {
      const payload = {
        modelName: "vehicle",
        documentId: id, // Assuming you have documentId in image data
        s3Url: image.original,
      };
      const response = await dispatch(deleteFile(payload)).unwrap();
      console.log("🚀 ~ handleDelete ~ response:", response)
  
      if (response?.success) {
        dispatch(getSingleVehicle(id));
      }
    };
  const isImage = /\.(jpeg|jpg|png)$/i.test(image.original);

  return (

 <div className="flex items-start gap-4 border border-lightGray rounded-md bg-white p-2">
      <div>
        {isImage ? (
          <img
            src={image.original}
            className="w-[110px] h-[70px] object-cover rounded-sm flex-shrink-0"
            alt={image.name}
          />
        ) : (
          <div className="border w-[110px] h-[70px] object-cover rounded-sm flex items-center justify-center bg-gray-100">
            <Icons.FaFileAlt className="text-gray-500 text-3xl" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 truncate">
        <Text
          content={image.name}
          fontWeight="font-medium"
          textColor="text-darkBlue"
          textSize="text-base"
          className="="
        />

        <div className="flex items-center gap-2">
          <a href={image.original} download>
            <img
              src={Images.download}
              className="w-4 h-4 cursor-pointer"
              alt="Download"
            />
          </a>
          <img
            src={Images.bin}
            className="w-4 h-4 cursor-pointer"
            alt="Delete"
            onClick={handleDelete}
          />
          <MdOutlineRemoveRedEye
            size={20}
            className="text-secondary cursor-pointer"
            onClick={() => window.open(image.original, "_blank")}
          />
        </div>
      </div>
    </div>
  );
};
