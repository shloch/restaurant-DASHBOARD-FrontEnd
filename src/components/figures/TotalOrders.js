import React, { Component } from 'react'
import baseURL from '../../configBaseURL'

export class TotalOrders extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count: ''
    }
  }

  componentDidMount() {
    const path = '/shops/1/orders/total_orders'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          count: apiData.results
        })
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  render() {
    return (
      <>
        <span className="figure figure-four">
          <div className="total-females">
            <i className="fas fa-user"></i>
                Total Commandes
              </div>
          <h2>{this.state.count}</h2>
          <div className="percent">
            <i className="fas fa-sort-down"></i>
                par toutes les clients
          </div>
        </span>
      </>
    )
  }
}

export default TotalOrders
