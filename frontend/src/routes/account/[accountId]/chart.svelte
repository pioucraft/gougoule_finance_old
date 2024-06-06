<div class="line-chart">
    <div id="line-chart-top">
        <p class="text-2xl font-semibold">Graphs : </p>
        <div id="line-chart-top-buttons">
        <button class="line-chart-top-button line-chart-top-button-selected" id="line-chart-top-buttons-balance" on:click={() => selectedTypeForChart = changeChartType("balance", selectedTimeStampForChart, balanceHistoryArray)}>Balance</button>
        <button class="line-chart-top-button line-chart-top-button-unselected" id="line-chart-top-buttons-fiat" on:click={() => selectedTypeForChart = changeChartType("fiat", selectedTimeStampForChart, balanceHistoryArray)}>Fiat</button>
        </div>
    </div>
    <div id="line-chart-middle">
        <canvas id="lineChart"></canvas> 
        <div class="flex flex-row justify-between w-11/12 align-middle">
            <p>{$firstAndLastDate[0]}...</p>
            <p>...{$firstAndLastDate[1]}</p>
        </div>
    </div>

    <div id="line-chart-bottom">
        <div id="line-chart-bottom-buttons">
        <button class="line-chart-bottom-selectedButton" id="line-chart-bottom-selectedButton-1W" on:click={() => selectedTimeStampForChart = changeTimeStamp("1W", selectedTypeForChart, balanceHistoryArray)}>1W</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-1M" on:click={() => selectedTimeStampForChart = changeTimeStamp("1M", selectedTypeForChart, balanceHistoryArray)}>1M</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-3M" on:click={() => selectedTimeStampForChart = changeTimeStamp("3M", selectedTypeForChart, balanceHistoryArray)}>3M</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-6M" on:click={() => selectedTimeStampForChart = changeTimeStamp("6M", selectedTypeForChart, balanceHistoryArray)}>6M</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-1Y" on:click={() => selectedTimeStampForChart = changeTimeStamp("1Y", selectedTypeForChart, balanceHistoryArray)}>1Y</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-3Y" on:click={() => selectedTimeStampForChart = changeTimeStamp("3Y", selectedTypeForChart, balanceHistoryArray)}>3Y</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-5Y" on:click={() => selectedTimeStampForChart = changeTimeStamp("5Y", selectedTypeForChart, balanceHistoryArray)}>5Y</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-10Y" on:click={() => selectedTimeStampForChart = changeTimeStamp("10Y", selectedTypeForChart, balanceHistoryArray)}>10Y</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-20Y" on:click={() => selectedTimeStampForChart = changeTimeStamp("20Y", selectedTypeForChart, balanceHistoryArray)}>20Y</button>
        <button class="line-chart-bottom-unselectedButton" id="line-chart-bottom-selectedButton-All" on:click={() => selectedTimeStampForChart = changeTimeStamp("All", selectedTypeForChart, balanceHistoryArray)}>All</button>
        </div>
    </div>
</div>

<script>
    export var balanceHistoryArray

    import { changeChartType, changeTimeStamp } from "./chart"
    import { firstAndLastDate } from "./chart";

    var selectedTimeStampForChart = "1W"
    var selectedTypeForChart = "balance"

</script>