import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";
import Images from "../../../assets/images";
import "./styles.css"; // Ensure your custom CSS is imported
import { useTranslation } from "react-i18next";

export default function WorkSoftware() {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  

  return (
    <div className="bg-darkBlue py-10">
      <div className="flex flex-col items-center justify-center my-3">
        <MainHeading heading={t("homePage.WorkSoftWare.heading")} className="max-sm:text-2xl" />
        <div className="sm:-mt-3 mt-1">
          <Text
            content={t("homePage.WorkSoftWare.content")}
            textColor="text-white"
            className="max-sm:text-sm "
          />
        </div>
      </div>
      <Slider {...settings} className="overflow-x-hidden overflow-y-hidden ">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-[350px] flex items-center justify-center outline-none "
          >
            <img
              src={Images.dashboard}
              alt={`Slide ${index + 1}`}
              className="h-full w-full px-3 rounded-3xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
