import React from "react";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";
import Images from "../../../assets/images";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function RecentView() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  const cardData = [
    {
      imageSrc: Images.car, // Replace with actual image URL
      title: "2018 Chevrolet Camaro ZL1 1LE: Review",
      date: "August 22, 2017",
    },
    {
      imageSrc: Images.car, // Replace with actual image URL
      title: "2018 Chevrolet Camaro ZL1 1LE: Review",
      date: "August 22, 2017",
    },
    {
      imageSrc: Images.car, // Replace with actual image URL
      title: "2018 Chevrolet Camaro ZL1 1LE: Review",
      date: "August 22, 2017",
    },
    {
      imageSrc: Images.car, // Replace with actual image URL
      title: "2018 Chevrolet Camaro ZL1 1LE: Review",
      date: "August 22, 2017",
    },
  ];
  return (
    <div className="container mx-auto flex items-center gap-14 my-20">
      <div className="w-10/12 mx-auto  gap-5">
        <div className="  w-full ">
          <MainHeading
            heading={t("carDetailsPage.recentViewed.heading")}
            textColor="darkBlue"
            className="text-center   w-full"
          />
          {/* <Text
            content={t("carDetailsPage.recentViewed.content")}
            className="w-full justify-center "
          /> */}
        </div>
        <div className="grid grid-cols-2 items-center gap-5 mt-10">
          {cardData?.map((item, index) => (
            <div key={index}>
            <Card
              imageSrc={item.imageSrc}
              title={item.title}
              date={item.date}
            />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentView;

function Card({ imageSrc, title, date }) {
  return (
    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <img
        src={imageSrc}
        alt="Card Image"
        className="w-24 h-24 object-cover rounded-md mr-4"
      />

      {/* Content Section */}
      <div className="space-y-4">
        {/* Title */}
        {/* <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2> */}

        <Text content={title} textColor="text-darkBlue" fontWeight="font-semibold" />

        {/* Date */}
        <p className="text-sm  text-darkBlue">
          <span className="font-medium  text-grayText">On </span>
          {date}
        </p>
      </div>
    </div>
  );
}
