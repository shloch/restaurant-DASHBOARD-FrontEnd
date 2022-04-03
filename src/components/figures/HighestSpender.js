import React, { Component } from 'react'
import baseURL from '../../configBaseURL'


export class HighestSpender extends Component {

  constructor(props) {
    super(props)

    this.state = {
      client: ''
    }
  }

  componentDidMount() {
    const path = '/shops/1/orderitems/highest_spender'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          client: apiData.results[0]
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
        <span className="figure figure-five">
          <div className="total-collection">
            <i className="fas fa-user"></i>
                Le plus gros achat par:
              </div>
          <h2> {this.state.client.client_name}</h2>
          <div className="percent">
            <i className="fas fa-sort-up"></i>
                Montant: <strong> {this.state.client.amount} Euros </strong>
          </div>
        </span>
      </>
    )
  }
}

export default HighestSpender
