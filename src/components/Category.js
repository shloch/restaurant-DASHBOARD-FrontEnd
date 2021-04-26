import React, { Component } from 'react'

export class Category extends Component {
  render() {
    return (
      <>
        {this.props.category.name}
      </>
    )
  }
}

export default Category
