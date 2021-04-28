import React, { Component } from 'react'
import baseURL from '../../configBaseURL'

export class TotalTransactions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count: ''
    }
  }

  componentDidMount() {
    const path = '/orderitems'
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
        <span className="figure figure-six">
          <div className="total-connection">
            <i className="fas fa-user"></i>
                Total Transactions
              </div>
          <h2>{this.state.count}</h2>
          <div className="percent" style={{ color: "green" }}>
            <i className="fas fa-sort-up"></i>
                (pour tous les clients et toutes les commandes)
              </div>
        </span>
      </>
    )
  }
}

export default TotalTransactions
