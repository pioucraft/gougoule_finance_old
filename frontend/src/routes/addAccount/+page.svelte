<style>
    #addAccount {
        width: 100%;
        padding: 2%;
        padding-left: 4%;
    }

    #addAccount-name {
        width: 100%;
    }

    #addAccount-name-text {
        margin-top: 0;
    }

    #addAccount-name-input {
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

    #addAccountbutton {
        width: 100%;
        height: 4rem;
        font-size: x-large;
        margin-top: 1rem;
    }

</style>

<div id="addAccount">
    <div id="addAccount-name">
        <h2 id="addAccount-name-text">Account name : </h2>
        <input type="text" id="addAccount-name-input">
    </div>

    <button class="buttonWithShadow" on:click={addAccount} id="addAccountbutton">Add an account !</button>
</div>

<script>
    import axios from 'axios';
    import { getCookie } from 'svelte-cookie';
    import { goto } from '$app/navigation';

    var url = import.meta.env.VITE_BACKEND_URL

    async function addAccount() {
        let name = document.getElementById('addAccount-name-input').value;

        let password = getCookie("password")
        let email = getCookie("email")
        let fetchBody = JSON.stringify({"email": email, "password": password, "name": name})

        try {
            await axios.post(`${url}/api/account`, fetchBody)
            goto("/accounts")
        }
        catch(err) {
            alert("Error")
        }
    }
</script>