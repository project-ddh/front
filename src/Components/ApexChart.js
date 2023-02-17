import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const ApexChart = () => {
  const { data } = useSelector((state) => state.event);
  const chartData = data
    .filter((item) => item.isClosed)
    .map((data) => {
      return {
        dateEnd: data.dateEnd,
        closedPrice: data.closedPrice,
      };
    });

  const series = chartData.reduce(
    (result, data) => {
      const { dateEnd, closedPrice } = data;
      result[0].data.push({
        x: dateEnd,
        y: closedPrice,
      });
      return result;
    },
    [{ name: "상품 거래 히스토리", data: [] }]
  );
  const sortedSeries = series.map((serie) => ({
    ...serie,
    data: serie.data.sort((a, b) => new Date(a.x) - new Date(b.x)),
  }));

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
          series={sortedSeries}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
