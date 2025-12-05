/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./vehicleSlider.css";



function VehicleSlider({ vehicle, vehicleImages }) {
  const galleryImages = vehicleImages?.map((imageObj) => ({
    original: imageObj.s3Url,
    thumbnail: imageObj.s3Url,
  }));
  return (
    <div className="w-full ">
      <ImageGallery
         items={galleryImages?.length > 0 ? galleryImages : []}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={!vehicle}
        slideDuration={500}
      />
    </div>
  );
}

export default VehicleSlider;


// function VehicleSlider({ vehicleImages }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const thumbnailRefs = useRef([]);

//   useEffect(() => {
//     if (vehicleImages?.length > 0) {
//       setCurrentIndex(0);
//     }
//   }, [vehicleImages]);

//   // Trigger fade effect
//   useEffect(() => {
//     setFade(false);
//     const timeout = setTimeout(() => setFade(true), 50);
//     return () => clearTimeout(timeout);
//   }, [currentIndex]);

//   // Scroll thumbnail to center
//   useEffect(() => {
//     const selectedRef = thumbnailRefs.current[currentIndex];
//     if (selectedRef) {
//       selectedRef.scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//         block: "nearest",
//       });
//     }
//   }, [currentIndex]);

//   if (!vehicleImages || vehicleImages.length === 0) return null;

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       {/* Main Image with fade */}
//       <div className="w-full h-[250px] mb-4 rounded-xl overflow-hidden bg-gray-100 relative">
//         <img
//           src={vehicleImages[currentIndex].s3Url}
//           alt={`vehicle-${currentIndex}`}
//           className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
//             fade ? "opacity-100" : "opacity-0"
//           }`}
//         />
//       </div>

//       {/* Thumbnails with auto-scroll */}
//       <div
//         className="flex gap-3 overflow-x-auto px-1 no-scrollbar"
//         style={{ scrollSnapType: "x mandatory" }}
//       >
//         {vehicleImages.map((image, index) => (
//           <img
//             key={index}
//             ref={(el) => (thumbnailRefs.current[index] = el)}
//             src={image.s3Url}
//             alt={`thumb-${index}`}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-20 w-32 object-cover flex-shrink-0 rounded-md cursor-pointer border-2 transition-all duration-300 scroll-snap-align-center ${
//               index === currentIndex
//                 ? "border-blue-500"
//                 : "border-transparent opacity-70 hover:opacity-100"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default VehicleSlider;