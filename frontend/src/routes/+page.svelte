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
    <svg class="assets-svg" viewBox="0 0 100000 5000" height="5000">
      <rect rx="2000" ry="2000" style="fill:#fc7fe8;fill-opacity:1" x="0" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="10000" height="5000"></rect>
      <rect rx="2000" ry="2000" style="fill:#62cfff;fill-opacity:1" x="11000" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="50000" height="5000"></rect>
      <rect rx="2000" ry="2000" style="fill:#ffaf6e;fill-opacity:1" x="62000" y="0" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="38000" height="5000"></rect>
    </svg>
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
    padding-left: 2%
  }
  .money-and-profit {
    height: 30px;
    margin-top: calc(calc(5em - 60px) / 3);
    margin-bottom: calc(calc(5em - 60px) / 3);
  }
  .money-with-prefered-currency {
    height: 30px;
    margin-top: calc(calc(5em - 60px) / 3);
    margin-bottom: calc(calc(5em - 60px) / 3);
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
</style>