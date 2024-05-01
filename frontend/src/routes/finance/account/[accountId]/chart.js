import chart from 'chart.js/auto';

var balanceHistoryChart;

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
    console.log(historyOfTheMoneyYouHave)
    xValues = historyOfTheMoneyYouHave.map(element => element[0])
    yValues = historyOfTheMoneyYouHave.map(element => element[1])

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
          backgroundColor: "#ff797986",
        plugins: { 
          legend: { display: false },// Specify the 'plugins' section
          tooltip: { 
            enabled: false
          }
        }
        }
    });
}