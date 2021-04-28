import React, { Component } from 'react'
import TotalUsers from './TotalUsers'
import TotalOrders from './TotalOrders'
import TotalCategory from './TotalCategory'
import TotalItems from './TotalItems'
import HighestSpender from './HighestSpender'
import TotalTransactions from './TotalTransactions'

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
          <TotalTransactions />
        </div>
        {/* <!--end dashboard figures section --> */}
      </>
    )
  }
}

export default Figures
