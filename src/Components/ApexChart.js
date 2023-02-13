import React from "react";
import ReactApexChart from "react-apexcharts";
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "STOCK ABC",
          data: [
            { x: "05/06/2014", y: 54 },
            { x: "05/08/2014", y: 17 },
            { x: "05/28/2014", y: 26 },
            { x: "05/29/2014", y: 34 },
          ],
        },
      ],
      options: {
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
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
export default ApexChart;
