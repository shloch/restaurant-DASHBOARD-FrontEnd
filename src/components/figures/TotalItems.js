import React, { Component } from 'react'
import baseURL from '../../configBaseURL'

export class TotalItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: ''
    }
  }

  componentDidMount() {
    const path = '/items'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          items: apiData.results
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
                Total Produits
              </div>
          <h2>{this.state.items.length}</h2>
        </span>
      </>
    )
  }
}

export default TotalItems
