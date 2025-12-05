import React, { useState } from "react";
import Slider from "react-slick";
import Images from "../../../assets/images";
import Text from "../../Heading/text";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function DetailsCard() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  const sliderRef = React.useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Custom click handlers
  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "0px",
    // autoplay: true,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setActiveSlide(next), // Update active slide index
  };

  return (
    <div className="container mx-auto my-16 px-4">
      <div className="flex items-start gap-10">
        <div className="flex flex-col w-6/12 relative ">
          <Slider ref={sliderRef} {...settings}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex flex-col" key={index}>
                <img
                  src={Images.Rectangle}
                  alt="detail card"
                  className=" object-cover h-[400px] w-full rounded-[20px]"
                />
                <div className="flex items-center justify-between py-10 border-b border-gary ">
                  <p className="text-grayText text-[18px]">
                    Post by <span className="text-darkBlue">Thomas Neil</span>{" "}
                    on
                    <span className="text-darkBlue">August 22, 2017</span>
                  </p>
                  <p className="bg-darkBlue text-white rounded-md px-2 py-1">
                    Ford News
                  </p>
                  <div className="flex items-center text-grayText gap-4">
                    <div className="flex items-center gap-1">
                      <FaHeart />
                      <p>240</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegComment />
                      <p>Comments</p>
                      <p className="text-darkBlue">180</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex px-5 h-full items-center justify-between  space-x-4 absolute bottom-12 w-full ">
            <MdKeyboardArrowRight
              className="rotate-180  cursor-pointer bg-gray-400 rounded"
              size={40}
              onClick={handleNextClick}
              color="black"
            />
            <MdKeyboardArrowRight
              onClick={handleNextClick}
              size={40}
              className=" cursor-pointer bg-gray-400 rounded"
              color="black"
            />
          </div>
        </div>

        <div className="flex flex-col w-6/12 space-y-5">
          <h3 className="text-darkBlue text-[48px] font-semibold font-bebas-neue">
            {t("tipsAndNewDetailPage.detailsCard.heading")}
          </h3>
          <Text content={t("tipsAndNewDetailPage.detailsCard.contentOne")} />

          <Text content={t("tipsAndNewDetailPage.detailsCard.contentTwo")} />

          <Text content={t("tipsAndNewDetailPage.detailsCard.coutentThree")} />
        </div>
      </div>
      <div className="space-y-3 py-5">
        <Text content={t("tipsAndNewDetailPage.detailsCard.contentFour")} />{" "}
        <Text content={t("tipsAndNewDetailPage.detailsCard.contentFive")} />
      </div>
    </div>
  );
}

export default DetailsCard;
