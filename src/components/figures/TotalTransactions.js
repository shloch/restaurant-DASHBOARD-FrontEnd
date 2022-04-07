import React, { useState, useEffect, useContext } from "react";
import baseURL from "../../configBaseURL";
import { ShopContext } from "../../shopContext";

export function TotalTransactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();

  const { shopID, shopName } = useContext(ShopContext);

  useEffect(() => {
    const path = `/shops/${shopID}/orderitems`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setIsLoading(false);
        setCount(apiData && apiData.results);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  return (
    <>
      {isLoading && "Loading.."}
      {count && (
        <span className="figure figure-six">
          <div className="total-connection">
            <i className="fas fa-user"></i>
            Total Transactions {shopName}
          </div>
          <h2>{count}</h2>
          <div className="percent" style={{ color: "green" }}>
            <i className="fas fa-sort-up"></i>
            (pour tous les clients et toutes les commandes)
          </div>
        </span>
      )}
    </>
  );
}

export default TotalTransactions;
