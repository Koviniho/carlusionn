import Text from "../Heading/text";

import Images from "../../assets/images";
import Appointments from "../VehicleManagementComponent/detailsRightSide/appointments";
import Documents from "../VehicleManagementComponent/detailsRightSide/documents";

import Icons from "../../assets/icons";
import OutstandingInvoices from "./outstandingInvoices";
const CustomerDetailsRightSide = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const { singleVehicle } = useSelector((state) => state.vehicle);
  // const vehicleDetails = singleVehicle?.vehicle || {};

  return (
    <>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Text
              content="Ausweiss"
              fontWeight="font-semibold"
              textColor="text-darkBlue"
            />
            <Icons.FiPlus className="text-secondary" />
          </div>
          <div className="border p-2 rounded-sm flex items-start gap-4">
            <img src={Images.idCard} alt="" />
            <div className="space-y-1">
              <p>ID_Kristian_Kovac.Pdf</p>
              <div className="">
                <div className="flex items-center  gap-2 ">
                  <img src={Images.download} className="text-darkBlue w-4" />
                  <img src={Images.bin} className="text-darkBlue w-4" />

                  <Icons.IoEyeOutline
                    size={18}
                    className="text-secondary cursor-pointer"
                    //   onClick={() => handleNavigate(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Documents />
        <Appointments />
        <OutstandingInvoices />

        {/* <div className="flex items-center justify-center gap-5 ">
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

        <div>
          <Text
            content="Location"
            fontWeight="font-semibold"
            textColor="text-darkBlue"
          />
          <div className="border border-lightGray rounded-sm bg-white p-2">
            <Text
              content="Autocenter Niederbipp AG"
              fontWeight="font-medium"
              textColor="text-primary"
              textSize="text-[16px]"
            />
            <Text
              content="Leenrütimattweg 4704 Niederbipp"
              fontWeight="font-normal"
              textColor="text-grayText"
              textSize="text-[16px]"
            />
          </div>
        </div>

        <PlannedInvestment />
        <RegistrationCertification />
        <CarHistory />
        <PriviousOwner /> */}
      </div>
    </>
  );
};

export default CustomerDetailsRightSide;
