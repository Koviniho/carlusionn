import { useSelector } from "react-redux";
import Images from "../../assets/images";
import InfoCard from "../../components/InfoCard";

const VehicleStats = () => {
  const { allVehicles } = useSelector(
    (state) => state?.fetchAddedVehicleSlice
  );
  const stats = [
    {
      title: "Total Vehicles",
      value: allVehicles?.totalCount,
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Available vehicles",
      value: allVehicles?.availableVehicles,
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Reserved vehicles",
      value: allVehicles?.reservedVehicles,
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
    {
      title: "Sold vehicles",
      value: allVehicles?.soldVehicles,
      icon: <img src={Images.infoCar} alt="" className="w-8 h-8" />,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-6 mb-12 mt-5">
      {stats.map((stat, index) => (
        <div key={index}>
          <InfoCard
            title={stat.title}
            value={stat.value}
            icon={stat?.icon}
            textColor="darkBlue"
          />
        </div>
      ))}
    </div>
  );
};

export default VehicleStats;
