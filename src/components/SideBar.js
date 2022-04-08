import React, { useEffect, useState, useContext } from "react";
import baseURL from "../configBaseURL";
import { ShopContext } from "../shopContext";

export function SideBar() {
  const [shops, setShops] = useState();
  const { changeShop } = useContext(ShopContext);

  useEffect(() => {
    const path = "/shops";
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setShops(apiData.results);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, []);

  const showShops = (allShops) => {
    return (
      allShops &&
      allShops.map((shop) => (
        <span key={shop.id} onClick={() => changeShop(shop.id)}>
          <a href="#">
            <i className="fas fa-home"></i>
            <p>{shop.name}</p>
          </a>
        </span>
      ))
    );
  };

  return (
    <>
      <div className="side-bar-container">
        <div className="top-menu">
          <h2>Dashbord Menu</h2>
          <div className="welcome-menu">
            <span className="profile-icon">
              <i className="fas fa-user-circle fa-3x"></i>
              <p>General</p>
            </span>
            <span className="welcome">
              <p>Welcome,</p>
              <p>to your menu</p>
            </span>
          </div>
        </div>
        <hr />
        <div className="bottom-menu">{showShops(shops)}</div>
        {/* <! --side bar footer --> */}
        <div className="side-bar-footer">
          <a href="#">
            <i className="fas fa-cogs"></i>
          </a>
          <a href="#">
            <i className="fas fa-compress-arrows-alt"></i>
          </a>
          <a href="#">
            <i className="fas fa-power-off"></i>
          </a>
        </div>
        {/* <! --end sidebar section --> */}
      </div>
    </>
  );
}

export default SideBar;
