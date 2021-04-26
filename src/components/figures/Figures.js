import React, { Component } from 'react'
import TotalUsers from './TotalUsers'
import TotalOrders from './TotalOrders'
import TotalCategory from './TotalCategory'
import TotalItems from './TotalItems'
import HighestSpender from './HighestSpender'

export class Figures extends Component {
  render() {
    return (
      <>
        {/* <!--Begining dashboard figures section --> */}
        <div className="dashboard-figures">
          <TotalUsers />
          <TotalCategory />
          <TotalItems />
          <TotalOrders />
          <HighestSpender />

          <span className="figure figure-six">
            <div className="total-connection">
              <i className="fas fa-user"></i>
                Total Connection
              </div>
            <h2>2500</h2>
            <div className="percent" style={{ color: "red" }}>
              <i className="fas fa-sort-up"></i>
                37% from last week
              </div>
          </span>
        </div>
        {/* <!--end dashboard figures section --> */}
      </>
    )
  }
}

export default Figures
