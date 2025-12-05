/* eslint-disable react/prop-types */

import Images from "../../assets/images";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";

function HeroSection({ heading, content, backgroundImage }) {
  return (
    <div
      className="relative bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url( ${
          backgroundImage ? backgroundImage : Images.heroBackground
        })`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text content */}
      <div className="relative z-10 text-center px-4 sm:px-8 md:px-12">
        <MainHeading heading={heading} />

        {/* Adjust text size for responsiveness */}
        <Text
          content={content}
          fontWeight="font-medium"
          textColor="text-white"
          textSize="text-sm sm:text-base md:text-lg lg:text-xl"
        />
      </div>
    </div>
  );
}

export default HeroSection;
