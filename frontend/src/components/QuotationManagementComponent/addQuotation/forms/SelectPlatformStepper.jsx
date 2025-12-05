import { useState } from "react";
import Button from "../../../Button";
import Text from "../../../Heading/text";
import lebonCoinImg from "../../../../assets/images/leboncoin.svg";
import autoTraderImg from "../../../../assets/images/autoTrader.svg";
import finnImg from "../../../../assets/images/finn.svg";
import autovitImg from "../../../../assets/images/autovit.svg";
import CustomInput from "../../../Input/custoInput";
import Modal from "../../../modal/modal";
import LoadingScreen from "../components/LoadingScreen";

const SelectPlatformStepper = ({ setCurrentStep, setModalOpen }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const images = [
    lebonCoinImg,
    autoTraderImg,
    finnImg,
    autovitImg,
    autoTraderImg,

    lebonCoinImg,
    autoTraderImg,
    finnImg,
    autovitImg,
    autoTraderImg,

    lebonCoinImg,
    autoTraderImg,
    finnImg,
    autovitImg,
    autoTraderImg,

    lebonCoinImg,
    autoTraderImg,
    finnImg,
    autovitImg,
    autoTraderImg,

    lebonCoinImg,
    autoTraderImg,
    finnImg,
    autovitImg,
    autoTraderImg,
  ];

  const toggleImageSelection = (index) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const selectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map((_, index) => index));
    }
  };

  const handleFinish = () => {
    setShowLoader(true);
    setModalOpen(false);
  };
  return (
    <div className="space-y-5">
      <section className="border-[1px] border-primary rounded-md  p-4 space-y-2">
        <Text
          content="You can select 8 more platforms."
          textColor="text-black"
          textSize="text-sm md:text-base"
        />
        <Text
          content="Upgrade your plan to select more platforms."
          textColor="text-black"
          textSize="text-sm md:text-base"
        />
      </section>
      <section className="flex justify-between">
        <CustomInput
          type="select"
          options={[
            { label: "Europe", value: "europe" },
            { label: "Others", value: "others" },
          ]}
        />
        <Button
          textColor="white"
          borderRadius="rounded-lg"
          text={
            selectedImages.length === images.length
              ? "Deselect All"
              : "Select All"
          }
          onClick={selectAll}
        />
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Option ${index}`}
              className={`cursor-pointer rounded-md ${
                selectedImages.includes(index) ? "border-4 border-primary" : ""
              }`}
              onClick={() => toggleImageSelection(index)}
            />
          </div>
        ))}
      </section>
      <section className="flex justify-between">
        <Button
          borderColor="primary"
          bgColor="transparent"
          textColor="primary"
          borderRadius="rounded-lg"
          text="Back"
          onClick={() => setCurrentStep((prev) => prev - 1)}
        />
        <Button
          textColor="white"
          borderRadius="rounded-lg"
          text="Finish"
          // onClick={() => setCurrentStep((prev) => prev + 1)}
          onClick={handleFinish}
        />

        <Modal
          isOpen={showLoader}
          onClose={() => setShowLoader(false)}
          title={"Rate Car"}
          width={"w-[70%]"}
          fontSize={"text-2xl"}
          fontWeight="font-medium"
          setModalOpen={setShowLoader}
        >
          <LoadingScreen />
        </Modal>
      </section>
    </div>
  );
};

export default SelectPlatformStepper;
