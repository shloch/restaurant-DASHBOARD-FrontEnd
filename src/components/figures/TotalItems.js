import React, { useState, useContext, useEffect } from "react";

import baseURL from "../../configBaseURL";
import { ShopContext } from "../../shopContext";

export function TotalItems() {
  const { shopID } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsCount, setItemsCount] = useState();

  useEffect(() => {
    const path = `/shops/${shopID}/items`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setItemsCount(apiData);
        setIsLoading(false);
        console.log({ apiData });
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  return (
    <>
      {isLoading && "Loading..."}
      {itemsCount && (
        <span className="figure figure-four">
          <div className="total-females">
            <i className="fas fa-user"></i>
            Total Produits
          </div>
          <h2>{itemsCount.length}</h2>
        </span>
      )}
    </>
  );
}

export default TotalItems;
