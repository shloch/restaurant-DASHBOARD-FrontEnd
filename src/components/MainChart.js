import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import baseURL from "../configBaseURL";
import { ShopContext } from "../shopContext";

export function MainChart() {
  const [isLoading, setIsLoading] = useState(true);
  const { shopID, shopName } = useContext(ShopContext);
  const [itemsArr, setItemsArr] = useState();

  useEffect(() => {
    const path = `/shops/${shopID}/items`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setItemsArr(apiData);
        setIsLoading(false);
        console.log({ apiData });
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  function reformatArray(originalArr) {
    if (originalArr) {
      const items = [];
      for (let item of originalArr) {
        items.push([item.name, item.price]);
      }
      return items;
    }
    setIsLoading(true);
    return;
  }

  const getOptions = () => {
    const _itemsArr = reformatArray(itemsArr);

    // ================data set options ===================
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: "Listes <br/> des <br/>produits <br/> + <br/> prix",
        align: "center",
        verticalAlign: "middle",
        y: 60,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f} Euros</b>",
      },
      accessibility: {
        point: {
          valueSuffix: " Euros",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: 15,
            style: {
              fontWeight: "bold",
              color: "black",
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ["50%", "75%"],
          size: "110%",
        },
      },
      series: [
        {
          type: "pie",
          name: "Prix",
          innerSize: "60%",
          data: _itemsArr,
        },
      ],
    };

    return options;
  };

  // ===============================================
  return (
    <>
      {isLoading && "isLoading.."}
      <h1> {shopName}</h1>
      {itemsArr && (
        <HighchartsReact highcharts={Highcharts} options={getOptions()} />
      )}
    </>
  );
}

export default MainChart;
