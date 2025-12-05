import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const BarChart = () => {
  const { allReports } = useSelector((state) => state?.fetchAllReportsSlice);
  const salesArray = allReports?.results?.map((item) => item.sales) || [];
  console.log("🚀 ~ BarChart ~ salesArray:", salesArray);
  const incomeArray = allReports?.results?.map((item) => item.income) || [];
  console.log("🚀 ~ BarChart ~ incomeArray:", incomeArray);
  const dateArray = allReports?.results?.map((item) => item.date) || [];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%" },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: dateArray,
    },
    yaxis: { title: { text: "" } },
    fill: { opacity: 1 },
    colors: ["#1E3A8A", "#34D399"], // Blue and Green
    legend: { position: "bottom" },
  };

  const series = [
    {
      name: "Einnahmen exkl. Steuer",
      // data: [400, 200, 220, 100, 390, 260, 180, 120],
      data: incomeArray,
    },
    {
      name: "Umsatz exkl. Steuer",
      data: salesArray,
    },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-xl mb-8">
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default BarChart;
