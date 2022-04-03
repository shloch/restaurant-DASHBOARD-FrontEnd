import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import baseURL from '../configBaseURL'


export class MostOrderedItems extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemsArr: 0
    }
  }


  componentDidMount() {
    const path = '/shops/1/items/most_ordered_items'
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

  getItemArrAndPercentageArr(originalArr) {
    const isApiDataReady = !!originalArr[0]
    if (isApiDataReady) {
      const itemNames = []
      const itemPercentages = []
      for (let item of originalArr) {
        itemNames.push(item.itemName)
        itemPercentages.push(item.numberOfOrders)
      }
      return { itemNames, itemPercentages }
    } else {
      return 0
    }
  }

  render() {

    const { itemsArr } = this.state

    const _itemsArr = this.getItemArrAndPercentageArr(itemsArr)
    // const test = (_itemsArr.length) ? [..._itemsArr.item] : 0
    //console.log(_itemsArr.itemNames)


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

    // ===============================================
    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </>
    )
  }
}

export default MostOrderedItems
