<div id="leftBar">
    <div id="leftBar-top">
        <a href="/" class="transparentButton leftBarButton" on:click={() => changePressedButton("home")} id="leftBar-homeButton">Home</a>
        <a href="/accounts" class="transparentButton leftBarButton" on:click={() => changePressedButton("accounts")} id="leftBar-accountsButton">Accounts</a>
        <a href="/settings" class="transparentButton leftBarButton" on:click={() => changePressedButton("settings")} id="leftBar-settingsButton">Settings</a>
        <a href="/addTransaction" class="transparentButton leftBarButton" on:click={() => changePressedButton("addTransaction")} id="leftBar-addTransaction">Add a transaction</a>
    </div>
    

    <a href="/user" class="transparentButton leftBarButton" on:click={() => changePressedButton("user")} id="leftBar-userButton"><svg id="leftBar-userButton-svg" data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path></svg> Username</a>
</div>

<script>
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import axios from "axios"

    function changePressedButton(id) {
        document.getElementById("leftBar-homeButton").style = "background-color: auto";
        document.getElementById("leftBar-accountsButton").style = "background-color: auto";
        document.getElementById("leftBar-settingsButton").style = "background-color: auto";
        document.getElementById("leftBar-userButton").style = "background-color: auto";
        document.getElementById("leftBar-addTransaction").style = "background-color: auto";
        
        document.getElementById(`leftBar-${id}Button`).style = "background-color: rgb(235, 235, 235)";
    }

    let url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
        if(location.pathname != "/login") {
            if(!getCookie("email")) {
                goto("/login")
            }
            else {
                let password = getCookie("password")
                let email = getCookie("email")
                
                let fetchBody = {"email": email, "password": password}

                try {
                    var loginFetch = await axios.post(`${url}/api/login`, JSON.stringify(fetchBody))
                }
                catch(err) {
                    goto("/login")
                }
                

                console.log(loginFetch)
            }
            
        } 
    })
</script>

<style> 


    #leftBar {
        height: calc(100% - 1.4em);
        width: 10em;
        border-radius: 0.7em;
        border: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 1em;
        padding: 0.7em;
    }

    #leftBar-top {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-top: 1rem;
    }

    #leftBar-userButton-svg {
        height: 2em;
    }

    #leftBar-userButton {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: red;
    }

    .leftBarButton {
        width: 8.5em;
        font-size: large;
        text-align: start;
    }
</style>

<slot />