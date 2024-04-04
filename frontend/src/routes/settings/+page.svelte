<style>
    #settings {
        width: 100%;
        padding: 2%;
        padding-left: 4%;
    }

    #settings-defaultCurrency {
        width: 100%;
    }

    #settings-defaultCurrency-text {
        margin-top: 0;
    }

    #settings-defaultCurrency-input {
        width: 100%;
        height: 4rem;
        display: grid;
        grid-template-columns: 4fr 1fr;
        gap: 2rem;
    }

    #settings-defaultCurrency-input-input {
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1em;
        height: 100%;
        align-items: center;
    }

    #settings-defaultCurrency-input-button {
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        font-size: x-large;
        cursor: pointer;
        height: 100%;
    }

    @media (max-width: 75rem) {
        #settings-defaultCurrency-input {
            display: flex;
            flex-direction: column;
            height: 12rem;
        }
    }
</style>

<div id="settings">
    <div id="settings-defaultCurrency">
        <h2 id="settings-defaultCurrency-text">Default currency : </h2>
        <div id="settings-defaultCurrency-input" >
            <input type="text" id="settings-defaultCurrency-input-input" bind:value={defaultCurrency}>
            <button id="settings-defaultCurrency-input-button" on:click={changeDefaultCurrency}>Change</button>
        </div>
    </div>
</div>


<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { getCookie } from 'svelte-cookie';

    var defaultCurrency = "Loading..."

    var url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = JSON.stringify({"email": email, "password": password})

        defaultCurrency = (await axios.post(`${url}/api/defaultCurrency`, fetchBody)).data["defaultcurrency"]
    })

    async function changeDefaultCurrency() {
        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = {"email": email, "password": password, "defaultCurrency": defaultCurrency}
        console.log(fetchBody)
        // WHY ARE ***** PATCH REQUESTS NOT WORKING???
        await axios.patch(`${url}/api/defaultCurrency`, fetchBody)
    }
</script>