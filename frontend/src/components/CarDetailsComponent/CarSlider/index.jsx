import React from "react";
import ImageGallery from "react-image-gallery";
import Images from "../../../assets/images";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";

const images = [
  {
    original: Images.cardCar, // Replace with your actual image path
    thumbnail: Images.cardCar,
  },
  {
    original: Images.cardCar, // Replace with your actual image path
    thumbnail: Images.cardCar,
  },
  {
    original: Images.cardCar, // Replace with your actual image path
    thumbnail: Images.cardCar,
  },
  {
    original: Images.cardCar, // Replace with your actual image path
    thumbnail: Images.cardCar,
  },
];

function CarSlider({vehicle,vehicleImages}) {
  return (
    <div className="w-full ">
      <ImageGallery
        items={vehicleImages?vehicleImages:images}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={!vehicle}
        slideDuration={500}
        
      />
    </div>
  );
}

export default CarSlider;
