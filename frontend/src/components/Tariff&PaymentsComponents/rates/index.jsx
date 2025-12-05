import { useTranslation } from "react-i18next";
import MainHeading from "../../Heading/mainHeading";
import PricingCard from "../../PricingCard";
import { useState } from "react";
import CustomInput from "../../Input/custoInput";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../../Button";

const Rates = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const { t, i18n } = useTranslation();
  const pricingPlans = t("pricing.ourPricing.tarrifPlan", {
    returnObjects: true,
  });

  return (
    <div className="space-y-5">
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading="Your Current Tariff"
      />
      <section className="flex gap-4 flex-wrap">
        <button
          className={` px-8 py-2 rounded-lg ${
            activeTab === "monthly" ? "bg-primary text-white" : "bg-[#e7e7e7]"
          }  `}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly
        </button>
        <button
          className={` px-8 py-2 rounded-lg ${
            activeTab === "yearly" ? "bg-primary text-white" : "bg-[#e7e7e7]"
          }  `}
          onClick={() => setActiveTab("yearly")}
        >
          Yearly
        </button>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            bgColor={plan.bgColor}
            planName={plan.planName}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            borderRadius={plan.borderRadius}
            btnText={plan.btnText}
          />
        ))}
      </div>
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading="Add-on packages"
      />
      <section className="space-y-8">
        <div className="flex items-center gap-2 border border-[#E0E0E0] px-3 py-1 rounded-lg w-full">
          <IoSearchOutline className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for packages"
            className="pr-4 py-2 rounded-lg outline-none w-full"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
          <AllPackages label="Accounting" price="100 CHF" />
          <AllPackages label="Calendar" price="100 CHF" />
          <AllPackages label="Interfaces" price="100 CHF" />
          <AllPackages label="Tire warehouse" price="100 CHF" />
          <AllPackages label="Print customer phone number" price="100 CHF" />
          <AllPackages label="Print Sender" price="100 CHF" />
          <AllPackages label="Print tire storage location" price="100 CHF" />
          <AllPackages label="Show the amount already paid" price="100 CHF" />
        </div>
      </section>

      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-semibold"
        heading="Your tariff at Carlusion"
      />
      <section className="space-y-3">
        <Calculation label="Package Name" price="Standard" />
        <Calculation label="Package Price" price="89.90 CHF" />
        <hr className="max-w-[300px]" />
        <Calculation label="Monthly Price" price="21.90 CHF" />
      </section>

      <section className="space-y-2">
        <Button
          type="submit"
          text="Update"
          textColor="white"
          className=" px-20"
          fontSize="text-xl"
          borderRadius="rounded-lg"
        />
        <p className="text-xs sm:text-sm text-darkBlue">
          * Prices excluding taxes
        </p>
      </section>

      <section>
        <Button
          bgColor="transparent"
          type="submit"
          text="Cancel Plan"
          textColor="error"
          className="px-0"
          fontSize="text-xl"
          borderRadius="rounded-lg"
        />
      </section>
    </div>
  );
};

export default Rates;

const AllPackages = ({ label, price }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomInput type="checkbox" label={label} />
      <p className="text-sm sm:text-base text-darkBlue font-[400]">{price}</p>
    </div>
  );
};
const Calculation = ({ label, price }) => {
  return (
    <div className="flex justify-between max-w-[300px]">
      <p className="text-sm sm:text-base font-semibold text-darkBlue">
        {label}:
      </p>
      <p className="text-sm sm:text-base text-primary">{price}</p>
    </div>
  );
};
