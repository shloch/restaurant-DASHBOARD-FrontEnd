import React, { useState, useEffect, useContext } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import baseURL from '../../configBaseURL'

import {ShopContext} from '../../shopContext'

export function OrderByAgeGroup() {
  const [adolescence, setAdolescenceAmount] = useState(0)
  const [adults, setAdultsAmount] = useState(0)
  const [youths, setYouthsAmount] = useState(0)
  const { shopID } = useContext(ShopContext)

  useEffect(() => {
    const path = `/shops/${shopID}/orderitems/spending_amounts_by_age_group`
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        setAdolescenceAmount(apiData.results[0]);
        setAdultsAmount(apiData.results[1])
        setYouthsAmount(apiData.results[2])
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }, [shopID])

  const percentageCalculation = (str) => {
    return +str.split('%')[0]
  }

  const ageGroupText = (ageGroupString) => {
    let age_group = ''
    if (ageGroupString === 'Adolescence') {
      age_group = 'Adolescentes (0-26 ans)'
    } else if (ageGroupString === 'Youths') {
      age_group = 'Jeunes (27-35 ans)'
    } else if (ageGroupString === 'Adults') {
      age_group = 'Adultes (+35 ans)'
    }
    return age_group
  }

  const constructObject = (obj) => {
    if (obj.percentage) {
      let obj2 = {
        percentage: percentageCalculation(obj.percentage),
        amount: obj.amount,
        total_orders: obj.total_orders,
        age_group: ageGroupText(obj.age_group)
      }
      return obj2
    } else {
      return 0
    }
  }

  const getOptions = () => {
    const _Adolescence = constructObject(adolescence)
    const _Adults = constructObject(adults)
    const _Youths = constructObject(youths)

    // ================data set options ===================
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Pourcentage des transactions par tranche d\'ages'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: `${_Adolescence.age_group} <br/>`,
            y: _Adolescence.percentage,
            sliced: true,
            selected: true
          },
          {
            name: `${_Adults.age_group} <br/>`,
            y: _Adults.percentage,
            sliced: true,
            selected: true
          },
          {
            name: `${_Youths.age_group} <br/>`,
            y: _Youths.percentage,
            sliced: true,
            selected: true
          }]
      }],
    };
    return options
  }

    return (
        <HighchartsReact highcharts={Highcharts} options={getOptions()} />
    )
}

export default OrderByAgeGroup
