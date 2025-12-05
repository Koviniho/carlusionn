import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartNine = () => {
  const [state, setState] = useState({
    series: [
      {
        data: [268, 385, 201, 298, 187, 195, 291.2, 100, 120, 150, 180, 50],
      },
      {
        data: [345, 160, 291, 187, 195, 298, 201, 12, 213, 431, 455, 224],
      },
    ],
  });

  // Update the state
  const updateState = () => {
    setState((prevState) => ({
      ...prevState,
      // Update the desired properties
    }));
  };
  updateState;

  const options = {
    colors: ["#19DB8C", "#19DB8C6B"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: 0,
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      markers: {
        radius: 99,
      },
    },
    grid: {
      strokeDashArray: 0, // Remove dotted grid lines
      yaxis: {
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
    },
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="flex flex-col gap-2 b px-6 py-5  sm:flex-row sm:justify-between">
        <div></div>
        <div className="flex items-center">
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 font-medium outline-none border rounded-md"
            >
              <option value="" className="">
                Monthly
              </option>
              <option value="" className="">
                Weekly
              </option>
            </select>
            <span className="absolute right-1 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99995 12.8249C8.8312 12.8249 8.69058 12.7687 8.54995 12.6562L2.0812 6.2999C1.82808 6.04678 1.82808 5.65303 2.0812 5.3999C2.33433 5.14678 2.72808 5.14678 2.9812 5.3999L8.99995 11.278L15.0187 5.34365C15.2718 5.09053 15.6656 5.09053 15.9187 5.34365C16.1718 5.59678 16.1718 5.99053 15.9187 6.24365L9.44995 12.5999C9.30933 12.7405 9.1687 12.8249 8.99995 12.8249Z"
                  fill="#64748B"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4">
        <div id="chartNine" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartNine;
