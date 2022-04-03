import React, { Component } from 'react'
import baseURL from '../../configBaseURL'


export class TotalCategory extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      hasError: false
    }
  }

  componentDidMount() {
    const path = '/categories'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          categories: apiData.results
        })
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  render() {
    let allCategories = ''
    this.state.categories.forEach(cat => {
      allCategories += (cat.name ? cat.name + '/' : '')
    })

    return (
      <>
        <span className="figure figure-two">
          <div className="average-time">
            <i className="far fa-clock"></i>
                Total Categories
              </div>
          <h2>{this.state.categories.length}</h2>
          <div className="percent">
            <i className="fas fa-sort-down"></i>
            {allCategories}
          </div>
        </span>
      </>
    )
  }
}

export default TotalCategory
