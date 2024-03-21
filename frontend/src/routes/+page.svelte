<script>
  let profitColor = "red"
</script>

<div class="home">
  <div class="money">
    <p class="money-and-profit">1378$ <span class="profit" style="color: {profitColor};">(-10$; -0.87%)</span></p> 
    <p class="money-with-prefered-currency">1267 CHF</p>
  </div>
  <div class="assets">
    <p>Assets :</p>
  </div>
  <div class="line-chart">

  </div>
  <div class="history">
    
  </div>
</div>

<style>
  .home {
    display: grid;
    grid-template-rows: 7em 7em auto;
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
  }
  .money-and-profit {
    margin-bottom: 0.5rem;
    margin-top: 1.2rem;
  }
  .money-with-prefered-currency {
    margin: 0.5rem 0;
    color: #6c6c6c;
  }
  .assets {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    border-radius: 1.5rem;
    box-shadow: 0 0 20px rgb(174, 174, 174);
    font-size: 1.4em;
    padding-left: 2%;
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
</style>