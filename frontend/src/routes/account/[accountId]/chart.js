import chart from 'chart.js/auto';
import { writable } from 'svelte/store';

var balanceHistoryChart;
export const firstAndLastDate = writable([])

export function changeTimeStamp(timeStamp, selectedTypeForChart, balanceHistoryArray) {
    
    let originalElement = document.getElementsByClassName("line-chart-bottom-selectedButton")[0]
    originalElement.classList.remove("line-chart-bottom-selectedButton")
    originalElement.classList.add("line-chart-bottom-unselectedButton")

    document.getElementById(`line-chart-bottom-selectedButton-${timeStamp}`).classList.add("line-chart-bottom-selectedButton")
    balanceHistoryChart.destroy()
    updateChart(timeStamp, selectedTypeForChart, balanceHistoryArray)

    return timeStamp
}

export function changeChartType(type, selectedTimeStampForChart, balanceHistoryArray) {
    if(type == "balance") {
      document.getElementById("line-chart-top-buttons-fiat").classList.remove("line-chart-top-button-selected")
      document.getElementById(`line-chart-top-buttons-fiat`).classList.add("line-chart-top-button-unselected")

      document.getElementById("line-chart-top-buttons-balance").classList.remove("line-chart-top-button-unselected")
      document.getElementById(`line-chart-top-buttons-balance`).classList.add("line-chart-top-button-selected")
    }
    else {
      document.getElementById("line-chart-top-buttons-balance").classList.remove("line-chart-top-button-selected")
      document.getElementById(`line-chart-top-buttons-balance`).classList.add("line-chart-top-button-unselected")

      document.getElementById("line-chart-top-buttons-fiat").classList.remove("line-chart-top-button-unselected")
      document.getElementById(`line-chart-top-buttons-fiat`).classList.add("line-chart-top-button-selected")
    }
    balanceHistoryChart.destroy()
    
    updateChart(selectedTimeStampForChart, type, balanceHistoryArray)

    return type
}

  


export function updateChart(selectedTimeStampForChart, selectedTypeForChart, balanceHistoryArray) {
  let xValues = []
  let yValues = []
  let numberOfDaysToDisplayInChart = 0
  let timeStampToNumberOfDaysToDisplayInChart = {"1W": 7, "1M": 30, "3M": 30*3, "6M": 30*6, "1Y": 365, "3Y": 365*3, "5Y": 365*5, "10Y": 365*10, "20Y": 365*20, "All": Infinity}
  numberOfDaysToDisplayInChart = timeStampToNumberOfDaysToDisplayInChart[selectedTimeStampForChart]

  let historyOfTheMoneyYouHave = []

  for(let i=0;i<numberOfDaysToDisplayInChart && i<balanceHistoryArray.length;i++) {
    if(selectedTypeForChart == "balance") {
      let date = new Date(balanceHistoryArray[i].date)
      historyOfTheMoneyYouHave.push([date.toDateString(), balanceHistoryArray[i].balance])
    }
    else {
      let date = new Date(balanceHistoryArray[i].date)
      historyOfTheMoneyYouHave.push([date.toDateString(), 0])
      let portfolio = Object.entries(JSON.parse(balanceHistoryArray[i].portfolio))
      portfolio.forEach(element => {
        if(element[0].split(":")[1] == "f") historyOfTheMoneyYouHave[historyOfTheMoneyYouHave.length-1][1] += element[1]
      })
    }
  }
  historyOfTheMoneyYouHave = historyOfTheMoneyYouHave.reverse()
  xValues = historyOfTheMoneyYouHave.map(element => element[0])
  yValues = historyOfTheMoneyYouHave.map(element => element[1])
  firstAndLastDate.set([xValues[0], xValues[xValues.length-1]])

  let borderColor = "#fc847b"

  if(historyOfTheMoneyYouHave[0][1] < historyOfTheMoneyYouHave[historyOfTheMoneyYouHave.length-1][1]) borderColor = "green"
  
  
  balanceHistoryChart = new chart("lineChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        borderColor: borderColor,
        data: yValues
      }]
    },
    options: {
      elements: {
        point: {
          pointStyle: false
        },
        line: {
          tension: 0.2
        }
      },
      scales: {
        x: {
          ticks: {
            callback: 
            function () {
              return undefined
            }
          },
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        y: {
          ticks: {
            maxTicksLimit: 4,
            font: {
              size: 14,
            },
            "color": "black",
            callback: function(value, index, ticks) {
              //return undefined
              return '$' + value;
            },
            mirror: true,
            z: 1
          },
          grid: {
            display: false
          },
          border: {
            display: false
          },
          
        }
      },
      plugins: { 
        legend: { display: false },
        tooltip: { 
          enabled: true
        },
        filler: {
          propagate: true
        }
      }
    }
  });
}