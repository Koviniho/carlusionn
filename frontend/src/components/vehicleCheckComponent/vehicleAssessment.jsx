import { Link } from "react-router-dom";
import Icons from "../../assets/icons";
import Images from "../../assets/images";
import { useState } from "react";
import Modal from "../modal/modal";
import CarLoadingScreen from "./carLoadingScreen";
import PATHS from "../../routes/path";

const VehicleAssessment = () => {
  const [showLoader, setShowLoader] = useState(false);
  const vehicles = [
    {
      id: 1,
      image: Images.cardCar, // Replace with actual image URL
      name: "BMW 120d xDrive Edition M Sport Steptronic",
      price: "59’900 CHF",
      mileage: "62,780 km",
      date: "March 2022",
      rating: 4,
    },
    {
      id: 2,
      image: Images.car4,
      name: "BMW 120d xDrive Edition M Sport Steptronic",
      price: "59’900 CHF",
      mileage: "62,780 km",
      date: "March 2022",
      rating: 5,
    },
    {
      id: 3,
      image: Images.vehicleInfo,
      name: "BMW 120d xDrive Edition M Sport Steptronic",
      price: "59’900 CHF",
      mileage: "62,780 km",
      date: "March 2022",
      rating: 4,
    },
    {
      id: 4,
      image: Images.car5,
      name: "BMW 120d xDrive Edition M Sport Steptronic",
      price: "59’900 CHF",
      mileage: "62,780 km",
      date: "March 2022",
      rating: 5,
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Latest Vehicle Assessment
      </h2>
      <Modal
              isOpen={showLoader}
              onClose={() => setShowLoader(false)}
              title={"Rate Car"}
              width={"w-[70%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setShowLoader}
            >
             <CarLoadingScreen/>
            </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm"
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              onClick={() => setShowLoader(true)}
              className="w-32 h-32 rounded-full object-cover"
            />

            <div className=" flex-1">
              <h3 className="text-base font-semibold text-darkBlue">
                {vehicle.name}
              </h3>

              <p className="text-secondary font-bold text-xl">
                {vehicle.price}
              </p>

              <p className="text-grayText text-sm flex items-center gap-2 space-x-2 mt-2">
                <Icons.BiSolidTachometer size={24} className="text-darkBlue" />
                {vehicle.mileage}
              </p>
              <p className="text-grayText text-sm flex items-center gap-2 space-x-2 mt-2 ml-0.5">
                <Icons.IoCalendarOutline size={20} className="text-darkBlue" />
                {vehicle.date}
              </p>
              {/* <span>📅 {vehicle.date}</span> */}

              <Link to={PATHS.vehicleAssementDetailRoute} className="text-primary text-sm mt-1 inline-block">
                + View More
              </Link>
            </div>

            {/* Star Rating */}
            <div className=" mt-auto flex space-x-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <span className="text-2xl " key={i}>
                  {i < vehicle.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleAssessment;
