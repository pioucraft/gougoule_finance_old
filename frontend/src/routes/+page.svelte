<script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';

  let balance = "Loading..."
  let balanceInLocalCurrency = "Loading..."

  let url = import.meta.env.VITE_BACKEND_URL
  onMount(async () => {
    let password = getCookie("password")
    let email = getCookie("email")
    let fetchBody = JSON.stringify({"email": email, "password": password})

    let balanceHistory = await axios.post(`${url}/api/getBalanceHistory`, fetchBody)
    let defaultCurrency = await axios.post(`${url}/api/defaultCurrency`, fetchBody)

    balance = "$"+balanceHistory.data[0].balance.toFixed(2)
    balanceInLocalCurrency = `${balanceHistory.data[0].balance * defaultCurrency.data.price} ${defaultCurrency.data.defaultcurrency}`
    
    console.log(balanceHistory)
    console.log(defaultCurrency)

    const xValues = ["Italy", "", "", "", "", "Italy", "", "", "", "", "Italy", "", "", "", "", "Italy", "", "", "", "", "Italy", "", "", "", "", "Italy", "", "", "", ""];
    const yValues = [55, 54, 53, 52, 51, 52, 50, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 30, 37, 35, 34, 34, 33, 34, 35, 32, 30, 31, 25, 30];
    let borderColor = "#fc847b"
    const myChart = new Chart("lineChart", {
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
            enabled: true,
            callbacks: {
              label: function (context) { // Use 'context' instead of tooltipItem/data
                let country = xValues[context.dataIndex];
                let value = yValues[context.dataIndex];

                return `You spent ${context.dataIndex}`;
              }
            }
          }
        }
        }
    });
  })
  


  let profitColor = "red"
</script>

<div class="home">
  <div class="money">
    <p class="money-and-profit">{balance} <span class="profit" style="color: {profitColor};">(-10$; -0.87%)</span></p> 
    <p class="money-with-prefered-currency">{balanceInLocalCurrency}</p>
  </div>
  <div class="assets">
    <p>Assets :</p>
    <svg class="assets-svg" viewBox="0 0 100000 5000" height="5000">
      <rect rx="2000" ry="2000" style="fill:#fc7fe8;fill-opacity:1" x="0" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="10000" height="5000"></rect>
      <rect rx="2000" ry="2000" style="fill:#62cfff;fill-opacity:1" x="11000" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="50000" height="5000"></rect>
      <rect rx="2000" ry="2000" style="fill:#ffaf6e;fill-opacity:1" x="62000" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="38000" height="5000"></rect>
    </svg>
  </div>
  <div class="line-chart">
    <div id="line-chart-top">
      <h3>Graphs : </h3>
      <div id="line-chart-top-buttons">
        <button class="line-chart-top-button" style="background-color: white;" id="line-chart-top-buttons-balance">Balance</button>
        <button class="line-chart-top-button" id="line-chart-top-buttons-fiat">Fiat</button>
      </div>
    </div>
    <div id="line-chart-middle">
      <canvas id="lineChart"></canvas> 
    </div>
    
    <div id="line-chart-bottom">
      <div id="line-chart-bottom-buttons">
        <button class="line-chart-bottom-selectedButton">1W</button>
        <button class="line-chart-bottom-unSelectedButton">1M</button>
        <button class="line-chart-bottom-unSelectedButton">3M</button>
        <button class="line-chart-bottom-unSelectedButton">6M</button>
        <button class="line-chart-bottom-unSelectedButton">1Y</button>
        <button class="line-chart-bottom-unSelectedButton">3Y</button>
        <button class="line-chart-bottom-unSelectedButton">5Y</button>
        <button class="line-chart-bottom-unSelectedButton">10Y</button>
        <button class="line-chart-bottom-unSelectedButton">20Y</button>
        <button class="line-chart-bottom-unSelectedButton">All</button>
      </div>
    </div>
  </div>
  <div class="history">
    <div class="history-transaction">
      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      

      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      

      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>

    <div class="history-transaction">
      <h3 style="color: red;">-13.5 CHF</h3>
      <h4>Buy potatoes</h4>
      
      <div>
        <h4>March 21st 2024</h4>
        <h4 style="color: gray;">Account 1</h4>
      </div>
    </div>
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
    justify-content: center;
    margin-bottom: 0.3em;
  }

  .assets-svg {
    max-width: 100%;
    height: 1.8em;
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

  .line-chart-top-button:hover {
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

  .line-chart-bottom-unSelectedButton {
    border-radius: 0.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: large;
  }

  .line-chart-bottom-unSelectedButton:hover {
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
    padding: 2.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .history-transaction {
    border-radius: 1rem;
    width: 100%;
    box-shadow: 0px 0px 1rem rgb(88, 88, 88);
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
</style>