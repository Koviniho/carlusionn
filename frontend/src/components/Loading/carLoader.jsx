/* eslint-disable react/prop-types */
// CheckLoader.jsx

import Images from "../../assets/images";

const CheckLoader = ({ size = 50,opacity }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-white ${!opacity? "":"bg-opacity-80"}  z-50`}>
    <img
      src={Images.checkLoaderIcon}
      alt="Loading..."
      className="animate-spin"
      style={{ width: size, height: size }}
    />
  </div>
  );
};

export default CheckLoader;
