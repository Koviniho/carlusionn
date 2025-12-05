/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Text from "../Heading/text";

const options = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#05779D", "#0D9960", "#F48550", ""],
  labels: ["Available", "Reserved", "Sold", ""],
  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = ({assessment}) => {
  const [state, setState] = useState({
    series: [65, 34, 12],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 56],
    }));
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-lg  xl:col-span-5">
      {/* <div className="mb-3 justify-between gap-4 sm:flex"> */}
      {assessment ? (
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap pt-5">
          <div className="flex w-full mb-5  gap-3 sm:gap-5">
            <div className=" w-full">
              <Text
                content={"Loss of Value Per Year"}
                textColor="text-darkBlue"
                fontWeight="font-semibold"
              />
              <Text
                content={"Vehicle depreciation over time"}
                textColor="text-[#6B7280]"
                textSize="text-[12px]"
              />
            </div>
            <div className="relative text-left w-full    flex items-center justify-end">
              <span className="bg-red-100 text-red-500 py-1 px-3 rounded-[21px] font-medium text-[10px]">
                {" "}
                -15.2% vs last month
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <Text
            content="Vehicles by status"
            fontWeight="font-semibold"
            textColor="text-darkBlue"
          />
        </div>
      )}
       
       
      {/* </div> */}

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#05779D]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Available </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0D9960]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Reserved </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#F48550]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Sold </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full "></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> </span>
              <span> </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
