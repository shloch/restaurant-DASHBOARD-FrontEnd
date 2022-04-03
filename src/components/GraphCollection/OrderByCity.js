import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import baseURL from '../../configBaseURL'


export class OrderBySex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cityStats: 0
    }
  }


  componentDidMount() {
    const path = '/shops/1/orderitems/orders_by_city'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          cityStats: apiData.results
        })
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  percentageCalculation(str) {
    return +str.split('%')[0]
  }

  render() {

    const { cityStats } = this.state

    const _bordeaux = (cityStats[0]) ? this.percentageCalculation(cityStats[0].percentage) : 0
    const _lyon = (cityStats[1]) ? this.percentageCalculation(cityStats[1].percentage) : 0
    const _marseille = (cityStats[2]) ? this.percentageCalculation(cityStats[2].percentage) : 0
    const _nice = (cityStats[3]) ? this.percentageCalculation(cityStats[3].percentage) : 0
    const _paris = (cityStats[4]) ? this.percentageCalculation(cityStats[4].percentage) : 0

    // ================data set options ===================
    const options = {
      chart: {
        type: "column",
      },
      title: {
        text: "Proportions des achats par villes",
      },
      subtitle: {
        text:
          'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Chiffres en %",
        },
      },
      legend: {
        enabled: false,
      },
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
          data: [
            {
              name: "Bordeaux",
              y: _bordeaux,
              drilldown: "Bordeaux",
            },
            {
              name: "Lyon",
              y: _lyon,
              drilldown: "Lyon",
            },
            {
              name: "Marseille",
              y: _marseille,
              drilldown: "Marseille",
            },
            {
              name: "Nice",
              y: _nice,
              drilldown: "Nice",
            },
            {
              name: "Paris",
              y: _paris,
              drilldown: "Paris",
            },
          ],
        },
      ],
    };

    // ===============================================
    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </>
    )
  }
}

export default OrderBySex
