import React from "react";
import Chart from "react-apexcharts";
import VehicleDetailGraph from "../VehicleManagementComponent/vehicleDetailGraph";

export default function PriceBreakdown() {
  const chartOptions = {
    chart: { type: "area", toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "June"] },
    yaxis: { labels: { formatter: (value) => `${value} CHF` } },
    colors: ["#34D399"],
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    tooltip: { enabled: true },
  };

  const chartSeries = [
    { name: "Price", data: [42000, 43500, 45000, 46000, 47000, 49900] },
  ];

  return (
    <div className=" border border-t-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Cost Breakdown */}
        <div className="border-r pr-6 p-6">
          <h2 className="text-lg font-medium text-darkBlue flex items-center">
            <span className="text-xl">$</span> <span>Cost Breakdown</span>
          </h2>
          <div className="mt-3 space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span className="text-lg">Purchase Price</span>{" "}
              <span className="text-xl font-semibold  text-darkBlue">
                $38,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Reconditioning</span>{" "}
              <span className="text-xl font-semibold text-darkBlue">
                $1,200
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Transport</span>{" "}
              <span className="text-xl font-semibold text-darkBlue">$800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Other Costs</span>{" "}
              <span className="text-xl font-semibold text-darkBlue">$500</span>
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between text-lg  text-darkBlue">
            <span>Total Cost</span>{" "}
            <span className="text-xl font-semibold">$40,000</span>
          </div>
        </div>

        {/* Final Selling Price */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-darkBlue flex items-center">
            <span className="text-xl">$</span> <span>Final Selling Price</span>
          </h2>
          <div className="bg-gray-100 px-4 py-6 rounded-lg mt-6">
            <p className="text-lg text-grayText font-medium">Selling Price</p>
            <p className="text-3xl font-semibold text-darkBlue">49’900 CHF</p>
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-lg font-medium">Margin</p>
            <p className="text-secondary text-xs font-semibold mt-2">
              +15.2% vs last month ↑
            </p>
          </div>
          <div className="flex items-center justify-between my-4">
            <p className="text-lg font-medium">Price Trend (Last 6 Months)</p>

            <p className="text-error text-xs font-semibold">
              --15.2% vs last month
            </p>
          </div>
          <div className=" w-full ">
                <VehicleDetailGraph  />
              </div>
         
        </div>
      </div>
    </div>
  );
}
