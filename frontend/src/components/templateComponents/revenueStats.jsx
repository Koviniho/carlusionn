import Images from "../../assets/images";
import InfoCard from "../../components/InfoCard";

const RevenueStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$3521",
      icon: <img src={Images.revenue} alt="" className="w-8 h-8" />,
    },
    {
      title: "Total Profit",
      value: "$3521",
      icon: <img src={Images.revenue1} alt="" className="w-8 h-8" />,
    },
    {
      title: "Invoices Generated",
      value: "$3521",
      icon: <img src={Images.invoice} alt="" className="w-8 h-8" />,
    },
    {
      title: "Pending Payments",
      value: "$3521",
      icon: <img src={Images.revenue2} alt="" className="w-8 h-8" />,
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

export default RevenueStats;
