import Breadcrumb from "../../components/Breadcrumb";
import MainHeading from "../../components/Heading/mainHeading";
import ExpectedSales from "../../components/DasboardComponent/expected-sales";
import ChartOne from "../../components/Charts/CahrtOne";
import ChartThree from "../../components/Charts/ChartThree";
import TopPerformanceSalesPersons from "../../components/DasboardComponent/top-performing-salesperson";
import TopSellingBrands from "../../components/DasboardComponent/top-selling-brand";
import RecentVehicles from "../../components/DasboardComponent/recent-vehicles";
import ChartFour from "../../components/Charts/ChartFour";
import TopCustomer from "../../components/Charts/TopCustomer";
import useUserInfo from "../../hooks/useUserInfo";
function DashBoardPage() {
  const userData=useUserInfo();
  console.log("🚀 ~ DashBoardPage ~ userData:", userData)
  return (
    <div>
      <Breadcrumb heading={`Hi, Welcome ${userData?.username}! 👋`} />

      <MainHeading
        heading="Overview"
        textSize="text-[24px]"
        textColor="darkBlue"
        className="font-poppins"
        fontWeight="font-medium"
      />

      <ExpectedSales />
      <div className="flex gap-5  justify-center">
        <div className="w-6/12">
          <ChartOne />
        </div>
        <div className="w-6/12">
          <TopCustomer />
        </div>
      </div>
      <div className="flex gap-5 my-10">
        <div className="w-6/12">
          <ChartFour />
        </div>
        <div className="w-6/12">
          <ChartThree />
        </div>
      </div>
      <RecentVehicles />
      <div className="grid grid-cols-2 gap-5 my-10">
        <TopPerformanceSalesPersons />

        <TopSellingBrands />
      </div>
    </div>
  );
}

export default DashBoardPage;
