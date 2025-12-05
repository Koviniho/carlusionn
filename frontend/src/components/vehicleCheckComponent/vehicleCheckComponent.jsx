/* eslint-disable react/prop-types */
import { useState } from "react";

import { IoSearchOutline } from "react-icons/io5";
import Button from "../../components/Button";

import Images from "../../assets/images";
import Icons from "../../assets/icons";
import { Link } from "react-router-dom";
import PATHS from "../../routes/path";

const CarCard = ({
  image,
  title,
  fuel,
  date,
  km,
  price,
  tgNumber,
  masterNumber,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 min-w-[25rem]">
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover rounded-lg "
      />
      <div className="flex ">
        <div className="text-darkBlue text-sm mt-4">
          <h2 className="text-base font-semibold  whitespace-pre-line">
            {title}
          </h2>
          <p className="text-gray-500 text-xs">
            {fuel} | {date} | {km} Km.
          </p>
          <p className="text-primary font-bold text-xl mt-4">{price}€</p>
        </div>
        <div className="flex  flex-col justify-between gap-8 ">
          <div className="flex items-center gap-4 mt-5 px-4 text-grayText">
            {/* <img src={Images.scan} /> */}
            <Icons.BsBookHalf className="w-4 h-4" />
            <Icons.FaShareAlt className="w-4 h-4" />
            <Icons.FaRegHeart className="w-4 h-4" />
          </div>
          <img src={Images.mercedesLogo} className="w-24 object-cover" />
        </div>
      </div>
      <div className="flex items-end border-t mt-5 pt-4 justify-between">
        <div className="text-grayText text-xs">
          <p>TG Number: {tgNumber}</p>
          <p>Master Number: {masterNumber}</p>
        </div>
        <Link to={`${PATHS.vehicleCheckDetailRoute}`}>
          {" "}
          <button className="  bg-primary text-white py-2 text-xs rounded px-8">
            Check Details
          </button>
        </Link>
      </div>
    </div>
  );
};

const VehicleCheckComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  const cars = [
    {
      image: Images.car5,
      title: "MERCEDES-BENZ MERCEDES-AMG SL MERCEDESAMG SL 63 4MATIC",
      fuel: "Gasoline",
      date: "10/2022",
      km: "9800",
      price: "184.900",
      tgNumber: "TG-09872X",
      masterNumber: "MN-452318",
    },
    {
      image: Images.car4,

      title: "MERCEDES-BENZ MERCEDES-AMG SL 63 4MATIC",
      fuel: "Gasoline",
      date: "10/2022",
      km: "9800",
      price: "184.900",
      tgNumber: "TG-09872X",
      masterNumber: "MN-452318",
    },
    {
      image: Images.car5,
      title: "MERCEDES-BENZ MERCEDES-AMG SL 63 4MATIC",
      fuel: "Gasoline",
      date: "10/2022",
      km: "9800",
      price: "184.900",
      tgNumber: "TG-09872X",
      masterNumber: "MN-452318",
    },
    {
      image: Images.car4,

      title: "MERCEDES-BENZ MERCEDES-AMG SL 63 4MATIC",
      fuel: "Gasoline",
      date: "10/2022",
      km: "9800",
      price: "184.900",
      tgNumber: "TG-09872X",
      masterNumber: "MN-452318",
    },
    {
      image: Images.car5,
      title: "MERCEDES-BENZ MERCEDES-AMG SL 63 4MATIC",
      fuel: "Gasoline",
      date: "10/2022",
      km: "9800",
      price: "184.900",
      tgNumber: "TG-09872X",
      masterNumber: "MN-452318",
    },
    {
      image: Images.car4,

      title: "MERCEDES-BENZ MERCEDES-AMG SL 63 4MATIC",
      fuel: "Gasoline",
      date: "10/2022",
      km: "9800",
      price: "184.900",
      tgNumber: "TG-09872X",
      masterNumber: "MN-452318",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="flex items-center  ps-4  gap-2 shadow-lg py-3 rounded-lg w-1/2 ">
          <IoSearchOutline className="h-4 w-4 text-darkBlue" />
          <input
            type="text"
            placeholder="Enter Type Approval, VIN, or Brand & Model..."
            className="pr-5 py-2 rounded-lg outline-none placeholder:text-grayText text-sm w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button
          text={"Search"}
          textColor="white"
          borderRadius="rounded"
          padding="py-3 px-8"
        />
      </div>
      <div className="overflow-x-auto whitespace-nowrap ">
        <div className=" flex gap-4 p-6 ">
          {cars.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VehicleCheckComponent;
