/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Images from "../../../assets/images";
import Button from "../../Button";

const InvoiceHeaderEdit = ({setSavedSection,setShowSection,header2,setSavedHeader2}) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const fileInputRef = useRef();
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleSelect = (index) => {
    setSelectedSection(index);
   
  };

  const sections = [
    {
      id: 1,
      label: "1. Logo right / Company data left",
      logoPosition: "right",
      showText: true,
      showLogo: true,
    },
    {
      id: 2,
      label: "2. Logo left / Company data right",
      logoPosition: "left",
      showText: true,
      showLogo: true,
    },
    {
      id: 3,
      label: "3. No logo / Company data centered",
      logoPosition: "none",
      showText: true,
      showLogo: false,
    },
    {
      id: 4,
      label: "4. Only logo / No company data",
      logoPosition: "center",
      showText: false,
      showLogo: true,
    },
    {
      id: 5,
      label: "5. Empty header area (for pre-printed invoice paper)",
      logoPosition: "none",
      showText: false,
      showLogo: false,
      boxEmpty: true,
    },
  ];
  const handleSave = () => {
    if(header2){
      setSavedHeader2(selectedSection)
      setShowSection("")
    }else{

      setSavedSection(selectedSection);
      setShowSection("")
    }
  };
  return (
    <div className="">
      <h2 className="text-2xl font-medium  text-darkBlue">
        Edit header section
      </h2>
      <p className="mb-4 text-lg">Select the header style you want to use:</p>
      <div className="">
        <div>
          {sections?.map((section) => {
            const isCentered = !section.showText || !section.showLogo; 

            return (
              <section
                key={section.id}
                className={`mb-4 cursor-pointer`}
                onClick={() => handleSelect(section)}
              >
                <p className="text-darkBlue text-xs mb-1">{section.label}</p>
                <div
                  className={`p-4 bg-white ${
                    selectedSection?.id === section.id
                      ? "border border-primary"
                      : "border"
                  } ${section.boxEmpty ? "h-[130px]" : ""}  rounded-md flex ${header2? "items-center":""} ${
                    section.logoPosition === "left" ? "flex-row-reverse" : ""
                  }  ${isCentered ? "justify-center" : "justify-between"}`}
                >
                  {section.showText  && (
                    <div className="text-[8px]">
                      <h3 className="font-semibold text-xs">
                        Autocenter Niederbipp AG
                      </h3>
                      <div className={`${header2? "hidden":""}`}>
                      <p>
                        Service/ Reparatur | Carrosserie/ Spritzwerk | Ankauf/
                        Verkauf
                      </p>
                      <p>Leonardistrasse 3, 4704 Niederbipp</p>
                      <p>Tel: 032 633 60 63</p>
                      <p>Email: verkauf@acnag.ch</p>
                      <p>UID: CHE-199.615.522</p>
                      </div>
                    </div>
                  )}

                  {section.showLogo && (
                    <div className={` font-bold text-lg`}>
                      <img
                        src={Images.staticLogo}
                        alt="logo"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
        <div className="flex gap-2 pb-5 mb-5 border-b">
          <input type="checkbox"  className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-primary 
            " />
          <p className="text-xs">Do not print the header area</p>
        </div>
        <div className="flex items-center justify-between text-darkBlue">
          <p className="font-medium ">Upload logo / image</p>
          <div className="flex gap-2">
            <input type="checkbox"  className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-primary 
            " />
            <p className="text-xs">Do not print the header area</p>
          </div>
        </div>
        <div className="border-b mb-5">
          <button onClick={handleButtonClick} className="px-4 py-2 mt-4 mb-8   bg-primary text-white rounded cursor-pointer ">
            Choose File
            <input type="file"  ref={fileInputRef} className="hidden" />
          </button>
        </div>
        <div className="flex items-center justify-between text-darkBlue">
          <p className="font-medium ">Upload background image</p>
          <div className="flex gap-2">
            <input type="checkbox"   className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-primary 
            " />
            <p className="text-xs">Do not use a background image</p>
          </div>
        </div>
        <div className="">
          <button   onClick={handleButtonClick} className="px-4 py-2 mt-4 mb-8   bg-primary text-white rounded cursor-pointer ">
            Choose File
            <input type="file"   ref={fileInputRef} className="hidden" />
          </button>
          <div className="flex gap-2 pb-5 mb-5 border-b">
            <input type="checkbox"  className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
            checked:bg-primary checked:border-primary 
            " />
            <p className="text-xs">Do not print the background image</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-5">
          <Button
            text="Save"
            bgColor="primary"
            textColor="white"
            borderRadius="rounded-md"
            borderColor="primary"
            padding="px-12 py-2"
            onClick={handleSave}
          />
          <button
            className={
              "hover:bg-none px-12 py-2 text-error border border-error rounded-md "
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeaderEdit;
