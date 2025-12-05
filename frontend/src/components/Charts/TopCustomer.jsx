import  { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Text from "../Heading/text";
import { FaAngleLeft } from "react-icons/fa";

const TopCustomer = () => {
  const [state, setState] = useState({
    series: [
      {
        data: [120, 40, 60, 80, 140,180,100,130],
      },
    ],
  });

  const options = {
    colors: ["#1E599B"],
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
      categories: ["1", "2", "3", "4", "5","6","7","8"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide the y-axis labels
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
  const customers = [
    { name: "Samrana", vehicle: "Mercedes" },
    { name: "Ali", vehicle: "BMW" },
    { name: "Ahmed", vehicle: "Toyota" },
    { name: "Sarah", vehicle: "Range Rover" },
  ];
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };


  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-8 h-full  sm:px-7.5 shadow-lg">
      <div className="my-5 flex items-center justify-between">
        <Text
          content="Top customers"
          fontWeight="font-semibold"
          textColor="text-darkBlue"
        />
        <div className="  flex items-center justify-center space-x-2 p-2  bg-white rounded-md shadow-lg text-grayText select-none">
          <span className="text-sm font-medium min-w-24 text-center">
            {/* {formatDate(currentDate)}  */}
            October 2024
          </span>
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100  rounded-full transition-colors"
            aria-label="Previous month"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => navigate(1)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            {/* <ChevronRight className="w-5 h-5" /> */}
            <FaAngleLeft className="rotate-180" />
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={150}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border mx-8">
        {/* Header Row */}
        <div className="flex justify-between border-b">
          <div className="p-4 text-darkBlue text-sm font-medium">
            Customer Name
          </div>
          <div className="p-4 text-darkBlue text-sm font-medium ">
            Vehicle Name
          </div>
        </div>

        {/* Data Rows */}
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex justify-between border-b last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="px-4 py-2  text-grayText text-sm ">
              {customer.name}
            </div>
            <div className="px-4 py-2  text-grayText text-sm ">
              {customer.vehicle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomer;
