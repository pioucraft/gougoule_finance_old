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


    async function modifyAccount(accountId, event) {
        event.stopPropagation();
        let newName = prompt("New name :")

        let password = getCookie("password")
        let email = getCookie("email")

        let fetchBody = JSON.stringify({"email": email, "password": password, "id": accountId, "name": newName})

        await axios.put(`${url}/api/account`, fetchBody)
        accounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data
    }

    async function deleteAccount(accountId, event) {
        event.stopPropagation();

        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = JSON.stringify({"email": email, "password": password, "id": accountId})
        if(confirm("Are you sure")) {
            await axios.patch(`${url}/api/account`, fetchBody)
            accounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data
        }
        
    }
</script>

<style>
    #accounts {
        gap: 4%;
        padding: 2%;
        padding-left: 4%;        
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        padding-bottom: 10rem;
    }

    #accounts-accounts {
        display: flex;
        flex-direction: column;
        background-color: #fafafa;
        padding: 1.5rem;
        gap: 1rem;
        border-radius: 1.5rem;
    }

    .accounts-accountCard {
        border: none;
        background-color: white;
        border-radius: 1.5rem;
        height: 5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-right: 1em;
        padding-left: 1em;
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
        background-color: #fafafa;
    }

    #accounts-accountCard-left {
        display: flex;
        flex-direction: row;
    }

    #accounts-accountCard-left-buttons {
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
        gap: 0.5rem;
        justify-content: center;   
        color: whitesmoke;
    }

    #accounts-accountCard-left-buttons svg {
        height: 1.5rem;
        color: inherit;
    }

    #accounts-accountCard-left-buttons *:hover {
        color: black;
    }
</style>

<div id="accounts">
    <div id="accounts-accounts">
        {#each accounts as account}
            <button class="accounts-accountCard" on:click={() => goto((`/account/${account.id}`))}>
                <div id="accounts-accountCard-left">
                    <h2 class="accounts-accountCard-left-title">{account.name}</h2>
                    <div id="accounts-accountCard-left-buttons">
                        <button on:click={(event) => modifyAccount(account.id, event)} class="transparentButton">
                            <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <button on:click={(event) => deleteAccount(account.id, event)} class="transparentButton">
                            <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="accounts-accountCard-balances">
                    <h3 class="accounts-accountCard-balance">${account.balance.toFixed(2)}</h3>
                </div>
            </button>
        {/each}
    </div>
    
    <button on:click={() => goto("/addAccount")} class="accounts-accountCard" id="accounts-addAccount">
        <h2>Add an account</h2>
    </button>
</div>