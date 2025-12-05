/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import "./VehicleDetailSlider.css";
import Images from "../../assets/images";

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

const VehicleDetailSlider = ({ vehicle, vehicleImages }) => {
  return (
    <div className="w-full ">
      <ImageGallery
        items={vehicleImages ? vehicleImages : images}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={!vehicle}
        slideDuration={500}
      />
    </div>
  );
};

export default VehicleDetailSlider;
