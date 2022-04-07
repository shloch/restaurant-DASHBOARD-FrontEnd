import React, { useState, useEffect, useContext } from "react";
import baseURL from "../../configBaseURL";
import { ShopContext } from "../../shopContext";

export function HighestSpender() {
  const [client, setClint] = useState();
  const { shopID } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = `/shops/${shopID}/orderitems/highest_spender`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setClint(apiData && apiData.results[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  return (
    <>
      {isLoading && "Loading.."}
      {client && (
        <span className="figure figure-five">
          <div className="total-collection">
            <i className="fas fa-user"></i>
            Le plus gros achat par:
          </div>
          <h2> {client.client_name}</h2>
          <div className="percent">
            <i className="fas fa-sort-up"></i>
            Montant: <strong> {client.amount} Euros </strong>
          </div>
        </span>
      )}
    </>
  );
}

export default HighestSpender;
