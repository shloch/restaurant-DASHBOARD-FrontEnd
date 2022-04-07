import React from "react";
import PropTypes from "prop-types";

export function Category(props) {
  return props.category.name;
}

Category.propTypes = {
  category: PropTypes.number.isRequired,
};

export default Category;
