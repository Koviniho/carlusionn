import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import Images from "../../assets/images";
import FeatureCard from "../FeatureCard";
import Button from "../Button";
import { useTranslation } from "react-i18next";

function AboutSection() {
  const { t } = useTranslation();
  const featureCards = t("homePage.aboutCarlusion.featureCards", {
    returnObjects: true,
  });

  return (
    <div className="container mx-auto grid grid-cols-6 items-center lg:gap-14 gap-8 my-5 px-4">
      <div className="lg:col-span-3 col-span-6">
        <MainHeading
          heading={t("homePage.aboutCarlusion.heading")}
          textColor="darkBlue"
          className="max-sm:text-2xl"
        />
        <Text content={t("homePage.aboutCarlusion.content")}  className="max-sm:text-sm" />
        <div className="sm:pt-10 pt-4 sm:pb-4 ">
          <Text
            textColor="text-darkBlue"
            fontWeight="font-semibold"
             className="max-sm:text-sm"
            content={t("homePage.aboutCarlusion.subHeading")}
          />
          {/* <Text content={t("homePage.aboutCarlusion.subContent")} /> */}
        </div>
        <Text
          className="sm:my-4 my-2 max-sm:text-sm"
          content={t("homePage.aboutCarlusion.descriptionOne")}
        />
        <Text content={t("homePage.aboutCarlusion.descriptionTwo")}  className="max-sm:text-sm" />
        <div className="flex gap-5 my-5">
          <Button
            text={t("homePage.aboutCarlusion.ourPartners")}
            bgColor="darkBlue"
            textColor="white"
             className="max-sm:text-xs"
          />
          <Button
            text={t("homePage.aboutCarlusion.LearnMore")}
            bgColor="primary"
            textColor="white"
             className="max-sm:text-xs"
          />
        </div>
      </div>
      <img
        src={Images.horizontalCar}
        alt="horizontalCar"
        className="sm:h-full h-[70%] lg:col-span-1 col-span-2 "
        // style={{ height: " " }}
      />

      <div className="flex flex-col gap-5 my-5  w-full lg:col-span-2 col-span-4 ">
        {featureCards.map((card, index) => (
          <FeatureCard
            key={index}
            img={Images[card.img]} // Dynamically fetch image from Images
            heading={card.heading}
            content={card.content}
            height={"h-12"}
            width={"w-12"}
          />
        ))}
      </div>
    </div>
  );
}

export default AboutSection;
