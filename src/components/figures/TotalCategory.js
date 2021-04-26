import React, { Component } from 'react'
import Category from '../Category'
import { v4 as uuidv4 } from 'uuid';
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
    // const fetchURL = `https://api.themoviedb.org/3/discover/movie?api_key=ee652a4c10bbae4e71f91b8eb0d004ba&language=en-US`
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
    this.state.categories.map(cat => {
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
