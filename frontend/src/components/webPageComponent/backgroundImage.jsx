/* eslint-disable react/prop-types */
import { useRef } from "react";
import Images from "../../assets/images";

const BackgroundImage = ({
  setBackgroundImage,
  showCoverPhoto,
  setShowCoverPhoto,
  allURLs,
  setAllURLs,
}) => {
  const fileInputRef = useRef();
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setBackgroundImage(file);
      const updatedURLs = allURLs?.filter(
        (item) => item.category !== "background-image"
      );
      setAllURLs(updatedURLs);
      const reader = new FileReader();
      reader.onload = (e) => {
        setShowCoverPhoto(e.target.result); // Set the image URL to state
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    // <div>
    //   <div className="bg-white w-full rounded-md shadow-lg px-8 py-5 text-grayText">
    //     <h2 className="text-darkBlue font-semibold">Background Image</h2>
    //     <div className="mt-4 mb-2">
    //       <button
    //         onClick={handleButtonClick}
    //         style={{
    //           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Images.background2})`,
    //           backgroundRepeat: "no-repeat",
    //           backgroundPosition: "center",
    //           backgroundSize: "cover",
    //         }}
    //         className=" w-full  text-white rounded cursor-pointer "
    //       >
    //         <div className="py-24 flex items-center justify-center gap-2">
    //             <img src={Images.upload} alt=""  className="w-6 " />
    //           <p className="">Click to change background image</p>
    //           {/* <img src={Images.background2} className="w-full  " alt="" /> */}
    //         </div>
    //         <input type="file" ref={fileInputRef} className="hidden" />
    //       </button>
    //     </div>
    //     <span className="mr-4">Supported formats: jpg, png </span>
    //     <span>Recommended size: 1920x1080px</span>
    //   </div>
    // </div>

    <div>
      <div className="bg-white w-full rounded-md shadow-lg px-8 py-5 text-grayText">
        <h2 className="text-darkBlue font-semibold">Background Image</h2>
        <div className="mt-4 mb-2">
          <div
            onClick={handleButtonClick}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${showCoverPhoto})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-full text-white rounded cursor-pointer "
          >
            <div className="py-24 flex items-center justify-center gap-2">
              <img src={Images.upload} alt="" className="w-6" />
              <p>Click to change background image</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <span className="mr-4">Supported formats: jpg, png </span>
        <span>Recommended size: 1920x1080px</span>
      </div>
    </div>
  );
};

export default BackgroundImage;
