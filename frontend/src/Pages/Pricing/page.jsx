import React from "react";
import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";

import PricingSection from "../../components/PricingPageComponent/PricingSection";
import PricingTable from "../../components/PricingPageComponent/pricingTabel";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function PricingPage() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <PagesLayout>
      <HeroSection
        heading={t("pricing.heading")}
        content={t("pricing.content")}
      />
      <PricingSection />
      <PricingTable />
    </PagesLayout>
  );
}

export default PricingPage;
