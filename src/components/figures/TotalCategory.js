import React, { useState, useEffect } from "react";
import baseURL from "../../configBaseURL";

export function TotalCategory() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const path = "/categories";
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setCategories(apiData.results);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  });

  function displayCatgories() {
    let allCategories = "";
    categories.forEach((cat) => {
      allCategories += cat.name + "/";
    });
    return allCategories;
  }

  return (
    <>
      {isLoading && "Loading..."}
      {categories && (
        <span className="figure figure-two">
          <div className="average-time">
            <i className="far fa-clock"></i>
            Total Categories
          </div>
          <h2>{categories.length}</h2>
          <div className="percent">
            <i className="fas fa-sort-down"></i>
            {displayCatgories()}
          </div>
        </span>
      )}
    </>
  );
}

export default TotalCategory;
