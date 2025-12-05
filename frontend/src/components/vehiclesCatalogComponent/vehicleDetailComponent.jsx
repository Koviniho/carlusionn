import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Icons from "../../assets/icons";
import Images from "../../assets/images";
import { useEffect, useState } from "react";
import Button from "../Button";
import GoogleMap from "./googleMap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMiniHomePage } from "../../store/features/miniHomePageSlice/miniHomePageSlice";
import { formatDateByMonth } from "../../utils/dateFormate";

const VehicleDetailComponent = () => {
  const navigate = useNavigate();
  const { webpageId } = useParams();
  const location = useLocation();
  const { vehicleId } = location.state || {}; // Using optional chaining to avoid errors if state is not passed
  const dispatch = useDispatch();
  useEffect(() => {
    if (vehicleId) {
      dispatch(fetchMiniHomePage({ webpageId, vehicleId }));
    }
  }, [dispatch, vehicleId, webpageId]);
  const { data } = useSelector((state) => state?.miniHomePageSlice);
  console.log("🚀 ~ VehicleDetailComponent ~ data:", data);
  const vehicleData = data?.vehicleData;
  const vehicleArray = vehicleData?.results[0] || [];
  console.log("🚀 ~ VehicleDetailComponent ~ vehicleArray:", vehicleArray);

  // Filter to get only image category objects
  const imageArray =
    vehicleArray?.allURLs?.filter((urlObj) => urlObj.category === "image") ||
    [];

  const features = [
    "Abgedunkelte Seiten- und Heckscheibe",
    "Ambientebeleuchtung",
    "Assist: Aktiver Parkassistent inkl. PARKTRONIC",
    "Dachhimmel schwarz",
  ];
  const features2 = [
    "Abgedunkelte Seiten- und Heckscheibe",
    "Ambientebeleuchtung",
    "Assist: Aktiver Parkassistent inkl. PARKTRONIC",
    "Dachhimmel schwarz",
    "Gurtbringer elektrisch vorne",
    "KEYLESS GO Start Funktion",
    "Kraftstofftank 66 Liter",
    "Licht: LED High Performance-Scheinwerfer",
    "Media: Digitales Radio (DAB)",
    "Media: Touchpad",
  ];

  const images = [
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.car3, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.vehicleInfo, // Replace with your actual image path
      thumbnail: Images.vehicleInfo,
    },
    {
      original: Images.car4, // Replace with your actual image path
      thumbnail: Images.car4,
    },
  ];
  const [selectedImage, setSelectedImage] = useState(imageArray[0]?.s3Url);
  // console.log("🚀 ~ VehicleDetailComponent ~ selectedImage:", selectedImage);
  // useEffect(() => {
  //   setSelectedImage(imageArray[0]?.s3Url);
  // }, [imageArray]);
  const handleRequest = () => {
    navigate(`/request/${webpageId}`, {
      state: {
        vehicleId,
        s3url: selectedImage, // Pass the image URL along with the state
      }, // Pass state along with the route
    });
  };
  return (
    <div className="container mx-auto px-4 ">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 pt-10"
      >
        <Icons.FiArrowLeft />
        <Text
          textColor="text-darkBlue"
          textSize="text-base"
          fontWeight="font-medium"
          content={"Back"}
        />
      </div>
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Main Image */}
          <div className="col-span-3 w-full">
            <img
              src={selectedImage}
              alt="Car Image"
              className=" w-full h-[630px] object-cover shadow-lg rounded  transition-all duration-500 ease-in-out transform "
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid  grid-cols-2 gap-2 w-full  col-span-2 ">
            {imageArray?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img.s3Url)}
                className="focus:outline-none "
              >
                <img
                  src={img.s3Url}
                  alt="Thumbnail"
                  className="w-full rounded-lg shadow-md object-cover h-full"
                />
              </button>
            ))}
            {/* Overlay for more images */}
          </div>
        </div>
      </div>
      <div
        // onClick={handleNavigate}
        className="grid md:grid-cols-5 gap-6 items-start py-8"
      >
        {/* Car Details */}
        <div className="px-4 col-span-3">
          <MainHeading
            heading={vehicleArray?.make + " " + vehicleArray?.model}
            textColor="darkBlue"
            fontFamily="Poppins"
            textSize="text-[40px]"
            className="font-semibold"
          />
          {/* <h2 className="text-xl font-bold">BMW X5M Competition Steptronic</h2> */}
          <div className="flex flex-wrap items-center gap-2">
            {vehicleArray?.optionalEquipment?.additionalFeature?.map(
              (feature, index) => (
                <Text
                  key={index}
                  textColor="text-grayText"
                  textSize="text-base"
                  fontWeight="font-medium"
                  className="inline-block"
                  content={`${feature} /`}
                />
              )
            )}
            <Text
              textColor="text-grayText"
              textSize="text-base"
              fontWeight="font-medium"
              className="inline-block"
              content={vehicleArray?.condition?.warranty}
            />
          </div>

          <div className="pt-10 pb-5">
            <Text
              textColor="text-darkBlue"
              textSize="text-[36px]"
              fontWeight="font-semibold"
              content={"Fahrzeug informationen"}
            />
          </div>
          <div className=" grid grid-cols-2 max-w-2xl">
            <div className="flex  items-center gap-1">
              <Icons.FaCalendar />
              <p>
                {" "}
                {new Date(vehicleArray?.firstRegistration).toLocaleDateString()}
              </p>
            </div>
            <div className="flex  items-center gap-1">
              <img src={Images.gas} className="w-4 h-4" />
              <p>{vehicleArray?.fuel?.replace(/_/g, " ")}</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 max-w-2xl">
            <div className="flex  items-center gap-1">
              <Icons.BiSolidTachometer size={20} />
              <p>{vehicleArray?.condition?.kilometer}</p>
            </div>
            <div className="flex  items-center gap-1">
              <Icons.HiSignal size={20} />
              <p>{vehicleArray?.psKw}</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 max-w-2xl">
            <div className="flex  items-center gap-1">
              <Icons.GiGearStickPattern size={20} />
              <p>{vehicleArray?.noOfGears}</p>
            </div>
            <div className="flex  items-center gap-1">
              <Icons.FaGasPump size={20} />
              <p>{vehicleArray?.consumption_L_100km} / 100 Km</p>
            </div>
            {/* <p className="text-primary font-medium flex items-center gap-1 mt-2">
              <Icons.GoArrowDown />
              View all vehicle data
            </p> */}
          </div>

          <div className="pt-5 pb-3 space-y-5">
            <Text
              textColor="text-darkBlue"
              textSize="text-4xl"
              fontWeight="font-semibold"
              content={"Ausstattungen"}
            />
            <Text
              textColor="text-darkBlue"
              textSize="text-lg"
              fontWeight="font-semibold"
              content={"Optionale Ausstattung"}
            />
            <ul className="list-disc pl-4 list-inside text-base text-grayText">
              {vehicleArray?.optionalEquipment?.additionalFeature?.map(
                (feature, index) => (
                  <li key={index}>{feature}</li>
                )
              )}
            </ul>
            <Text
              textColor="text-darkBlue"
              textSize="text-lg"
              fontWeight="font-semibold"
              content={"Standart Ausstattung"}
            />
            <ul className="list-disc pl-4 list-inside text-base text-grayText">
              {/* {vehicleArray?.standardEquipment?.map((feature, index) => ( */}
              <li>{vehicleArray?.standardEquipment}</li>
              {/* ))} */}
            </ul>
            {/* <p className="text-primary font-medium flex items-center gap-1 ">
              <Icons.GoArrowDown />
              View all vehicle data
            </p> */}
            <Text
              textColor="text-darkBlue"
              textSize="text-lg"
              fontWeight="font-semibold"
              content={"Motorfahrzeugkontrolle (MFK)"}
            />
            <div className="mt-2 grid grid-cols-2 max-w-xl">
              <p className="text-darkBlue font-medium">Ab MFK</p>

              <p className="text-grayText">
                {vehicleArray?.condition?.abMFK ? "Yes" : "No"}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-2 max-w-xl">
              <p className="text-darkBlue font-medium">Letzte MFK</p>

              <p className="text-grayText">
                {formatDateByMonth(vehicleArray?.condition?.lastMFK)}
              </p>
            </div>
            <Text
              textColor="text-darkBlue"
              textSize="text-lg"
              fontWeight="font-semibold"
              content={"Garantie und Rückgabe"}
            />
            <div className="mt-2 grid grid-cols-2 max-w-xl">
              <p className="text-darkBlue font-medium">Unfallfahrzeug</p>

              <p className="text-grayText">
                {" "}
                {vehicleArray?.detailedData?.includes("accidentVehicle")
                  ? "Yes"
                  : "No"}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-2 max-w-xl">
              <p className="text-darkBlue font-medium">Garantie</p>

              <p className="text-grayText">
                {vehicleArray?.condition?.warranty ? "Yes" : "No"}
              </p>
            </div>
            {/* <Text
              textColor="text-grayText"
              textSize="text-base"
              fontWeight="font-normal"
              content={"From handover, 12 months or 20,000 km"}
            /> */}
          </div>
          {/* <Text
            textColor="text-darkBlue"
            textSize="text-lg"
            fontWeight="font-semibold"
            content={"Fahrzeugbeschreibung"}
          />
          <Text
            textColor="text-darkblue"
            textSize="text-base"
            fontWeight="font-normal"
            content={"Viewing by appointment only!"}
            className="mt-2 mb-4"
          />
          <Text
            textColor="text-grayText"
            textSize="text-base"
            fontWeight="font-normal"
            content={
              "2. Hand-Fahrzeug, CH-Auslieferung, inkl. 12 Monate Garantie, ab MFK 02.2024, NP Fr. 151'772.-"
            }
            className="mt-2 mb-4"
          /> */}
        </div>
        <div className="flex  flex-col  h-full col-span-2">
          <Text
            textColor="text-primary"
            textSize="text-[48px]"
            fontWeight="font-semibold"
            content={`${vehicleArray?.price?.sellingPrice_CHF} CHF`}
          />
          <div className="flex flex-col gap-3 text-primary  font-semibold">
            <Link className="underline">Kreditrate Berechnen</Link>
            <Link className="underline">Versicherung Berechnen</Link>
          </div>
          <div className="py-8 space-y-4">
            <Button
              type="submit"
              text="Request"
              className="w-full"
              borderRadius="rounded-[100px]"
              textColor="white"
              icon={<Icons.BsFillSendFill />}
              onClick={handleRequest}
            />
            <Button
              type="submit"
              text={data?.webpage?.contactInformation?.phoneNumber}
              className="w-full"
              borderRadius="rounded-[100px]"
              textColor="primary"
              bgColor="white"
              borderColor="primary"
              icon={<Icons.FaPhoneAlt />}
            />
          </div>
          {/* <div className="flex items-center gap-4 mt-4 px-4">
            <img src={Images.scan} />
            <Icons.FaShareAlt className="w-5 h-5" />
            <Icons.FaRegStar className="w-5 h-5" />
            <Icons.FaRegHeart className="w-5 h-5" />
          </div>
          <img
            src={Images.mercedesLogo}
            className="w-36 h-24 object-cover mb-16"
          /> */}
        </div>
      </div>
      <div className="mapSection px-4 grid grid-cols-3 items-start pb-20">
        <div>
          <Text
            textColor="text-darkBlue"
            textSize="text-lg"
            fontWeight="font-semibold"
            content={"Anbieter"}
          />
          <Text
            textColor="text-darkblue"
            textSize="text-base"
            fontWeight="font-normal"
            content={data?.webpage?.siteTitle}
            className="mt-2 mb-2"
          />
          <Text
            textColor="text-grayText"
            textSize="text-base"
            fontWeight="font-normal"
            content={data?.webpage?.tagline}
            className=" mb-4"
          />

          <div className="flex  items-center gap-1 font-medium text-darkBlue">
            <Icons.GrLocation />
            <p>Address:</p>
            <p className="text-grayText"> {vehicleArray?.location}</p>
          </div>
          <div className="flex  items-center gap-1 font-medium text-darkBlue mt-2">
            <Icons.FaPhoneAlt />
            <p>Business Phone:</p>
            <p className="text-grayText">
              {data?.webpage?.contactInformation?.phoneNumber}
            </p>
          </div>
        </div>
        <div className="col-span-2 ">
          <GoogleMap radius={"rounded-md"} height={"360"} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailComponent;
