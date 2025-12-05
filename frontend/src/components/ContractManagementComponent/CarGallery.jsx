/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';

const CarGallery = ({imageURLs}) => {
  // const images = [
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960293-1733479960293-a1.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960298-1733479960298-a2.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960299-1733479960299-a3.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960299-1733479960299-a4.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960300-1733479960300-a5.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960300-1733479960300-a6.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960300-1733479960300-a7.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960301-1733479960301-a8.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960301-1733479960301-a9.webp",
  //   "https://smartik.s3.eu-north-1.amazonaws.com/car-data/1733479960301-1733479960301-a10.webp"
  // ];

  
  

  const [selectedImage, setSelectedImage] = useState(null);
useEffect(()=>{
setSelectedImage(imageURLs?.[0]?.s3Url)
},[imageURLs])
  return (
    <div className="max-w-4xl mx-auto ">
      {/* Main Image */}
      <div className="mb-4">
        <img
          src={selectedImage}
          alt="Selected car"
          className="w-full h-96 object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-2">
        {imageURLs?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image.s3Url)}
            className={`rounded-lg overflow-hidden ${
              selectedImage === image.s3Url ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <img
              src={image.s3Url}
              alt={`Car ${index + 1}`}
              className="w-full h-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;