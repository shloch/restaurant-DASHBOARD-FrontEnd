import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import baseURL from '../configBaseURL'


export class MainChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemsArr: 0
    }
  }


  componentDidMount() {
    const path = '/items'
    const fetchURL = baseURL + path
    fetch(fetchURL)
      .then(Response => Response.json())
      .then(apiData => {
        this.setState({
          itemsArr: apiData.results
        })
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  reformatArray(originalArr) {
    const isApiDataReady = !!originalArr[0]
    if (isApiDataReady) {
      const items = []
      for (let item of originalArr) {
        items.push([item.name, item.price])
      }
      return items
    } else {
      return 0
    }
  }

  render() {

    const { itemsArr } = this.state

    const _itemsArr = this.reformatArray(itemsArr)



    // ================data set options ===================
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: 'Listes <br/> des <br/>produits <br/> + <br/> prix',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f} Euros</b>'
      },
      accessibility: {
        point: {
          valueSuffix: ' Euros'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: 15,
            style: {
              fontWeight: 'bold',
              color: 'black'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Prix',
        innerSize: '60%',
        data: _itemsArr
      }]
    };

    // ===============================================
    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </>
    )
  }
}

export default MainChart
