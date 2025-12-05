import React from "react";
import PricingCard from "../PricingCard";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function PricingSection() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language
  const pricingPlans = t("pricing.ourPricing.pricingPlans", {
    returnObjects: true,
  });

  return (
    <div className="mx-auto container flex flex-col items-center justify-center my-20">
      <MainHeading
        textColor="primary"
        heading={t("pricing.ourPricing.heading")}
      />
      <Text textSize="text-[20px]" content={t("pricing.ourPricing.content")} />
      <div className="flex items-stretch gap-14">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            bgColor={plan.bgColor}
            planName={plan.planName}
            price={plan.price}
            description={plan.description}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
