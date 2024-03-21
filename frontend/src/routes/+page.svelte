<script>
  let beneficeColor = "red"
</script>

<div class="home">
  <div class="money">
    <div class="inside-money">
      <p class="money-and-benefice">1378$ <span class="benefice" style="color: {beneficeColor};">(-10$; -0.87%)</span></p> 
      <p class="money-with-prefered-currency">1267 CHF</p>
    </div>
  </div>
  <div class="assets">

  </div>
  <div class="line-chart">

  </div>
  <div class="history">
    
  </div>
</div>

<style>
  .home {
    display: grid;
    grid-template-rows: calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30) calc(100% / 30);
    grid-template-columns: calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25) calc(100% / 25);
    width: calc(100vw - 10em);
  }
  .money {
    grid-row: 2 / 5;
    grid-column: 3 / 14;
    border-radius: 1.5rem;
    box-shadow: 0 0 20px rgb(174, 174, 174);
  }
  .inside-money {
    font-size: 1.5rem;
    margin: 0 1rem;
  }
  .money-and-benefice {
    margin-bottom: 0.5rem;
    margin-top: 1.2rem;
  }
  .money-with-prefered-currency {
    margin: 0.5rem 0;
    color: #6c6c6c;
  }
  .assets {
    grid-row: 7 / 10;
    grid-column: 3 / 14;
    border-radius: 1.5rem;
    box-shadow: 0 0 20px rgb(174, 174, 174);
  }
  .line-chart {
    grid-row: 12 / 29;
    grid-column: 3 / 14;
    border-radius: 1.5rem;
    box-shadow: 0 0 20px rgb(174, 174, 174);
  }
  .history {
    grid-row: 2 / 29;
    grid-column: 16 / 25;
    border-radius: 1.5rem;
    box-shadow: 0 0 20px rgb(174, 174, 174);
  }
</style>