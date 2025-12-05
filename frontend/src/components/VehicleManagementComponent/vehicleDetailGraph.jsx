/* eslint-disable react/prop-types */
// import  { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const VehicleDetailGraph = () => {
//   const [state, setState] = useState({
//     series: [
//       {
//         name: "series1",
//         data: [40, 1000, 28, 10, 42, 600, 400, 50, 900, 20, 60, 500],
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "area",
//         toolbar: {
//           show: false, // Disables the toolbar (removes + and - icons)
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "straight", // Sharp edges instead of rounded
//         width: 2, // Line thickness
//         colors: ["#19DB8C"], // Line color
//       },
//       fill: {
//         type: "gradient", // Use gradient for fill
//         gradient: {
//           shade: "light",
//           type: "vertical", // Gradient direction
//           shadeIntensity: 0,
//           gradientToColors: ["#19DB8C00"], // Transparent end color
//           inverseColors: false,
//           opacityFrom: 1, // Full opacity at the start
//           opacityTo: 0, // Transparent at the end
//           stops: [0, 100], // Gradient stops
//           colorStops: [
//             {
//               offset: 0,
//               color: "#19DB8C", // Start color
//               opacity: 1,
//             },
//             {
//               offset: 100,
//               color: "#19DB8C00", // End color (transparent)
//               opacity: 0,
//             },
//           ],
//         },
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2023-01-01T00:00:00.000Z", // January
//           "2023-02-01T00:00:00.000Z", // February
//           "2023-03-01T00:00:00.000Z", // March
//           "2023-04-01T00:00:00.000Z", // April
//           "2023-05-01T00:00:00.000Z", // May
//           "2023-06-01T00:00:00.000Z", // June
//           "2023-07-01T00:00:00.000Z", // July
//           "2023-08-01T00:00:00.000Z", // August
//           "2023-09-01T00:00:00.000Z", // September
//           "2023-10-01T00:00:00.000Z", // October
//           "2023-11-01T00:00:00.000Z", // November
//           "2023-12-01T00:00:00.000Z", // December
//         ],
//         labels: {
//           show: true,
//           formatter: function (val) {
//             const date = new Date(val);
//             return date.toLocaleString("default", { month: "short" }); // Formats to "Jan", "Feb", etc.
//           },
//         },
//         tickAmount: 12, 
//       },
//       tooltip: {
//         x: {
//           format: "MMM yyyy", 
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           options={state.options}
//           series={state.series}
//           type="area"
//           height={200}
//         />
//       </div>
//     </div>
//   );
// };

// export default VehicleDetailGraph;


import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Text from "../Heading/text";

const VehicleDetailGraph = ({ color = "#19DB8C" }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "series1",
        data: [40, 1000, 28, 10, 42, 600, 400, 50, 900, 20, 60, 500],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
        colors: [color], // Use the dynamic color
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: [`${color}00`], // Transparent end color
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: color,
              opacity: 1,
            },
            {
              offset: 100,
              color: `${color}00`,
              opacity: 0,
            },
          ],
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2023-01-01T00:00:00.000Z",
          "2023-02-01T00:00:00.000Z",
          "2023-03-01T00:00:00.000Z",
          "2023-04-01T00:00:00.000Z",
          "2023-05-01T00:00:00.000Z",
          "2023-06-01T00:00:00.000Z",
          "2023-07-01T00:00:00.000Z",
          "2023-08-01T00:00:00.000Z",
          "2023-09-01T00:00:00.000Z",
          "2023-10-01T00:00:00.000Z",
          "2023-11-01T00:00:00.000Z",
          "2023-12-01T00:00:00.000Z",
        ],
        labels: {
          show: true,
          formatter: function (val) {
            const date = new Date(val);
            return date.toLocaleString("default", { month: "short" });
          },
        },
        tickAmount: 12,
      },
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  });

  return (
    <div>
       <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full mb-5  gap-3 sm:gap-5">
          <div className=" w-full">
            <Text
              content={"Der wert dieses Autos"}
              textColor="text-darkBlue"
              fontWeight="font-semibold"
            />
            <Text
              content={"Price Report of Your Sales"}
              textColor="text-[#6B7280]"
              textSize="text-[12px]"

              // className="text-"
            />
          </div>
          <div className="relative text-left w-full   flex items-center justify-end">
            <select
              className="block  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-grayText shadow-sm hover:bg-gray-100 focus:outline-none   "
              aria-label="Select period"
            >
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={200}
        />
      </div>
    </div>
  );
};

export default VehicleDetailGraph;
