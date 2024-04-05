<style>
    #addTransaction {
        width: 100%;
        padding: 2%;
        padding-left: 4%;
    }

    #addTransaction-name {
        width: 100%;
    }

    #addTransaction-name-text {
        margin-top: 0;
    }

    #addTransaction-name-input {
        width: calc(100% - 1rem);
        height: 4rem;
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1rem;
        align-items: center;
    }

    #addTransaction-amount-inputs {
        width: 100%;
        height: 4rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
    }

    #addTransaction-amount-inputs * {
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1rem;
        align-items: center;
    }

    #addTransaction-account {
        width: 100%;
    }

    #addTransaction-account-input {
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1rem;
        align-items: center;
        width: calc(100%);
        height: 4rem;
    }

    #addTransactionbutton {
        width: 100%;
        height: 4rem;
        font-size: x-large;
        margin-top: 5rem;
    }

    @media (max-width: 75rem) {
        :global(body) {
            padding: 0;
        }

        #addTransaction {
            margin: 0;
        }

        #addTransaction-amount-inputs {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            height: 20rem;
        }

        #addTransactionbutton {
            margin-bottom: 5rem;
        }
    }

</style>

<div id="addTransaction">
    <div id="addTransaction-name">
        <h2 id="addTransaction-name-text">Name of the transaction : </h2>
        <input type="text" id="addTransaction-name-input">
    </div>

    <div id="addTransaction-amount">
        <h2 id="addTransaction-amount-text">Amount and symbol : </h2>
        <div id="addTransaction-amount-inputs">
            <input placeholder="Amount" type="number" id="addTransaction-amount-amount">
            <select type="text" id="addTransaction-amount-type">
                <option value="f">Fiat</option>
                <option value="s">Stock</option>
                <option value="c">Cryptocurrency</option>
            </select>
            <input placeholder="Symbol" type="text" id="addTransaction-amount-symbol">
        </div>
    </div>

    <div id="addTransaction-account">
        <h2 id="addTransaction-account-text">Account : </h2>
        <select name="" id="addTransaction-account-input">
            {#each accounts as account}
                <option value="{account.id}">{account.name}</option>
            {/each}
        </select>
    </div>

    <button class="buttonWithShadow" id="addTransactionbutton" on:click={addTransaction}>Add a transaction !</button>
</div>


<script>
    import axios from 'axios';
    import { getCookie } from 'svelte-cookie';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    var url = import.meta.env.VITE_BACKEND_URL

    var accounts = [
                        {
                            "id": 1,
                            "name": "Loading...",
                            "balance": 0
                        }
                    ]

    async function addTransaction() {
        let name = document.getElementById('addTransaction-name-input').value;
        let amount = document.getElementById('addTransaction-amount-amount').value;
        let type = document.getElementById('addTransaction-amount-type').value;
        let symbol = document.getElementById('addTransaction-amount-symbol').value.toUpperCase();
        let accountId = document.getElementById('addTransaction-account-input').value;


        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = JSON.stringify({"email": email, "password": password, "name": name, "amount": amount, "type": type, "symbol": symbol, "accountId": accountId})
        console.log(fetchBody)
        try {
            await axios.post(`${url}/api/transaction`, fetchBody)
            goto("/")
        }
        catch(err) {
            alert("Error")
        }
    }

    onMount(async () => {
        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = JSON.stringify({"email": email, "password": password})

        accounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data
    })
</script>