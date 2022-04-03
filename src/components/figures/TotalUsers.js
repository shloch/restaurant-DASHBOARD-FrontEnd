import React, { Component } from 'react'
import baseURL from '../../configBaseURL'

export class TotalUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userCount: ''
    }
  }

  componentDidMount() {
    const path = 'clients/total_clients'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          userCount: apiData.results
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
        <span className="figure figure-one">
          <div className="total-users">
            <i className="fas fa-user"></i>
                Total Clients
              </div>
          <h2>{this.state.userCount}</h2>
          <div className="percent">
            <i className="fas"></i>
                avec un compte
          </div>
        </span>
      </>
    )
  }
}

export default TotalUsers
