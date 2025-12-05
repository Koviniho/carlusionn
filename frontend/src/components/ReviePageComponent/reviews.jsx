import React from "react";
import ReviewCard from "./reviewCard";
import Images from "../../assets/images";
import Text from "../Heading/text";
import Button from "../Button";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function Reviews() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  // heading={t("pricing.heading")}

  return (
    <div className="container mx-auto px-4">
      <div className={`flex items-start gap-5 `}>
        <p className="rounded-full bg-darkBlue text-white px-5 py-1   flex items-center justify-center text-[36px] ">
          U
        </p>
        <div className="flex flex-col  w-full space-y-5">
          <textarea
            placeholder="Write a comment..."
            rows="6"
            // cols="4"
            className="rounded-md p-5 border focus:outline-none"
          />
          <div className="flex items-center gap-3 pb-10">
            <Button text={t("reviews.post")} bgColor="primary" textColor="white" />
          </div>
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <ReviewCard
          key={index}
          className="border-b border-gray-300 last:border-none pb-5 mb-5"
        />
      ))}
    </div>
  );
}

export default Reviews;
