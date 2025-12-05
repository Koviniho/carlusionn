import React from "react";
import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";
import MainHeading from "../../components/Heading/mainHeading";
import Text from "../../components/Heading/text";
import Reviews from "../../components/ReviePageComponent/reviews";
import CustomerFeedback from "../../components/FeedBackSection";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function ReviewPage() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <PagesLayout>
      <HeroSection
        heading={t("reviews.heading")}
        content={t("reviews.content")}
      />
      <CustomerFeedback />
      <Reviews />
    </PagesLayout>
  );
}

export default ReviewPage;
