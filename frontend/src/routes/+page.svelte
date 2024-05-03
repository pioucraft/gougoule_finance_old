<div id="wrapper">
    <div>
        <h1 id="title">Welcome {username} !</h1>
        <h3 id="subtitle">What app do you want to open ?</h3>
    </div>
    
    <div id="apps">
        <a href="/finance" id="apps-notes" class="apps-item">Finance</a>
        <a href="/notes" id="apps-finance" class="apps-item">Notes</a>
    </div>
</div>

<p id="imageBy">Image by Richard Horvath</p>

<script>
    import { onMount } from "svelte";

    import { login } from "./script"

    let username = ""
    let url = import.meta.env.VITE_BACKEND_URL

    onMount(async () => username = await login(url))
</script>

<style>
    #subtitle {
        color: rgb(223, 223, 223);
    }

    #wrapper {
        left: 0;
        top: 0;
        padding: 0;
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-image: url("/main-background.jpg");
        background-size: cover;
        display: flex;
        flex-direction: column;
        color: white;
        justify-content: center;
        align-items: center;
        z-index: 2;
        gap: 5rem;
    }

    #apps {
        padding: 4rem;
        gap: 1.5rem;
        background-color: white;
        border-radius: 1rem;
        display: grid;
        grid-template-columns: repeat(2, minmax(20ch, 50%));
        align-items: center;
        justify-content: center;
    }

    .apps-item {
        text-align: center;
        border-radius: 1rem;
        padding: 1rem;
        border: 3px solid black;
        font-weight: bold;
        color: black;
        text-decoration: none;
        font-size: x-large;
    }

    #imageBy {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        color: white;
        font-size: small;
        z-index: 2;
    }
</style>
