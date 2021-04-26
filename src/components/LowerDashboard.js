import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import OrderBySex from './GraphCollection/OrderBySex'
import OrderByCity from './GraphCollection/OrderByCity'


export class LowerDashboard extends Component {
  render() {
    return (
      <>
        {/* <!--begining section for other graphs --> */}
        <div className="dashboard-graphs">
          <div className="upper-graph upper-graph1">
            <OrderBySex />
          </div>
          <div className="upper-graph upper-graph2">
            <OrderByCity />
          </div>
          <div className="upper-graph upper-graph3">upper graph 3</div>
          <div className="lower-graph lower-graph1">lower graph 1</div>
          <div className="lower-graph lower-graph2">lower graph 2</div>
          <div className="lower-graph lower-graph3">lower graph 3</div>
        </div>
        {/* <!-- end section other graphs --> */}
      </>
    )
  }
}

export default LowerDashboard
