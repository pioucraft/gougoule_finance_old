<div id="settings">
    <div id="settings-defaultCurrency">
        <h2 class="text-xl m-2 font-medium" id="settings-defaultCurrency-text">Default currency : </h2>
        <div id="settings-defaultCurrency-input" >
            <input type="text" id="settings-defaultCurrency-input-input" bind:value={defaultCurrency}>
            <button id="settings-defaultCurrency-input-button" on:click={() => changeDefaultCurrency(defaultCurrency)}>Change</button>
        </div>
    </div>
</div>


<script>
    import { onMount } from 'svelte';

    import { changeDefaultCurrency, fetchDefaultCurrency } from "./script"

    var defaultCurrency = "Loading..."

    onMount(async () => {
        defaultCurrency = (await fetchDefaultCurrency(defaultCurrency))
    })

    
</script>

<style>
    @import "style.css";
</style>