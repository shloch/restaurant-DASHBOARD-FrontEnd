import React, { useEffect, useState, useContext } from "react";
import baseURL from "../../configBaseURL";
import { ShopContext } from "../../shopContext";

export function TotalOrders() {
  const [count, setCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { shopID } = useContext(ShopContext);

  useEffect(() => {
    const path = `/shops/${shopID}/orders/total_orders`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setCount(apiData.results);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  return (
    <>
      {isLoading && "Loading..."}
      {count && (
        <span className="figure figure-four">
          <div className="total-females">
            <i className="fas fa-user"></i>
            Total Commandes
          </div>
          <h2>{count}</h2>
          <div className="percent">
            <i className="fas fa-sort-down"></i>
            par toutes les clients
          </div>
        </span>
      )}
    </>
  );
}

export default TotalOrders;
