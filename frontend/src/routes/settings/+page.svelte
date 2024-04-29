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
        let fetchBody = {"email": email, "password": password, "defaultCurrency": defaultCurrency.toUpperCase()}
        console.log(fetchBody)
        try {
            await axios.put(`${url}/api/defaultCurrency`, JSON.stringify(fetchBody))
        }
        catch(err) {
            alert("Error")
        }
    }
</script>

<style>
    @import "style.css";
</style>