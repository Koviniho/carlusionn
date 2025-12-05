/* eslint-disable no-unused-vars */
import React from "react";
import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";
import AboutSection from "../../components/AboutPageComponent/AboutSection";
import ImageContentCard from "../../components/ImageContentCard";
import Images from "../../assets/images";
import MeetTheTeam from "../../components/AboutPageComponent/MeetTheTeam";
import CarActionCards from "../../components/CarActionCard";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function AboutUsPage() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language
  const points = t("aboutUs.ImageContentCard.pointsArray", {
    returnObjects: true,
  });
  return (
    <PagesLayout>
      <HeroSection
        heading={t("aboutUs.heading")}
        content={t("aboutUs.content")}
      />
      <AboutSection />
      <ImageContentCard
        img={Images.cardCar}
        heading={t("aboutUs.ImageContentCard.heading")}
        content={t("aboutUs.ImageContentCard.content")}
        points={points}
        buttonText={t("aboutUs.ImageContentCard.learnMore")}
        buttonTextBg="primary"
      />
      <MeetTheTeam />
      <CarActionCards />
    </PagesLayout>
  );
}

export default AboutUsPage;
