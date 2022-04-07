import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import baseURL from "../../configBaseURL";

import { ShopContext } from "../../shopContext";

export function OrderBySex() {
  const [female, setFemale] = useState();
  const [male, setMale] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { shopID } = useContext(ShopContext);

  useEffect(() => {
    const path = `/shops/${shopID}/orderitems/orders_by_sex`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setFemale(apiData && apiData.results[0]);
        setMale(apiData && apiData.results[1]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  const percentageCalculation = (str) => {
    return str && +str.split("%")[0];
  };

  const getOptions = () => {
    const _male = male && percentageCalculation(male.percentage);
    const _female = female && percentageCalculation(female.percentage);

    // ================data set options ===================
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Consommation par Sexe",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "commandes",
          colorByPoint: true,
          data: [
            {
              name: "Hommes",
              y: _male,
              sliced: true,
              selected: true,
            },
            {
              name: "Femmes",
              y: _female,
            },
          ],
        },
      ],
    };
    return options;
  };

  return (
    <div>
      {isLoading && <div> Loading... </div>}
      {male && female && (
        <HighchartsReact highcharts={Highcharts} options={getOptions()} />
      )}
    </div>
  );
}

export default OrderBySex;
