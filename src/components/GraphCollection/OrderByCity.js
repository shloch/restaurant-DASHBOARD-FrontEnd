import React, { useState, useEffect, useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import baseURL from "../../configBaseURL";
import { ShopContext } from "../../shopContext";

export function OrderBySex() {
  const [cityStats, setCityStats] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { shopID, shopName } = useContext(ShopContext);

  useEffect(() => {
    const path = `/shops/${shopID}/orderitems/orders_by_city`;
    const fetchURL = baseURL + path;
    fetch(fetchURL)
      .then((Response) => Response.json())
      .then((apiData) => {
        setCityStats(apiData.results);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [shopID]);

  const percentageCalculation = (str) => {
    return +str.split("%")[0];
  };

  const getOptions = () => {
    const highchargsDisplayConfig = [];
    cityStats.map((cityStat) => {
      highchargsDisplayConfig.push({
        name: cityStat.city,
        y: percentageCalculation(cityStat.percentage),
        drilldown: cityStat.city,
      });
    });

    // ================data set options ===================
    const options = {
      chart: { type: "column" },
      title: {
        text: `Proportions des achats par villes en ${shopName}`,
      },
      subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
      },
      accessibility: {
        announceNewData: { enabled: true },
      },
      xAxis: { type: "category" },
      yAxis: {
        title: { text: "Chiffres en %" },
      },
      legend: { enabled: false },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%",
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },
      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: highchargsDisplayConfig,
        },
      ],
    };

    return options;
  };

  return (
    <div>
      {isLoading && <div> Loading... </div>}
      {cityStats && (
        <HighchartsReact highcharts={Highcharts} options={getOptions()} />
      )}
    </div>
  );
}

export default OrderBySex;
