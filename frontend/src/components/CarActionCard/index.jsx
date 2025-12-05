import Images from "../../assets/images";
import Text from "../Heading/text";
import { useTranslation } from "react-i18next";

function CarActionCards() {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col lg:flex-row gap-8 my-16"
      style={{
        backgroundImage: `url(${Images.actionCar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Card */}
      <div className="w-6/12 flex justify-end my-24">
        <div className="sm:w-8/12 max-sm:pl-4">
          <p className="text-white sm:text-2xl text-sm font-medium">
            {t("homePage.CarActionCards.areYouLooking")}
          </p>
          <h2 className="sm:text-[32px] text-sm sm:leading-8 text-white font-semibold">
            {t("homePage.CarActionCards.buyCar")}
          </h2>
          <Text
            className="my-5 max-sm:text-xs"
            textColor="text-white"
            content={t("homePage.CarActionCards.buyContent")}
          />
          <button className="border-2 border-white text-white py-2 px-6 rounded-full sm:text-base text-[10px] hover:bg-inherit hover:text-white transition my-8">
            {t("homePage.CarActionCards.buyButton")}
          </button>
        </div>
      </div>

      {/* Right Card with background image and clip-path */}
      <div
        className="flex-1 w-6/12 overflow-x-hidden text-white sm:p-8 max-sm:pl-8  right-0  flex flex-col justify-center absolute z-40 lg:h-[570px] md:h-[650px] sm:h-[750px] max-[400px]:h-[550px] h-[500px]  items-center sm:-mt-9  -mt-4"
        style={{
          backgroundImage: `url(${Images.blueBackgroundCar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 28% 100%)",
          // height: "calc(110% + 500px)", // Adjusting height as needed
        }}
      >
        <div className="sm:w-7/12 mx-auto max-sm:pl-8">
          <p className="text-white sm:text-2xl text-sm font-medium">
            {t("homePage.CarActionCards.DoYouWantTo")}
          </p>
          <h2 className="sm:text-[32px] text-xs sm:leading-8 text-white font-semibold">
            {t("homePage.CarActionCards.sellCar")}
          </h2>

          <Text
            className="my-5 max-sm:text-xs"
            textColor="text-white"
            content={t("homePage.CarActionCards.sellContent")}
          />
          <button className="border-2 border-white text-white py-2 px-6 rounded-full hover:bg-inherit hover:text-white transition my-8 sm:text-base text-[10px] ">
            {t("homePage.CarActionCards.sellButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarActionCards;
