
import Images from "../../assets/images";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function HomeHeroSection() {
  const { t } = useTranslation();

  return (
    <div className="xl:container mx-auto grid lg:grid-cols-2 grid-cols-1 py-20 bg-[#19DB8C08] px-4">
      <div>
        <MainHeading
          heading={t("homePage.heroSection.heading")}
          textColor="darkBlue"
          textSize="text-[96px]"
          className="leading-[120px] max-sm:text-4xl"
        />
        <Text
          content={t("homePage.heroSection.content")}
          textSize="text-[20px]"
          className="max-sm:text-sm"
        />
        <div className="flex gap-10 my-10">
          <button className="text-primary border border-primary rounded-full px-5 py-3 sm:text-[18px] text-xs">
            {t("homePage.heroSection.LatestVehicle")}
          </button>
          <div className="text-primary rounded-full  flex items-center gap-2 sm:text-[18px] text-xs">
            <button className="rounded-full bg-white">
              <FaPlay
                className="    text-darkBlue   p-2 flex items-center text-xs justify-center"
                size={40}
              />
            </button>
            {t("homePage.heroSection.WatchVideo")}
          </div>
        </div>
      </div>
      <div>
        <img src={Images.homeHeroSection2} alt="home hero section car" />
      </div>
    </div>
  );
}

export default HomeHeroSection;
