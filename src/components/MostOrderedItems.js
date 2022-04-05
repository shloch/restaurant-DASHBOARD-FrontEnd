import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import baseURL from "../configBaseURL";

import { ShopContext } from "../shopContext";

export function MostOrderedItems() {
  const [itemsArr, setItemsArr] = useState(0);
  const { shopID } = useContext(ShopContext);

  useEffect(() => {
    const path = `/shops/${shopID}/items/most_ordered_items`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setItemsArr(apiData.results);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  const getItemArrAndPercentageArr = (originalArr) => {
    const isApiDataReady = !!originalArr[0];
    if (isApiDataReady) {
      const itemNames = [];
      const itemPercentages = [];
      for (let item of originalArr) {
        itemNames.push(item.itemName);
        itemPercentages.push(item.numberOfOrders);
      }
      return { itemNames, itemPercentages };
    } else {
      return 0;
    }
  };

  const getOptions = () => {
    const _itemsArr = getItemArrAndPercentageArr(itemsArr);
    console.log({ _itemsArr });

    // ================data set options ===================
    const options = {
      chart: {
        type: "bar",
      },
      title: {
        text: "Les 05 produits les plus commandés",
      },
      xAxis: {
        categories: _itemsArr.itemNames,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Nombre de commandes",
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: "normal",
        },
      },
      series: [
        {
          name: "",
          data: _itemsArr.itemPercentages,
        },
      ],
    };

    return options;
  };

  return <HighchartsReact highcharts={Highcharts} options={getOptions()} />;
}

export default MostOrderedItems;
