import React from 'react'

import './App.scss';
import SideBar from './components/SideBar'
import Figures from './components/figures/Figures'
import LowerDashboard from './components/LowerDashboard'
import Header from './components/Header'
//import Highcharts from 'highcharts';
//import HighchartsReact from 'highcharts-react-official';
import MostOrderedItems from './components/MostOrderedItems'
import MainChart from './components/MainChart'

/*
const options = {
  chart: {
    type: "areaspline",
  },
  title: {rails s
    text: "Average fruit consumption during one week",
  },
  legend: {
    layout: "vertical",
    align: "left",
    verticalAlign: "top",
    x: 150,
    y: 100,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
  },
  xAxis: {
    categories: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    plotBands: [
      {
        // visualize the weekend
        from: 4.5,
        to: 6.5,
        color: "rgba(68, 170, 213, .2)",
      },
    ],
  },
  yAxis: {
    title: {
      text: "Fruit units",
    },
  },
  tooltip: {
    shared: true,
    valueSuffix: " units",
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    areaspline: {
      fillOpacity: 0.5,
    },
  },
  series: [
    {
      name: "John",
      data: [3, 4, 3, 5, 4, 10, 12],
    },
    {
      name: "Jane",
      data: [1, 3, 4, 3, 3, 5, 4],
    },
  ]
};
*/

function App() {
  return (
    <>
      <div className="container">
        <SideBar />

        {/* <!--Begining dashboard section --> */}
        <div className="dashboard-container">
          <Header />
          <div className="dashboard">
            <Figures />

            {/* <!-- begining statistique area--> */}
            <div className="dashboard-statistique">
              <div className="network-activities">
                <p>VISUAL dashboard</p>
              </div>
              <div className="statistique">
                <div className="long-graph">
                  {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
                  <MainChart />
                </div>
                <div className="short-graph">
                  <MostOrderedItems />
                </div>
              </div>
            </div>
            <LowerDashboard />

          </div>
        </div>
      </div>

      <script src="longGraph.js"></script>
    </>
  );
}

export default App;
