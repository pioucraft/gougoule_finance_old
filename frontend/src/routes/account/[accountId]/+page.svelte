<script>
    export let data

    import axios from 'axios';
    import Chart from 'chart.js/auto';
    
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
      
      
      balanceHistoryChart = new Chart("lineChart", {
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
    <div class="money">
      <p class="money-and-profit">{balance} <span class="profit" style="color: {profitColor};">{profit}</span></p> 
      <p class="money-with-prefered-currency">{balanceInLocalCurrency}</p>
    </div>
    <div class="assets">
      <p>Assets :</p>
      <div id="assets-graph">
        {#each assets as asset}
          <div style="width: {asset[1]}%;" class="assets-{assets.indexOf(asset)} asset"><p>{asset[0]}</p></div>
        {/each}
      </div>

      <div class="assets-hover">
        <ul>
          {#each portfolio as asset}
            <li>{asset[0].split(":")[0]} : {asset[1].toFixed(2)} USD</li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="line-chart">
      <div id="line-chart-top">
        <h3>Graphs : </h3>
        <div id="line-chart-top-buttons">
          <button class="line-chart-top-button line-chart-top-button-selected" id="line-chart-top-buttons-balance" on:click={() => changeChartType("balance")}>Balance</button>
          <button class="line-chart-top-button line-chart-top-button-unselected" id="line-chart-top-buttons-fiat" on:click={() => changeChartType("fiat")}>Fiat</button>
        </div>
      </div>
      <div id="line-chart-middle">
        <canvas id="lineChart"></canvas> 
      </div>
      
      <div id="line-chart-bottom">
        <div id="line-chart-bottom-buttons">
          <button class="line-chart-bottom-selectedButton" id="line-chart-bottom-selectedButton-1W" on:click={() => changeTimeStamp("1W")}>1W</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-1M" on:click={() => changeTimeStamp("1M")}>1M</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-3M" on:click={() => changeTimeStamp("3M")}>3M</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-6M" on:click={() => changeTimeStamp("6M")}>6M</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-1Y" on:click={() => changeTimeStamp("1Y")}>1Y</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-3Y" on:click={() => changeTimeStamp("3Y")}>3Y</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-5Y" on:click={() => changeTimeStamp("5Y")}>5Y</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-10Y" on:click={() => changeTimeStamp("10Y")}>10Y</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-20Y" on:click={() => changeTimeStamp("20Y")}>20Y</button>
          <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-All" on:click={() => changeTimeStamp("All")}>All</button>
        </div>
      </div>
    </div>
    <div class="history">
        {#each transactions as transactionsOnDate}
          <div class="history-date">
            <p>{transactionsOnDate[0]}</p>
            {#each transactionsOnDate[1] as transaction}
              <div class="history-transaction">
                {#if (transaction.amount > 0)}
                  <h3 style="color: green;">{transaction.amount} {transaction.symbol}</h3>
                {:else}
                  <h3 style="color: red;">{transaction.amount} {transaction.symbol}</h3>
                {/if}
                
                <h4>{transaction.name}</h4>
                
                <div>
                  <h4>{new Date(transaction.date).toDateString()}</h4>
                  <h4 style="color: gray;">{accounts[transaction.accountid]}</h4>
                </div>
              </div>
            {/each}
          </div>
            
        {/each}
    </div>
  </div>
  
  <style>
    .home {
      display: grid;
      grid-template-rows: 4em 7em auto;
      grid-template-columns: auto 30em;
      width: calc(100vw - 10em);
      gap: 4%;
      padding: 2%;
      padding-left: 4%;
    }
    .money {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      border-radius: 1.5rem;
      box-shadow: 0 0 20px rgb(174, 174, 174);
      font-size: 1.4em;
      padding-left: 2%;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
    }
    .money-with-prefered-currency {
      color: #6c6c6c;
    }
    .assets {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      border-radius: 1.5rem;
      box-shadow: 0 0 20px rgb(174, 174, 174);
      font-size: 1.4em;
      padding-left: 2%;
      padding-right: 2%;
      display: flex;
      flex-direction: column;
    }
    .line-chart {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
      border-radius: 1.5rem;
      box-shadow: 0 0 20px rgb(174, 174, 174);
    }
  
    .history {
      grid-row: 1 / 4;
      grid-column: 2 / 3;
      border-radius: 1.5rem;
      box-shadow: 0 0 20px rgb(174, 174, 174);
    }
  
    .assets p {
      margin-bottom: 0.3em;
      margin-top: 1rem;
    }
  
    .line-chart {
      display: grid;
      grid-template-rows: 5rem auto 5rem;
      padding-top: 0.5rem;
    }
  
    #line-chart-top {
      display: grid;
      grid-template-columns: 0.5fr 1fr;
      align-items: center;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  
    #line-chart-top-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      background-color: #ececec;
      border-radius: 0.7rem;
      padding: 0.5rem;
      gap: 0.5rem;
    }
  
    .line-chart-top-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0.4em;
      border-radius: 0.7em;
      text-align: center;
      color: inherit;
      text-decoration: none;
      transition: background-color 0.2s ease-in-out;
      font-size: larger;
    }
  
    .line-chart-top-button-unselected {
      background-color: transparent;
    }
  
    .line-chart-top-button-unselected:hover {
      background-color: white;
    }
  
    .line-chart-top-button-selected {
      background-color: white;
    }
  
    #line-chart-middle canvas {
      max-width: 95%;
      height: 100%;
    }
  
    #line-chart-middle {
      display: flex;
      justify-content: center;
      align-items: center;
    } 
  
    #line-chart-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    #line-chart-bottom-buttons {
      width: 90%;
      height: 2rem;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      padding: 0.5rem;
      gap: 0.3rem;
      background-color: #ececec;
      border-radius: 0.7em;
    }
  
    .line-chart-bottom-unselectedButton {
      border-radius: 0.5rem;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: large;
    }
  
    .line-chart-bottom-unselectedButton:hover {
      background-color: white;
    }
  
    .line-chart-bottom-selectedButton {
      background-color: white;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-size: large;
    }
  
    .history {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      padding: 2rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .history-date {
      width: 100%;
      border-radius: 1.5rem;
      background-color: #f7f7f7;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
    }
  
    .history-transaction {
      border-radius: 1rem;
      background-color: white;
      padding: 1rem;
      padding-left: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  
    .history-transaction div, .history-transaction h3, .history-transaction h4 {
      margin: 0;
    }
  
    .history-transaction div {
      display: flex;
      flex-direction: row;
      gap: 2rem;
    }
  
    #assets-graph {
      background-color: #ececec;
      width: 100%;
      height: 3rem;
      border-radius: 0.7rem;
      display: flex;
      gap: 0.3rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      align-items: center;
      margin-bottom: 0.5rem;
      width: 96%;
      align-self: center;
    }
  
    .asset {
      border-radius: 0.7rem;
      height: 2.3rem;
      font-size: large;
      
      display: flex;
      justify-content: center;
      align-items: center;
  
    }
  
    .asset p {
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

  .assets-hover {
    display: none;
  }

  #assets-graph:hover + .assets-hover {
    display: flex;
    background-color: #6c6c6c;
    color: #ececec;
    padding: 1rem;
    border-radius: 0.7rem;
    top: 1vh;
    z-index: 1;
  }
  
    .assets-0 {
      background-color: aqua;
    }
    .assets-1 {
      background-color: red;
    }
    .assets-2 {
      background-color: pink;
    }
    .assets-3 {
      background-color: greenyellow;
    }
    .assets-4 {
      background-color: yellow;
    }
    .assets-5 {
      background-color:azure;
    }
    .assets-6 {
      background-color:chocolate;
    }
    .assets-7 {
      background-color:steelblue;
    }
    .assets-8 {
      background-color:orange;
    }
    .assets-9 {
      background-color:darksalmon;
    }
  
    @media (max-width: 75rem) {
  
      .home {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 100vw;
      }
  
      .history {
        overflow: visible;
        margin-bottom: 10rem;
      }
  
      .money {
        flex-direction: column;
        align-items: start;
        padding: 0.6rem;
      }
  
      .money * {
        margin: 0;
      }

      #line-chart-bottom-buttons button {
        font-size: small;
      }
    }
  
  </style>