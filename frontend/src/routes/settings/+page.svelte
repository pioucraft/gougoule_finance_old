<div id="settings">
    <div id="settings-defaultCurrency">
        <h2 class="text-xl m-2 font-medium" id="settings-defaultCurrency-text">Default currency : </h2>
        <div id="settings-defaultCurrency-input" >
            <input type="text" id="settings-defaultCurrency-input-input" bind:value={defaultCurrency}>
            <button id="settings-defaultCurrency-input-button" on:click={() => changeDefaultCurrency(defaultCurrency)}>Change</button>
        </div>
    </div>
    <div id="user">
        <button id="user-logout" on:click={logout} class="buttonWithShadow">Logout <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
    </div>
</div>


<script>
    import { onMount } from 'svelte';

    import { changeDefaultCurrency, fetchDefaultCurrency, logout } from "./script"

    var defaultCurrency = "Loading..."

    onMount(async () => {
        defaultCurrency = (await fetchDefaultCurrency(defaultCurrency))
    })

    
</script>

<style>
    @import "style.css";
</style>