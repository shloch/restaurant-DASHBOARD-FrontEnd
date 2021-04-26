import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import baseURL from '../../configBaseURL'



export class OrderBySex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      female: 0,
      male: 0
    }
  }


  componentDidMount() {
    const path = '/orderitems/orders_by_sex'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          female: apiData.results[0],
          male: apiData.results[1]
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

    const male = !!this.state.male.percentage ? this.percentageCalculation(this.state.male.percentage) : 0
    const female = !!this.state.female.percentage ? this.percentageCalculation(this.state.female.percentage) : 0

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
              y: male,
              sliced: true,
              selected: true,
            },
            {
              name: "Femmes",
              y: female,
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
