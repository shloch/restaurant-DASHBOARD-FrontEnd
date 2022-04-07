import React, { useContext } from "react";
import { ShopContext } from "../shopContext";

export function Header() {
  const { shopName } = useContext(ShopContext);

  return (
    <div className="tittle">
      <h2>
        DASHBOARD Statistiques <span className="shop-name"> {shopName} </span>
      </h2>
    </div>
  );
}

export default Header;
