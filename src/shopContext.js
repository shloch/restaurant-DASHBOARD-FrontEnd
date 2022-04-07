import React, { useState } from "react";
import PropTypes from "prop-types";

const ShopContext = React.createContext();
//const FRANCEID = 1;
const SPAINID = 2;

function ShopContextProvider(props) {
  const [shopID, setShopID] = useState("1");
  const [shopName, setShopName] = useState("FRANCE");

  function changeShop(newShopID) {
    setShopID(newShopID);
    newShopID == SPAINID ? setShopName("SPAIN") : setShopName("FRANCE");
  }

  return (
    <ShopContext.Provider value={{ shopID, changeShop, shopName }}>
      {props.children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node,
};

export { ShopContextProvider, ShopContext };
