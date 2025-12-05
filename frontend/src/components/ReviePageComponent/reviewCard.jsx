import React from "react";
import Text from "../Heading/text";
import Images from "../../assets/images";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function ReviewCard({ content, likes, className }) {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <div className={`flex items-start gap-5 ${className}`}>
      <p className="rounded-full bg-darkBlue text-white px-5 py-1   flex items-center justify-center text-[36px] ">
        S
      </p>
      <div className="flex flex-col ">
        <h2 className="text-darkBlue text-[24px] font-medium">Samii William</h2>
        <Text content="I recently used AutoInsight Reviews, and I must say, it's one of the best platforms for anyone looking to buy a new car or just keep up with the latest in the automotive world. The website's layout is intuitive, making it easy to search and compare different car models The website's layout is intuitive, making it easy to search and compare different car modelsThe website's layout is intuitive, making it easy to search and compare different car models" />
        <div className="flex items-center gap-3 text-darkBlue">
          <p className="font-medium  italic cursor-pointer">
            {t("reviews.reply")} .
          </p>
          <p className="font-medium  italic cursor-pointer">
            {t("reviews.share")} .
          </p>
          <p className="font-medium  italic cursor-pointer">
            100 {t("reviews.like")}{" "}
          </p>
          <img src={Images.like} alt="like icon" className="cursor-pointer" />
          <img
            src={Images.disLike}
            alt="dis-like icon"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
