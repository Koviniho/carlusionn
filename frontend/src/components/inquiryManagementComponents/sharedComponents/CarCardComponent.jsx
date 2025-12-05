import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Images from "../../../assets/images";

const CarCardComponent = () => {
  return (
    <div className="  grid grid-cols-4 border   cursor-pointer rounded-lg gap-4">
      <img
        // src={
        //   item?.images
        //     ? `${config.imageBaseUrl}/vehicle/${item?.images[0]}`
        //     : "/images/car-placeholder.jpg"
        // }
        src={Images.car4}
        alt="Vehicle"
        className="h-full  object-cover rounded-tl-lg rounded-bl-lg "
      />
      <div className="col-span-3">
        <div className="flex justify-end w-full  ">
          <p
            className={`${"bg-secondary"} text-white py-1 px-4 text-center rounded-tr-lg rounded-bl text-sm  capitalize`}
          >
            Available
          </p>
        </div>
        <div>
          <p className="text-darkBlue capitalize text-xs font-semibold pt-2">
            {/* {item?.brand + " " + item?.model} */} MERCEDES-BENZ MERCEDES-AMG
            SL MERCEDESAMG SL 63 4MATIC
          </p>
        </div>
        <p className="text-[10px] text-grayText ">
          Gasoil | 10/2022 | 9.800 Km.
        </p>
        <div className="flex items-center justify-between  mt-3 pb-2">
          <p className="text-primary text-sm font-semibold">184.900€</p>
          <img
            src={Images.mercedesLogo}
            className="h-8 w-[72px] object-contain"
          />{" "}
        </div>

        <div className="border-t border-lightGray  pt-4 pb-2 flex items-center justify-between mr-2">
          <div className="flex items-center gap-2 text-grayText">
            <FaRegHeart size={16} />{" "}
            <span className="text-sm">Add to wishlist</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={Images.download} className="text-primary" />
            <img
              src={Images.bin}
              className="text-error cursor-pointer w-4"
              //   onClick={() => handleDeleteClick(item)}
            />
            <MdOutlineRemoveRedEye
              size={20}
              className="text-secondary cursor-pointer"
              //   onClick={() => handleNavigate(item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCardComponent;
