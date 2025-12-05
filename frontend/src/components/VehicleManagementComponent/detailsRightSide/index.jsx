import { useSelector } from "react-redux";
import { config } from "../../../services/api";
import Text from "../../Heading/text";
import Appointments from "./appointments";
import PlannedInvestment from "./plannedInvestment";
import RegistrationCertification from "./registrationCertification";
import Documents from "./documents";
import CarHistory from "./carHistory";
import PriviousOwner from "./previousOwner";
import { useNavigate, useParams } from "react-router-dom";
import VehicleSlider from "./vehicleSlider";
const DetailsRightSide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleVehicle } = useSelector((state) => state?.vehicle);
  const vehicleDetails = singleVehicle?.vehicle || {};
  console.log("🚀 ~ DetailsRightSide ~ vehicleDetails:", vehicleDetails)
  const imageURLs = vehicleDetails?.allURLs?.filter(
    (item) => item.category === "image"
  );
  console.log("🚀 ~ DetailsRightSide ~ imageURLs:", imageURLs)

  return (
    <>
      <div className="space-y-4">
        <div>
          <div>
            <VehicleSlider vehicle={true} vehicleImages={imageURLs} />
          </div>

          <div className="flex items-center justify-center gap-5 mt-4">
            {vehicleDetails?.images?.slice(1, 4).map((image, index) => (
              <img
                onClick={() => navigate(`/dashboard/vehicle-details/${id}`)}
                key={index}
                src={`${config.imageBaseUrl}/vehicle/${image}`}
                alt={`Vehicle image ${index + 2}`}
                className="h-16 object-cover w-20 cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div>
          <Text
            content="Location"
            fontWeight="font-semibold"
            textColor="text-darkBlue"
          />
          <div className="border border-lightGray rounded mt-1 bg-white p-2">
            {/* <Text
              content={vehicleDetails?.location}
              fontWeight="font-medium"
              textColor="text-primary"
              textSize="text-[16px]"
            /> */}
            <Text
              content={vehicleDetails?.location}
              fontWeight="font-normal"
              textColor="text-grayText"
              textSize="text-[16px]"
            />
          </div>
        </div>

        <Appointments />
        <PlannedInvestment vehicleDetails={vehicleDetails} />
        <RegistrationCertification />
        <Documents />
        <CarHistory />
        <PriviousOwner vehicleDetails={vehicleDetails} />
      </div>
    </>
  );
};

export default DetailsRightSide;
