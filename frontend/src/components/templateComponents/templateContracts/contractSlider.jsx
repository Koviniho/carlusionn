
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";
import Images from "../../../assets/images";

const images = [
  {
    original: Images.cardCar, // Replace with your actual image path
    thumbnail: Images.cardCar,
  },
  {
    original: Images.vehicle, // Replace with your actual image path
    thumbnail: Images.vehicle,
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

function ContractSlider({dashBoard,myImages}) {
  return (
    <div className="w-full ">
      <ImageGallery
        items={myImages? myImages: images}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={!dashBoard}
        slideDuration={500}
   
        renderItem={(item) => (
          <div style={{  }}>
            <img
              src={item.original}
              alt=""
              style={{ height: "100%", width: "100%", objectFit: "cover",borderRadius:"8px" }}
            />
            
          </div>
        )}
     // Customizing the thumbnail size
     renderThumbInner={(item) => (
      <div style={{ width: "40px", height: "30px", overflow: "hidden" , objectFit: "cover",borderRadius:"8px"  }}>
        <img
          src={item.thumbnail}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    )}

        
      />

    </div>
  );
}

export default ContractSlider;
