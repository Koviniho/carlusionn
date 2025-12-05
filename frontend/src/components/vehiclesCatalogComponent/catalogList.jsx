import VehicleSlider from "../VehicleManagementComponent/detailsRightSide/vehicleSlider";
import Images from "../../assets/images";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icons from "../../assets/icons";
import { useSelector } from "react-redux";


const CatalogList = () => {
  const navigate = useNavigate();
  const { webpageId } = useParams();
  const { data } = useSelector((state) => state?.miniHomePageSlice);
 
  const vehicleArray = data?.vehicleData;

  const handleNavigate = (vehicleId) => {
    navigate(`/vehicle-detail/${webpageId}`, {
      state: { vehicleId } // Pass state along with the route
    });
  };
  return (
    <div className="container mx-auto px-4 ">
      {vehicleArray?.results?.map((item, index) => {
        // Filter images that have category="image"
        const filteredImages =
          item?.allURLs?.filter((urlObj) => urlObj.category === "image") || [];
        console.log(
          "🚀 ~ {vehicleArray?.results?.map ~ filteredImages:",
          filteredImages
        );

        return (
          <div
            key={index}
            className="grid md:grid-cols-4 gap-6 items-start border-b py-8"
          >
            {/* Image Gallery */}
            <div>
              <VehicleSlider vehicle={true} vehicleImages={filteredImages} />
            </div>

            {/* Car Details */}
            <div className="px-4 col-span-2">
            <div onClick={()=>handleNavigate(item?._id)} className="cursor-pointer">  <MainHeading
                heading={item?.make + " " + item?.model}
                textColor="darkBlue"
                fontFamily="Poppins"
                textSize="text-[40px]"
                className="font-semibold"
              />
              </div>
              <Text
                textColor="text-grayText"
                textSize="text-base"
                fontWeight="font-medium"
                content={
                  item?.vehicleDescription || "No description available."
                }
              />
              <Text
                textColor="text-primary"
                textSize="text-[48px]"
                fontWeight="font-semibold"
                content={`${item?.price?.sellingPrice_CHF} CHF`}
              />

              <div className="flex flex-col gap-3 text-primary font-semibold">
                <Link className="underline">Kreditrate Berechnen</Link>
                <Link className="underline">Versicherung Berechnen</Link>
              </div>

              <div className="mt-4 grid grid-cols-2 max-w-2xl">
                <div className="flex items-center gap-1">
                  <Icons.FaCalendar />
                  <p>
                    {new Date(item?.firstRegistration).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={Images.gas} className="w-4 h-4" />
                  <p>{item?.fuel?.replace(/_/g, " ")}</p>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 max-w-2xl">
                <div className="flex items-center gap-1">
                  <Icons.BiSolidTachometer size={20} />
                  <p>{item?.condition?.kilometer} km</p>
                </div>
                <div className="flex items-center gap-1">
                  <Icons.HiSignal size={20} />
                  <p>{item?.psKw}</p>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 max-w-2xl">
                <div className="flex items-center gap-1">
                  <Icons.GiGearStickPattern size={20} />
                  <p>{item?.noOfGears || "N/A"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Icons.FaGasPump size={20} />
                  <p>{item?.consumption_L_100km} L / 100 Km</p>
                </div>
              </div>

              <div className="pt-5 pb-3 space-y-3">
                <Text
                  textColor="text-darkBlue"
                  textSize="text-base"
                  fontWeight="font-semibold"
                  content={"Autocenter Niederbipp AG - 4704 Niederbipp"}
                />
                <Text
                  textColor="text-[#0D8016]"
                  textSize="text-xl"
                  fontWeight="font-normal"
                  content={"Open until 19:00"}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center gap-4 mt-4 px-4">
                <img src={Images.scan} />
                <Icons.FaShareAlt className="w-5 h-5" />
                <Icons.FaRegStar className="w-5 h-5" />
                <Icons.FaRegHeart className="w-5 h-5" />
              </div>
              {/* <img
                  src={SVGS.LogoSvg}
                className="w-36 h-24 object-contain mb-16"
              /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CatalogList;
