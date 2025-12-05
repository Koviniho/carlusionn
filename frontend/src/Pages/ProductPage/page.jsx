
import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";

import FeatueSection from "../../components/ProductPageComponent/featueSection";
import CarActionCards from "../../components/CarActionCard";
import DetailsPresentationCard from "../../components/ProductPageComponent/detailsPresentationCard";
import CustomerFeedback from "../../components/FeedBackSection";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function ProductPage() {
  const { t } = useTranslation(); // Use i18n to manage language

  return (
    <PagesLayout>
      <HeroSection
        heading={t("product.heading")}
        content={t("product.content")}
      />
      <FeatueSection />
      <CustomerFeedback />
      <DetailsPresentationCard />
      <CarActionCards />
    </PagesLayout>
  );
}

export default ProductPage;
