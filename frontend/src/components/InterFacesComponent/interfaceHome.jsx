import { IoSearchOutline } from "react-icons/io5";
import InterfaceCard from "./interfaceCard";

import Icons from "../../assets/icons";
import Images from "../../assets/images";
import { useState } from "react";
import Button from "../Button";
import MainHeading from "../Heading/mainHeading";
import Modal from "../modal/modal";
import {
  interfaceInputs,
} from "../../Inputs/vehicle.input";
import CustomInput from "../Input/custoInput";

const InterfaceHome = () => {
  const [showInterfaceModal, setShowInterfaceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };
  const locations = [
    {
      title: "Autohaus Bützberg",
      icon: <img src={Images.locationMark} className="w-8 h-8" />,
    },
    {
      title: "Toyota Partner",
      icon: <img src={Images.infoCar} className="w-8 h-8" />,
    },
    {
      title: "Autohaus Bützberg",
      icon: <img src={Images.locationMark} className="w-8 h-8" />,
    },
    {
      title: "Toyota Partner",
      icon: <img src={Images.infoCar} className="w-8 h-8" />,
    },
    {
      title: "Autohaus Bützberg",
      icon: <img src={Images.locationMark} className="w-8 h-8" />,
    },
    {
      title: "Toyota Partner",
      icon: <img src={Images.infoCar} className="w-8 h-8" />,
    },
    {
      title: "Autohaus Bützberg",
      icon: <img src={Images.locationMark} className="w-8 h-8" />,
    },
    {
      title: "Toyota Partner",
      icon: <img src={Images.infoCar} className="w-8 h-8" />,
    },
  ];
  return (
    <div>
      <div className="flex gap-6  ">
        <InterfaceCard
          title="Car dealership Bützberg"
          icon={<img src={Images.locationMark} className="w-8 h-8" />}
          width="w-[260px]"
        />
        <InterfaceCard
          title="Carlano"
          icon={<img src={Images.infoCar} className="w-8 h-8" />}
          width="w-[260px]"
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="grid grid-cols-3 items-end justify-between gap-8 ">
          <div className="flex items-center gap-2 border-b border-gray-100 w-[300px] col-span-2">
            <IoSearchOutline className="h-4 w-4 text-darkBlue" />
            <input
              type="text"
              placeholder="Search"
              className="pr-4 py-2 rounded-lg outline-none placeholder:text-darkBlue text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <p className="text-darkBlue text-sm font-medium capitalize">
            0 Ergebnisse gefunden
          </p>
        </div>

        <Button
          text="New Interface"
          textColor="white"
          borderRadius="rounded"
          padding="px-5 py-2"
          icon={<Icons.FiPlus />}
          onClick={() => setShowInterfaceModal(true)}
        />
        <Modal
          isOpen={showInterfaceModal}
          onClose={() => setShowInterfaceModal(false)}
          title={"Carlano"}
          width={"w-[40%]"}
          fontSize={"text-2xl"}
          fontWeight="font-medium"
          setModalOpen={setShowInterfaceModal}
        >
          {/* <form onSubmit={formik.handleSubmit}> */}
          <form>
            <div className="grid grid-cols-1 gap-4  py-5 px-2 space-y-2">
              <img src={Images.carlano} alt="" className="mx-auto" />
              {interfaceInputs.map((input) => (
                <CustomInput
                  key={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                  name={input.name}
                  label={input.label}
                  required={input?.required}
                  // value={formik.values[input.name]}
                  // onChange={
                  //   input.name === "chooseVehicle"
                  //     ? handleVehicleChange
                  //     : formik.handleChange
                  // }
                  // onBlur={formik.handleBlur}
                  // error={formik.errors[input.name] && formik.touched[input.name]}
                  // touched={formik.touched[input.name]}
                  options={input.options || []}
                  paddingY={"py-3"}
                />
              ))}
            </div>
            <div className=" py-8">
              <Button
                type="submit"
                text="Connect"
                textColor="white"
                className="mx-auto px-20"
                fontSize="text-xl"
                borderRadius="rounded-lg"
              />
            </div>
          </form>
        </Modal>
      </div>
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-medium"
        heading="My interfaces"
      />
      <div className="grid grid-cols-4 gap-4">
        {locations.map((location, index) => (
          <InterfaceCard
            key={index}
            title={location.title}
            icon={location.icon}
          />
        ))}
      </div>
      <MainHeading
        className="font-poppins pt-12 pb-5"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-medium"
        heading="Website"
      />
      <div className="grid grid-cols-4 gap-4">
        {locations.map((location, index) => (
          <InterfaceCard
            key={index}
            title={location.title}
            icon={location.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default InterfaceHome;
