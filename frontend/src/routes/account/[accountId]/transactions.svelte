<div class="history">
    {#each transactions as transactionsOnDate}
      <div class="history-date">
        <p class="text-xl font-semibold m-2">{transactionsOnDate[0]}</p>
        {#each transactionsOnDate[1] as transaction}
          <div class="history-transaction">
            {#if (transaction.amount > 0)}
              <h3 class="text-xl font-semibold" style="color: green;">{transaction.amount} {transaction.symbol}</h3>
            {:else}
              <h3 class="text-xl font-semibold" style="color: red;">{transaction.amount} {transaction.symbol}</h3>
            {/if}
            
            <h4 class="text-l font-semibold">{transaction.name}</h4>
            
            <div>
              <h4 class="text-l font-semibold">{new Date(transaction.date).toDateString()}</h4>
              <h4 class="text-l font-semibold" style="color: gray;">{accounts[transaction.accountid]}</h4>
            </div>
          </div>
        {/each}
      </div>
        
    {/each}
</div>

<script>
    export let transactions
    export let accounts
</script>