import React, { Component } from 'react'
import baseURL from '../../configBaseURL'

export class TotalItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: 0
    }
  }

  componentDidMount() {
    const path = '/shops/1/items'
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
    //console.log(`items ----> ${JSON.stringify(Array.isArray(this.state.items))}`)
    const { items } = this.state
    
    return (
      <>
        <span className="figure figure-four">
          <div className="total-females">
            <i className="fas fa-user"></i>
                Total Produits
              </div>
          <h2>{items ? items : 0}</h2>
        </span>
      </>
    )
  }
}

export default TotalItems
