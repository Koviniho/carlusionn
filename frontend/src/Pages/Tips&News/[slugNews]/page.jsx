import React from "react";
import PagesLayout from "../../../layout/PagesLayout";
import HeroSection from "../../../components/HeroSection";
import DetailsCard from "../../../components/TipsNewsComponrnt/daynamicNewsComponent/detailsCard";
import RecentPost from "../../../components/TipsNewsComponrnt/daynamicNewsComponent/recentPost";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next
import RecentView from "../../../components/CarDetailsComponent/RecentView";

function DaynamicNews() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <PagesLayout>
      <HeroSection
        heading={t("tipsAndNewDetailPage.heading")}
        content={t("tipsAndNewDetailPage.content")}
      />
      <DetailsCard />
      {/* <RecentPost /> */}
      <RecentView />
    </PagesLayout>
  );
}

export default DaynamicNews;
