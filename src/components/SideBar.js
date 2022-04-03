import React, { useEffect, useState, useContext} from 'react'
import baseURL from '../configBaseURL'
import {ShopContext} from '../shopContext';


// const options = {
//   chart: {
//     type: 'spline'
//   },
//   title: {
//     text: 'My chart'
//   },
//   series: [
//     {
//       data: [1, 2, 1, 4, 3, 6]
//     }
//   ]
// };

export function SideBar() {
  const [shops, setShops] = useState()
  const { shopID, changeShop } = useContext(ShopContext)
  // const obj = useContext(ShopContext)
  // console.log(JSON.stringify(obj))



  useEffect(() => {
    const path = '/shops'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        setShops(apiData.results)
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }, []);

  const showShops = (allShops) => {
    return allShops && allShops.map(shop => 
      (
      <span key={ shop.id} onClick={() => changeShop(shop.id)}>
            <a href="#">
              <i className="fas fa-home"></i>
              <p>{shop.name}</p>
          </a>
        </span>
      )
    )
  }

  return (
    <>
      {console.log(`my shop ==> ${shopID}`)}
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
          <div className="bottom-menu">
            {showShops(shops)}
            {/* <span>
              <a href="#">
                <i className="fab fa-wpforms"></i>
                <p>Forms</p>
              </a>
            </span>
            <span>
              <a href="#">
                <i className="fas fa-desktop"></i>
                <p>UI Element</p>
              </a>
            </span>
            <span>
              <a href="#">
                <i className="fas fa-table"></i>
                <p>Table</p>
              </a>
            </span>
            <span>
              <a href="#">
                <i className="fas fa-chart-line"></i>
                <p>Data Presentation</p>
              </a>
            </span>
            <h3>Live Statistiques</h3>
            <span>
              <a href="#">
                <i className="fas fa-bug"></i>
                <p>Additional pages</p>
              </a>
            </span>
            <span>
              <a href="#">
                <i className="far fa-window-restore"></i>
                <p>Extras</p>
              </a>
            </span>
            <span>
              <a href="#">
                <i className="fas fa-laptop"></i>
                <p>landing page</p>
              </a>
            </span> */}
          </div>
          {/* <! --side bar footer --> */}
          <div className="side-bar-footer">
            <a href="#"><i className="fas fa-cogs"></i></a>
            <a href="#"><i className="fas fa-compress-arrows-alt"></i></a>
            <a href="#"><i className="fas fa-power-off"></i></a>
          </div>
          {/* <! --end sidebar section --> */}
        </div>
      </>
    )
}

export default SideBar
