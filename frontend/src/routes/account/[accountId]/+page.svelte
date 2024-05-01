<script>
  export let data

  import { createData } from "./script"

  import Transactions from "./transactions.svelte"
  import Chart from "./chart.svelte";
  import Assets from "./assets.svelte";
  import Money from "./money.svelte";
  
  import { onMount } from 'svelte';
    import { updateChart } from "./chart";

  var balance = "Loading..."
  var balanceInLocalCurrency = ""
  
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

  

  var url = import.meta.env.VITE_BACKEND_URL
  onMount(async () => {
    let dataCreated = await createData(data, url)
    balanceHistoryArray = dataCreated.balanceHistoryArray
    transactions = dataCreated.transactions
    portfolio = dataCreated.portfolio
    assets = dataCreated.assets
    profit = dataCreated.profit
    profitColor = dataCreated.profitColor
    balance = dataCreated.balance
    balanceInLocalCurrency = dataCreated.balanceInLocalCurrency
    accounts = dataCreated.accounts

    updateChart("1W", "balance", balanceHistoryArray)
  })  
    
</script>

<div class="home">
  
  <Money balance={balance} profit={profit} profitColor={profitColor} balanceInLocalCurrency={balanceInLocalCurrency}/>
  <Assets assets={assets} portfolio={portfolio} />
  <Chart balanceHistoryArray={balanceHistoryArray}/>
  <Transactions transactions={transactions} accounts={accounts}/>
  
</div>
  
<style>

    @import "./style.css";

    @import "./money.css";
    @import "./assets.css";
    @import "./chart.css";
    @import "./transactions.css";
</style>