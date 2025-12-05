/* eslint-disable react/prop-types */

import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import Button from "../Button";

function ImageContentCard({
  img,
  heading,
  content,
  points = [],
  buttonText,
  buttonTextBg,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-8   container mx-auto px-4 my-10">
      {/* Image Section */}
      <div className="flex-shrink-0 w-full lg:w-5/12 ">
        <img src={img} alt={heading} className="h-[500px] object-cover rounded-lg  " />
        {/* object-cover */}
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full ">
        <MainHeading heading={heading} textColor="darkBlue" className="max-sm:text-2xl" />

        <Text content={content} className="max-sm:text-sm"  />

        <ul className="list-disc pl-5 text-grayText space-y-1 mt-6 sm:text-lg text-sm">
          {points?.map((point, index) => (
            <li key={index} className="pl-1">
             <span className=" font-bold"> {point.pointHeading} </span> - {point.pointContent}
            </li>
          ))}
        </ul>

        <div className="sm:mt-16 mt-4">
          <Button text={buttonText} bgColor={buttonTextBg} textColor="white"  />
        </div>
      </div>
    </div>
  );
}

export default ImageContentCard;
