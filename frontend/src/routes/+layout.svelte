<div id="leftBar">
    <div id="leftBar-top">
        <a href="/" class="transparentButton leftBarButton" on:click={() => changePressedButton("home")} id="leftBar-homeButton">Home</a>
        <a href="/accounts" class="transparentButton leftBarButton" on:click={() => changePressedButton("accounts")} id="leftBar-accountsButton">Accounts</a>
        <a href="/settings" class="transparentButton leftBarButton" on:click={() => changePressedButton("settings")} id="leftBar-settingsButton">Settings</a>
        <a href="/addTransaction" class="transparentButton leftBarButton" on:click={() => changePressedButton("addTransaction")} id="leftBar-addTransaction">Add a transaction</a>
    </div>
    

    <a href="/user" class="transparentButton leftBarButton" on:click={() => changePressedButton("user")} id="leftBar-userButton"><svg id="leftBar-userButton-svg" data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path></svg> {username}</a>
</div>
<div id="bottomBar">
    <a href="/" class="bottomBar-item">
        <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
    <a href="/accounts" class="bottomBar-item">
        <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
    <a href="/addTransaction" class="bottomBar-item bottomBar-middleItem">
        <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
    <a href="/user" class="bottomBar-item">
        <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
    <a href="/settings" class="bottomBar-item">
        <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
</div>

<script>
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import axios from "axios"

    let username = "Loading..."

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
                username = loginFetch.data.username
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
        margin-left: 1rem;
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

    #bottomBar {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: white;
        height: 4rem;
        justify-content: space-around;
        box-shadow: 0 0 0.3rem black;
        align-items: center;
        z-index: 1;
    }

    .bottomBar-item {
        color: inherit;
        width: 3rem;
        height: 3rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .bottomBar-middleItem {
        border-radius: 0.8rem;
        box-shadow: 0 0 0.4rem black;
    }
    
    @media (max-width: 75rem) {
        #leftBar {
            display: none;
        }

        #bottomBar {
            display: flex;
        }
    }
</style>

<slot />