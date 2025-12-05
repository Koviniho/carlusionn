
import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next
import CarSlider from "../../components/CarDetailsComponent/CarSlider";
import Text from "../../components/Heading/text";
import MainHeading from "../../components/Heading/mainHeading";
import RecentView from "../../components/CarDetailsComponent/RecentView";
// import Text from "../../components/Heading/text";

export default function CarDetailsPage() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language
  const carDetails = [
    { label: "BODY", value: "SEDAN" },
    { label: "YEAR", value: "2016" },
    { label: "MILEAGE", value: "20,300ML" },
    { label: "ENGINE", value: "5.7L V8" },
    { label: "TRANSMISSION", value: "AUTO 8-SPEED" },
    { label: "FUEL", value: "SEDAN" },
    { label: "COLORS", value: "2016" },
    { label: "DRIVE TRAIN", value: "20,300ML" },
    { label: "STOCK#", value: "5.7L V8" },
    { label: "TRANSMISSION", value: "AUTO 8-SPEED" },
  ];
  return (
    <PagesLayout>
      <HeroSection
        heading={t("carDetailsPage.heading")}
        content={t("carDetailsPage.content")}
      />

      <div className="container mx-auto flex items-center gap-14 mt-20">
        <div className="w-10/12 mx-auto flex gap-5">
          {" "}
          <div className="w-8/12 ">
            <CarSlider />
            <div>
              <div className="flex items-center gap-4 mt-10">
                <p className="bg-secondary border border-secondary h-1 w-1/12"></p>
                <MainHeading
                  heading={t("carDetailsPage.carDetails.name")}
                  textColor="darkBlue"
                />
              </div>
             
            </div>
          </div>
          <div className="w-4/12    rounded-md  ">
            {/* Price Section */}
            <div className="bg-darkBlue text-white p-3 rounded-md text-center gap-3 flex  justify-center items-center">
              <h2 className="text-4xl font-medium">$45,000</h2>
              <p className="text-xl ">MSRP $27,000</p>
            </div>

            {/* Details Section */}
            <div className=" px-4 py-3 bg-gray-100 mt-5 rounded-md">
              {carDetails.map((detail, index) => (
                <div
                  className={`grid grid-cols-3 gap-2 text-lg p-1 ${
                    index !== carDetails.length - 1 ? "border-b" : ""
                  }`}
                  key={index}
                >
                  <Text content={detail.label}  />
                  <Text
                    content={detail.value}
                    textColor="text-darkBlue"
                    fontWeight="font-medium"
                    textSize="text-normal"
                    className=" ml-20 col-span-2"
                  />
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
      </div>
      <div className="space-y-3 w-10/12 mx-auto ">
                <Text content={t("carDetailsPage.carDetails.descriptionOne")} />
                <Text content={t("carDetailsPage.carDetails.descriptionTwo")} />
              </div>
      <RecentView />
      {/* <DetailsCard />
        <p className="bg-secondary border border-secondary w-1/12"></p>

      <RecentPost /> */}
    </PagesLayout>
  );
}
