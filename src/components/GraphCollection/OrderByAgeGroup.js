import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import baseURL from '../../configBaseURL'


export class OrderByAgeGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Adolescence: 0,
      Adults: 0,
      Youths: 0
    }
  }

  componentDidMount() {
    const path = '/orderitems/spending_amounts_by_age_group'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          Adolescence: apiData.results[0],
          Adults: apiData.results[1],
          Youths: apiData.results[2]
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

  ageGroupText(ageGroupString) {
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

  constructObject(obj) {
    if (obj.percentage) {
      let obj2 = {
        percentage: this.percentageCalculation(obj.percentage),
        amount: obj.amount,
        total_orders: obj.total_orders,
        age_group: this.ageGroupText(obj.age_group)
      }
      return obj2
    } else {
      return 0
    }
  }

  render() {

    const { Adolescence, Adults, Youths } = this.state

    const _Adolescence = this.constructObject(Adolescence)
    const _Adults = this.constructObject(Adults)
    const _Youths = this.constructObject(Youths)

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

    // ===============================================
    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </>
    )
  }
}

export default OrderByAgeGroup
