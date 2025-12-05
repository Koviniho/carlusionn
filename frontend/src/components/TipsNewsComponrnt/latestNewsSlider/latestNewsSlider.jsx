import React, { useState } from "react";
import Slider from "react-slick";
import Text from "../../Heading/text";
import Images from "../../../assets/images";
import "./styles.css";
import {
  FaFacebookF,
  FaGoogle,
  FaHeart,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MainHeading from "../../Heading/mainHeading";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function LatestNewsSlider() {
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
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    // autoplay: true,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setActiveSlide(next), // Update active slide index
  };

  return (
    <div className="container mx-auto py-14">
      <div className="flex flex-col items-center justify-center mb-12">
        <MainHeading
          heading={t("tipsAndNews.latestNews.heading")}
          textColor="darkBlue"
        />
        <Text content={t("tipsAndNews.latestNews.content")} />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {Array.from({ length: 5 }).map((_, index) => (
          <NewsCard key={index} active={index === activeSlide} />
        ))}
      </Slider>
      {/* Navigation Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
      <button onClick={handlePrevClick} className="!w-10 h-10 border bg-white hover:bg-darkBlue text-lg text-black hover:text-white  rounded flex items-center justify-center  transition">
          {"<"}
          </button>
          <button onClick={handleNextClick} className="!w-10 h-10 border bg-white hover:bg-darkBlue text-lg text-black hover:text-white  rounded flex items-center justify-center  transition">
            {">"}
          </button>
      </div>
    </div>
  );
}

export default LatestNewsSlider;

function NewsCard({ active }) {
  const navigate = useNavigate();
  return (
    <div
      className={`mx-5 rounded-[20px] overflow-hidden mb-5 cursor-pointer  ${
        active ? "bg-white shadow-lg" : ""
      }`}
      onClick={() => {
        navigate("/tips-news/98989");
      }}
    >
      <img
        className="w-full h-[300px] object-cover"
        src={Images.cardCar} // Replace with your image URL
        alt="Car"
      />

      {/* Profile Image */}
      <img
        src={Images.profile} // Replace with profile image URL
        alt="Profile"
        className="w-24 h-24 rounded-full border border-secondary relative -mt-10 ml-5"
      />

      {/* Content Section */}
      <div className="px-6 py-4">
        <div className="flex gap-5 items-center mb-4">
          <p className="text-lg text-grayText text-[18px]">
            Post by <span className="text-black">Thomas Neil</span>
          </p>
          <span className="inline-block px-5 py-2 bg-darkBlue text-white font-medium rounded-md ">
            Driving
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-medium ${active ? "text-secondary":"text-darkBlue"}  flex items-start gap-3`}>
          <span className="inline-block w-5 h-1 bg-secondary mr-2 mt-3"></span>{" "}
          {/* Dash */}
          Self-Driving legislation sets in the motion
        </h3>

        {/* Description */}
        <p className=" text-grayText pl-10 mt-1">
          Many tire manufacturers are now producing eco-friendly tires made from
          sustainable materials.
        </p>
      </div>

      {/* Footer Section */}
      {active ? (
        <div className="border-t py-5 px-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-grayText">
            <p className="text-grayText">Share</p>
            <FaFacebookF />
            <FaGoogle />
            <FaTwitter />
            <FaPinterestP />
          </div>
          <div className="flex items-center gap-3 text-grayText">
            <FaHeart />
            <p>205</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-start py-5">
          <span className="text-grayText text-2xl">•••</span> {/* Three Dots */}
        </div>
      )}
    </div>
  );
}
