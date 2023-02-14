import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const ApexChart = () => {
  const { data } = useSelector((state) => state.event);
  console.log("컴포넌트-apexChart useSelector", data);

  const [series] = useState([
    {
      name: "STOCK ABC",
      data: [
        { x: "05/06/2014", y: 54 },
        { x: "05/08/2014", y: 17 },
        { x: "05/28/2014", y: 26 },
        { x: "05/29/2014", y: 34 },
      ],
    },
  ]);

  const [options] = useState({
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },

    title: {
      text: "Fundamental Analysis of Stocks",
      align: "left",
    },
    subtitle: {
      text: "Price Movements",
      align: "left",
    },
    labels: "Date",
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
