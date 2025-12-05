import { useRef, useState } from "react";
import Images from "../../../assets/images";

 const  CashReceiptForm=()=> {
      const fileInputRef = useRef();
      const handleButtonClick = () => {
        fileInputRef.current?.click();
      };
  const [selectedPaper, setSelectedPaper] = useState("210mm");
  const [printOptions, setPrintOptions] = useState({
    name: true,
    address: true,
    uid: true,
  });
  const [withLogo, setWithLogo] = useState(false);
const image=Images.dot
  return (
    <div className="px-4">
      <h2 className="text-xl font-medium text-darkBlue">Edit Cash Receipt</h2>

      {/* Paper Width Options */}
      <div className="mt-6">
        <p className="text-grayText ">Width of receipt paper:</p>
        <div className="flex justify-between items-center">
        <div className="mt-2 space-y-2">
          {["210mm(A4)", "80mm", "50mm"].map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="radio"
                name="paperWidth"
                value={size}
                checked={selectedPaper === size}
                onChange={() => setSelectedPaper(size)}
                style={{
                    backgroundImage: selectedPaper === size ? `url(${image})` : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "60%",
                  }}
                  className="p-2  appearance-none border border-gray-300 rounded-full checked:border-primary"
              />
              <span className="text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      {/* Print Options */}
      <div className="mt-4 space-y-2">
        {[
          { key: "name", label: "Print workshop name" },
          { key: "address", label: "Print workshop address" },
          { key: "uid", label: "Print workshop UID" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={printOptions[key]}
              onChange={() =>
                setPrintOptions((prev) => ({ ...prev, [key]: !prev[key] }))
              }
              className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
              checked:bg-primary checked:border-primary 
              "
            />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>
      </div>
      </div>


      {/* Upload Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center border-t pt-8">
        <label className="block text-darkBlue font-medium">Upload logo / image</label>
          {/* Toggle Switch */}
      <div className=" flex items-center space-x-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={withLogo}
            onChange={() => setWithLogo(!withLogo)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-primary peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
        <span className="text-gray-700">Cash receipt with logo</span>
      </div>
        </div>
        <div className="border-b mb-5">
          <button onClick={handleButtonClick} className="px-4 py-2 mt-4 mb-8   bg-primary text-white rounded cursor-pointer ">
            Choose File
            <input type="file"  ref={fileInputRef} className="hidden" />
          </button>
        </div>
      </div>

    
    </div>
  );
}
export default CashReceiptForm;