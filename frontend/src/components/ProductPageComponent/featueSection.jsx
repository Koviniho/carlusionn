import { useState, useEffect } from "react";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import FeatureCard from "../FeatureCard";
import Images from "../../assets/images";
import { useTranslation } from "react-i18next";

const FeatureSection = () => {
  const { t } = useTranslation();
  const features = t("product.feature.featuresArray", { returnObjects: true });

  const [visibleFeatures, setVisibleFeatures] = useState(3);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const loadMore = () => {
    setVisibleFeatures((prev) => prev + 3);
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center py-10">
      <MainHeading heading={t("product.feature.heading")} textColor="primary" className="max-sm:text-2xl" />
      <Text content={t("product.feature.content")} />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-10">
        {(isSmallScreen ? features.slice(0, visibleFeatures) : features).map((feature, index) => (
          <FeatureCard
            key={index}
            img={Images[feature.img]}
            heading={feature.heading}
            content={feature.content}
          />
        ))}
      </div>

      {/* Show Load More button only on small screens and if more features are available */}
      {isSmallScreen && visibleFeatures < features.length && (
        <button
          onClick={loadMore}
          className="text-primary underline "
          >
           View More
        </button>
      )}
    </div>
  );
};

export default FeatureSection;
