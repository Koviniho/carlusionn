

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";
import Images from "../../../assets/images";
import "./styles.css"; // Ensure your custom CSS is imported
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function PackageSlider() {
  // const sliderRef = React.useRef(null); // Use a ref to control the slider
  const { t } = useTranslation();

  // Custom click handlers
  // const handlePrevClick = () => {
  //   sliderRef.current?.slickPrev();
  // };

  // const handleNextClick = () => {
  //   sliderRef.current?.slickNext();
  // };

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   centerMode: true,
  //   centerPadding: "0px",
  //   autoplay: true,
  //   slidesToScroll: 1,
  //   arrows: false,
  // };

  // Fetching the car data from translations
  // const carData = t("homePage.PackageSlider.slides", { returnObjects: true });

  return (
    <div className="py-10 overflow-hidden">
      <div className="flex flex-col items-center justify-center my-3">
        {/* <div className="flex items-center justify-between w-full"> */}
        {/* <div className="mx-auto pl-16"> */}
        <MainHeading
          heading={t("homePage.PackageSlider.heading")}
          textColor="darkBlue"
          className="max-sm:text-2xl"
        />
        {/* </div> */}
        {/* Navigation Buttons */}
        {/* <div className="flex justify-center  space-x-4 pr-4 ">
        
         <button  onClick={handlePrevClick} className="!w-10 h-10 border bg-darkBlue hover:bg-white text-lg text-white hover:text-darkBlue  rounded flex items-center justify-center  transition">
          {"<"}
          </button>
          <button   onClick={handleNextClick} className="!w-10 h-10 border bg-darkBlue hover:bg-white text-lg text-white hover:text-darkBlue  rounded flex items-center justify-center  transition">
            {">"}
          </button>
      </div> */}
        {/* </div> */}
        <div className="sm:-mt-3 ">
          <Text
            content={t("homePage.PackageSlider.content1")}
            className="max-sm:text-sm text-center"
          />
          <Text
            content={t("homePage.PackageSlider.content2")}
            className="text-center w-full justify-center max-sm:text-sm"
          />
        </div>
      </div>

      {/* Slider Layout */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        <Link to={`/car-details/1`}>
          <div className="sm:mx-5 mx-2 rounded-xl overflow-hidden sm:my-10">
            {/* Image Section */}
            <div className="relative">
              <img
                src={Images.basicStatic}
                alt={"title"}
                className="w-full h-[350px]  rounded-2xl"
              />
              <div className="absolute sm:left-7 left-0 top-24  text-white rounded px-3 py-2 sm:text-4xl text-2xl font-bebas-neue">
                BASIC
              </div>
              {/* Price Tag */}
              <div className="absolute bottom-7 sm:right-7 right-2  bg-primary text-white rounded px-3 py-2 sm:text-sm text-xs">
                $40000 <span className="text-xs">MSRP $20000</span>
              </div>
            </div>

            {/* Car Details Section */}
            <div className="bg-transparent">
              {/* <div className="flex text-grayText text-sm border rounded-md bg-white mt-4">
            <div className="p-2 w-full text-center">35000 km</div>
            <div className="border-x p-2 w-full text-center">
              Model: 2017
            </div>
            <div className="p-2 w-full text-center">Auto</div>
            <div className="border-l p-2 w-full text-center">320 ps</div>
          </div> */}

              {/* Car Title and Description */}
              <div className="mt-4">
                <h3 className="sm:text-[20px] font-semibold text-gray-800 flex items-center">
                  <span className="bg-primary h-1.5 w-6 mr-5"></span> BASIC
                </h3>
                <Text
                  content={
                    "Der Einstieg in die Welt der effizienten Autoverkäufe. Mit den wichtigsten Funktionen ausgestattet, um grundlegende Abläufe in Ihrer Garage zu optimieren. Perfekt für kleinere Unternehmen oder Einsteiger."
                  }
                  className="pt-3 max-sm:text-sm"
                />
              </div>
            </div>
          </div>
        </Link>
        <Link to={`/car-details/1`}>
          <div className="sm:mx-5 mx-2 rounded-xl overflow-hidden sm:my-10 my-4">
            {/* Image Section */}
            <div className="relative">
              <img
                src={Images.standardStatic}
                alt={"title"}
                className="w-full h-[350px]  rounded-2xl"
              />
              <div className="absolute sm:left-7 left-0 top-24  text-white rounded px-3 py-2 sm:text-4xl text-2xl font-bebas-neue">
                STANDARD
              </div>
              {/* Price Tag */}
              <div className="absolute bottom-7 sm:right-7 right-2 bg-secondary text-white rounded px-3 py-2 sm:text-sm text-xs">
                $40000 <span className="text-xs">MSRP $20000</span>
              </div>
            </div>

            {/* Car Details Section */}
            <div className="bg-transparent">
              {/* Car Specs */}
              {/* <div className="flex text-grayText text-sm border rounded-md bg-white mt-4">
            <div className="p-2 w-full text-center">35000 km</div>
            <div className="border-x p-2 w-full text-center">
              Model: 2017
            </div>
            <div className="p-2 w-full text-center">Auto</div>
            <div className="border-l p-2 w-full text-center">320 ps</div>
          </div> */}

              {/* Car Title and Description */}
              <div className="mt-4">
                <h3 className="sm:text-[20px] font-semibold text-gray-800 flex items-center">
                  <span className="bg-primary h-1.5 w-6 mr-5"></span> STANDARD
                </h3>
                <Text
                  content={
                    "Der Einstieg in die Welt der effizienten Autoverkäufe. Mit den wichtigsten Funktionen ausgestattet, um grundlegende Abläufe in Ihrer Garage zu optimieren. Perfekt für kleinere Unternehmen oder Einsteiger."
                  }
                  className="pt-3  max-sm:text-sm"
                />
              </div>
            </div>
          </div>
        </Link>
        <Link to={`/car-details/1`}>
          <div className="sm:mx-5 mx-2 rounded-xl overflow-hidden sm:my-10 my-4">
            {/* Image Section */}
            <div className="relative">
              <img
                src={Images.premiumStatic}
                alt={"title"}
                className="w-full h-[350px]  rounded-2xl"
              />
              <div className="absolute sm:left-7 left-0 top-24  text-white rounded px-3 py-2 sm:text-4xl text-2xl font-bebas-neue">
                PREMIUM
              </div>
              {/* Price Tag */}
              <div className="absolute bottom-7 sm:right-7 right-2 bg-darkBlue text-white rounded px-3 py-2 sm:text-sm text-xs">
                $40000 <span className="text-xs">MSRP $20000</span>
              </div>
            </div>

            {/* Car Details Section */}
            <div className="bg-transparent">
              {/* Car Specs */}
              {/* <div className="flex text-grayText text-sm border rounded-md bg-white mt-4">
            <div className="p-2 w-full text-center">35000 km</div>
            <div className="border-x p-2 w-full text-center">
              Model: 2017
            </div>
            <div className="p-2 w-full text-center">Auto</div>
            <div className="border-l p-2 w-full text-center">320 ps</div>
          </div> */}

              {/* Car Title and Description */}
              <div className="mt-4">
                <h3 className="sm:text-[20px] font-semibold text-gray-800 flex items-center">
                  <span className="bg-primary h-1.5 w-6 mr-5"></span> PREMIUM
                </h3>
                <Text
                  content={
                    "Der Einstieg in die Welt der effizienten Autoverkäufe. Mit den wichtigsten Funktionen ausgestattet, um grundlegende Abläufe in Ihrer Garage zu optimieren. Perfekt für kleinere Unternehmen oder Einsteiger."
                  }
                  className="pt-3  max-sm:text-sm"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
      {/* <Slider {...settings} ref={sliderRef}>
        {carData.map((car, index) => (
          <CarCard
            key={index}
            image={car.image}
            price={car.price}
            mileage={car.mileage}
            model={car.model}
            horsepower={car.horsepower}
            title={car.title}
            description={car.description}
          />
        ))}
      </Slider> */}

      {/* Navigation Buttons */}
      {/* <div className="flex justify-center mt-4 space-x-4">
        <button
          className="custom-prev-arrow bg-primary text-white p-3 rounded-sm hover:text-primary"
          onClick={handlePrevClick}
        >
          <img src={Images.rightArrow} className="rotate-180" alt="Previous" />
        </button>
        <button
          className="custom-next-arrow bg-primary text-white p-3 rounded-sm hover:text-primary"
          onClick={handleNextClick}
        >
          <img src={Images.rightArrow} alt="Next" />
        </button>
      </div> */}
    </div>
  );
}

// function CarCard({
//   image,
//   price,
//   mileage,
//   model,
//   horsepower,
//   title,
//   description,
// }) {
//   return (
//     <Link to={`/car-details/1`}>
//       <div className="mx-5 rounded-xl overflow-hidden my-10">
//         {/* Image Section */}
//         <div className="relative">
//           <img
//             src={Images.cardCar}
//             alt={title}
//             className="w-full h-[350px] object-cover rounded-2xl"
//           />
//           {/* Price Tag */}
//           <div className="absolute bottom-3 right-3 bg-primary text-white rounded px-3 py-2 text-sm">
//             ${price} <span className="text-xs">MSRP ${price / 2}</span>
//           </div>
//         </div>

//         {/* Car Details Section */}
//         <div className="bg-transparent">
//           {/* Car Specs */}
//           <div className="flex text-grayText text-sm border rounded-md bg-white mt-4">
//             <div className="p-2 w-full text-center">{mileage}</div>
//             <div className="border-x p-2 w-full text-center">
//               Model: {model}
//             </div>
//             <div className="p-2 w-full text-center">Auto</div>
//             <div className="border-l p-2 w-full text-center">{horsepower}</div>
//           </div>

//           {/* Car Title and Description */}
//           <div className="mt-4">
//             <h3 className="text-[20px] font-semibold text-gray-800 flex items-center">
//               <span className="bg-secondary h-1.5 w-6 mr-5"></span> {title}
//             </h3>
//             <Text content={description} className="pt-3" />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
