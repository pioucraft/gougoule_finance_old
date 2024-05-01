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

<script>
    export let changeTimeStamp 
    export let changeChartType
</script>