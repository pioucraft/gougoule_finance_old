<div class="money">
    <p class="money-and-profit">{balance} <span class="profit" style="color: {profitColor};">{profit}</span></p> 
    <p class="money-with-prefered-currency">{balanceInLocalCurrency}</p>
</div>

<script>
    export let balance
    export let profit
    export let profitColor
    export let balanceInLocalCurrency
</script>