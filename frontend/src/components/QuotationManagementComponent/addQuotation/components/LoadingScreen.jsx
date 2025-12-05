import { useState, useEffect } from "react";
import Images from "../../../../assets/images";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    // Simulate loading process (optional)
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  ">
     
      <div className="mt-4">
        <div className=" ">
          <img src={Images.checkLoaderIcon} alt="" className="w-32 h-32" />
        
        </div>
      </div>

  
      <div className="mt-6 w-full">
        <p className="text-grayText text-lg font-medium text-left">
          Loading Vehicle Searching........!
        </p>
        <div className="w-full bg-gray-300 h-3 rounded-full mt-2">
          <div
            className="h-3 bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-gray-500 text-sm mt-1">{progress}%</p>
      </div>
    </div>
  );
};
export default LoadingScreen;
