import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../shopContext";

export function Header() {
  const { shopID } = useContext(ShopContext);
  const [shop, setShop] = useState("FRANCE");

  useEffect(() => {
    shopID == 2 ? setShop("SPAIN") : setShop("FRANCE");
  }, [shopID]);

  return (
    <div className="tittle">
      <h2>
        DASHBOARD Statistiques <span className="shop-name"> {shop} </span>
      </h2>
    </div>
  );
}

export default Header;
