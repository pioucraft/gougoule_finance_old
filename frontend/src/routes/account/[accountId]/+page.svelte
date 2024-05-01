<script>

  import Transactions from "./transactions.svelte"
  import Chart from "./chart.svelte";
  import Assets from "./assets.svelte";
  import Money from "./money.svelte";

  /* TODO */

  /*
    Plan for refactoring :

    Separate the html and css into five files (just the money you have, assets, chart and transactions)
    for js :  (fetch balancehistory, createchart and transactions)
  */
    export let data

    import axios from 'axios';
    import chart from 'chart.js/auto';
    
    import { onMount } from 'svelte';
    import { getCookie } from 'svelte-cookie';
  
    var balance = "Loading..."
    var balanceInLocalCurrency = ""
  
    var balanceHistoryChart
    
    var profitColor = "red"
    var profit = ""
  
    var portfolio = [["Loading...", 0]]
    var assets = [["Loading...", 100]]
    var balanceHistoryArray = []
  
    var transactions = [
      [
        "Wed Apr 03 2024",
        [
          {
            "id": 1,
            "amount": 0,
            "date": "2024-04-02T22:00:00.000Z",
            "type": "f",
            "symbol": "Loading...",
            "name": "Loading...",
            "accountid": 1
          }
        ]
        
      ]
      
    ]
  
    var accounts = {1: "Loading..."}
  
    var defaultCurrency = {
      "defaultcurrency": "USD",
      "price": 1
    }
  
    var selectedTimeStampForChart = "1W"
    var selectedTypeForChart = "balance"
  
    var xValues = ["Loading..."];
    var yValues = [0];
  
    var url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
      console.log("AHHHHH")
      let password = getCookie("password")
      let email = getCookie("email")
      let fetchBody = JSON.stringify({"email": email, "password": password})
      if(data.accountId != "main") {
        fetchBody = JSON.stringify({"email": email, "password": password, "account": data.accountId})
      }
      
  
  
      
      let balanceHistory = await axios.post(`${url}/api/getBalanceHistory`, fetchBody)
      defaultCurrency = (await axios.post(`${url}/api/defaultCurrency`, fetchBody)).data
      let listOfTransactions = (await axios.post(`${url}/api/getTransactions`, fetchBody)).data
      let fetchedAccounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data
      fetchedAccounts.forEach(fetchedAccount => {
        accounts[fetchedAccount.id] = fetchedAccount.name
      })

      transactions = []
      let listOfTransactionsDates = []

      listOfTransactions = listOfTransactions.sort((a, b) => (b.id - a.id))

      listOfTransactions.forEach(transaction => {
        let date = new Date(transaction.date).toDateString()
        if(!listOfTransactionsDates.includes(date)) {
          listOfTransactionsDates.push(date)
          transactions.push([date, []])
        } 
        transactions[listOfTransactionsDates.indexOf(date)][1].push(transaction)
      })
      
      balanceHistoryArray = balanceHistory.data.reverse().sort((a, b) => new Date(b.date) - new Date(a.date))
  
      balance = "$"+balanceHistoryArray[0].balance.toFixed(2)
      balanceInLocalCurrency = `${(balanceHistoryArray[0].balance * defaultCurrency.price).toFixed(2)} ${defaultCurrency.defaultcurrency}`
      try {
        let balanceDiference = (balanceHistoryArray[0].balance - balanceHistoryArray[1].balance).toFixed(2)
        let profitPercentage = ((balanceDiference / balanceHistoryArray[0].balance) * 100).toFixed(2)
        
        if(balanceDiference > 0){
          profitColor = "green"
        }
    
        profit = `(${balanceDiference}$; ${profitPercentage}%)`
      }
      catch(err) {
        profit = ""
      }
      
  
      portfolio = Object.entries(JSON.parse(balanceHistoryArray[0].portfolio))
      assets = [["Other", 0]]
      for(let asset of portfolio) {
        if(asset[1]/balanceHistoryArray[0].balance*100 < 10) {
          assets[0][1] += asset[1]/balanceHistoryArray[0].balance*100
        }
        else {
          assets.push([asset[0].split(":")[0], asset[1]/balanceHistoryArray[0].balance*100])
        }
        
      }
      assets = assets.sort((a, b) => b[1] - a[1])
  
      
      xValues = []
      yValues = []
      for(let i = 0; i<1000;i++) {
        xValues.push(i)
        yValues.push(Math.random()*i)
      }
      
      updateChart()
    })
    
    function changeTimeStamp(timeStamp) {
      selectedTimeStampForChart = timeStamp;
      let originalElement = document.getElementsByClassName("line-chart-bottom-selectedButton")[0]
      originalElement.classList.remove("line-chart-bottom-selectedButton")
      originalElement.classList.add("line-chart-bottom-unselectedButton")
  
      document.getElementById(`line-chart-bottom-selectedButton-${timeStamp}`).classList.add("line-chart-bottom-selectedButton")
      balanceHistoryChart.destroy()
      updateChart()
    }
  
    function changeChartType(type) {
      selectedTypeForChart = type
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
      
      updateChart()
    }
  
    
  
  
    function updateChart() {
  
      let numberOfDaysToDisplayInChart = 0
      if(selectedTimeStampForChart == "1W") numberOfDaysToDisplayInChart = 7
      else if(selectedTimeStampForChart == "1M") numberOfDaysToDisplayInChart = 30
      else if(selectedTimeStampForChart == "3M") numberOfDaysToDisplayInChart = 30*3
      else if(selectedTimeStampForChart == "6M") numberOfDaysToDisplayInChart = 30*6
      else if(selectedTimeStampForChart == "1Y") numberOfDaysToDisplayInChart = 365
      else if(selectedTimeStampForChart == "3Y") numberOfDaysToDisplayInChart = 365*3
      else if(selectedTimeStampForChart == "5Y") numberOfDaysToDisplayInChart = 365*5
      else if(selectedTimeStampForChart == "10Y") numberOfDaysToDisplayInChart = 365*10
      else if(selectedTimeStampForChart == "20Y") numberOfDaysToDisplayInChart = 365*20
      else if(selectedTimeStampForChart == "All") numberOfDaysToDisplayInChart = Infinity
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
  
    
  </script>
  
  <div class="home">
    
    <Money balance={balance} profit={profit} profitColor={profitColor} balanceInLocalCurrency={balanceInLocalCurrency}/>
    <Assets assets={assets} portfolio={portfolio} />
    <Chart changeChartType={changeChartType} changeTimeStamp={changeTimeStamp} />
    <Transactions transactions={transactions} accounts={accounts}/>
    
  </div>
  
<style>

    @import "./style.css";

    @import "./money.css";
    @import "./assets.css";
    @import "./chart.css";
    @import "./transactions.css";
</style>