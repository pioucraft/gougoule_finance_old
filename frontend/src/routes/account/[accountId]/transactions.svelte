<div class="history">
    {#each transactions as transactionsOnDate}
      <div class="history-date">
        <p>{transactionsOnDate[0]}</p>
        {#each transactionsOnDate[1] as transaction}
          <div class="history-transaction">
            {#if (transaction.amount > 0)}
              <h3 style="color: green;">{transaction.amount} {transaction.symbol}</h3>
            {:else}
              <h3 style="color: red;">{transaction.amount} {transaction.symbol}</h3>
            {/if}
            
            <h4>{transaction.name}</h4>
            
            <div>
              <h4>{new Date(transaction.date).toDateString()}</h4>
              <h4 style="color: gray;">{accounts[transaction.accountid]}</h4>
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