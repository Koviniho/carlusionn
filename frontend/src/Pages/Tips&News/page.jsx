import React from "react";
import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";
import CarActionCards from "../../components/CarActionCard";
import LatestNewsSlider from "../../components/TipsNewsComponrnt/latestNewsSlider/latestNewsSlider";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function TipsAndNews() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <PagesLayout>
      <HeroSection
        heading={t("tipsAndNews.heading")}
        content={t("tipsAndNews.content")}
      />
      <LatestNewsSlider />
      <CarActionCards />
    </PagesLayout>
  );
}

export default TipsAndNews;
