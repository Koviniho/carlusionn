import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Text from "../Heading/text";

const ChartFour = ({ assessment }) => {
  const [state, setState] = useState({
    series: [
      {
        data: [168, 385, 201, 298, 187],
      },
    ],
  });

  const options = {
    colors: ["#0D9960"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Coupe", "Suv", "Family", "Berlina", "Cabrio"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-8 shadow-lg  sm:px-7.5 ">
      {assessment ? (
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap pt-5">
          <div className="flex w-full mb-5  gap-3 sm:gap-5">
            <div className=" w-full">
              <Text
                content={"Popularity Trends"}
                textColor="text-darkBlue"
                fontWeight="font-semibold"
              />
              <Text
                content={"Search interest over the past 6 months"}
                textColor="text-[#6B7280]"
                textSize="text-[12px]"
              />
            </div>
            <div className="relative text-left w-full    flex items-center justify-end">
              <span className="bg-[#F0FFF7] py-1 px-3 rounded-[21px] font-medium text-[10px]">
                {" "}
                +15.2% vs last month ↑
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <Text
            content="Total vehicles in inventory by vehicle type"
            fontWeight="font-semibold"
            textColor="text-darkBlue"
          />
        </div>
      )}
      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
