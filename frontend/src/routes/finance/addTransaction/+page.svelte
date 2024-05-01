<style>
    @import "./style.css";
</style>

<div id="addTransaction">
    <div id="addTransaction-name">
        <h2 id="addTransaction-name-text">Name of the transaction : </h2>
        <input bind:value={name} type="text" id="addTransaction-name-input">
    </div>

    <div id="addTransaction-amount">
        <h2 id="addTransaction-amount-text">Amount and symbol : </h2>
        <div id="addTransaction-amount-inputs">
            <input placeholder="Amount" bind:value={amount} type="number" id="addTransaction-amount-amount">
            <select bind:value={type} type="text" id="addTransaction-amount-type">
                <option value="f">Fiat</option>
                <option value="s">Stock</option>
                <option value="c">Cryptocurrency</option>
            </select>
            <input placeholder="Symbol" bind:value={symbol} type="text" id="addTransaction-amount-symbol">
        </div>
    </div>

    <div id="addTransaction-account">
        <h2 id="addTransaction-account-text">Account : </h2>
        <select bind:value={accountId} name="" id="addTransaction-account-input">
            {#each accounts as account}
                <option value="{account.id}">{account.name}</option>
            {/each}
        </select>
    </div>

    <button class="buttonWithShadow" id="addTransactionbutton" on:click={() => addTransaction(name, amount, type, symbol, accountId)}>Add a transaction !</button>
</div>


<script>
    import axios from 'axios';
    import { getCookie } from 'svelte-cookie';
    import { onMount } from 'svelte';

    import { addTransaction, fetchAccountsAndDefaultCurrency } from "./script"
    
    var name = ""
    var amount = 0
    var type = "f"
    var symbol = "Loading..."
    var accountId = 0

    var accounts = [
        {
            "id": 0,
            "name": "Loading...",
            "balance": 0
        }
    ]

    onMount(async () => {
        const fetchedAccountsAndDefaultCurrency = await fetchAccountsAndDefaultCurrency()

        accounts = fetchedAccountsAndDefaultCurrency["accounts"]
        accountId = fetchedAccountsAndDefaultCurrency["accountId"]
        symbol = fetchedAccountsAndDefaultCurrency["symbol"]
    })
</script>