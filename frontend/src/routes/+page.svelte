<script>
  let profitColor = "red"
</script>

<div class="home">
  <div class="money">
    <div class="inside-money">
      <p class="money-and-profit">1378$ <span class="profit" style="color: {profitColor};">(-10$; -0.87%)</span></p> 
      <p class="money-with-prefered-currency">1267 CHF</p>
    </div>
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
    grid-template-rows: 7em 5em auto;
    grid-template-columns: calc(100% / 2) auto;
    width: calc(100vw - 10em);
    gap: 3%;
    padding: 1%;
  }
  .money {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    border-radius: 1.5rem;
    box-shadow: 0 0 20px rgb(174, 174, 174);
  }
  .inside-money {
    font-size: 1.5rem;
    margin: 0 1rem;
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