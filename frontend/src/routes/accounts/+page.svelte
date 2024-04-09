<script>
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { getCookie } from 'svelte-cookie';

    var accounts = [
                        {
                            "id": 1,
                            "name": "Loading...",
                            "balance": 0
                        }
                    ]

    var url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = JSON.stringify({"email": email, "password": password})

        accounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data
    })
</script>

<style>
    #accounts {
        gap: 4%;
        padding: 2%;
        padding-left: 4%;        
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(auto-fill, 5em);
        grid-gap: 1rem;
        align-items: stretch;
        overflow-y: scroll;
        padding-bottom: 5rem;
    }

    .accounts-accountCard {
        box-shadow: 0 0 20px rgb(174, 174, 174);
        border-radius: 1.5rem;
        height: 5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-right: 1em;
        padding-left: 1em;
        background-color: white;
        border: none;
        cursor: pointer;
    }

    .accounts-accountCard-balances {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        margin-top: 1em;
    }

    #accounts-addAccount {
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    @media (max-width: 60em) {
        #accounts {
            grid-template-columns: auto;
            grid-template-rows: auto;
            grid-gap: 1rem;
        }
    }

    @media (max-width: 75rem) {
    }
</style>

<div id="accounts">
    {#each accounts as account}
        <button class="accounts-accountCard" on:click={() => goto((`/account/${account.id}`))}>
            <h2 class="accounts-accountCard-title">{account.name}</h2>
            <div class="accounts-accountCard-balances">
                <h3 class="accounts-accountCard-balance">${account.balance.toFixed(2)}</h3>
            </div>
        </button>
    {/each}
    
    
    <button on:click={() => goto("/addAccount")} class="accounts-accountCard" id="accounts-addAccount">
        <h2>Add an account</h2>
    </button>
</div>