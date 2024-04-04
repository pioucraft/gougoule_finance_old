<script>
    import sha256 from "js-sha256"
    import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';

    function login() {
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        password = sha256(password)

        setCookie("password", password, 100, true)
        setCookie("email", email, 100, true)
        location.href = "/"
    }
</script>

<style>
    #login {
        left: 0;
        top: 0;
        padding: 0;
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-image: url("/login-background.jpg");
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #login-box {
        width: 35rem;
        height: 25rem;
        background-color: white;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #login-box-input {
        display: flex;
        flex-direction: column;
        height: 10rem;
        justify-content: space-evenly;
        width: 60%;
    }

    .login-text {
        background-color: transparent;
        border: 2px solid black;
        border-radius: 0.7rem;
        color: white;
        height: 2rem;
        color: black;
        padding: 0.5rem;
        font-size: large;
        outline: none;
    }

    .login-button {
        width: 40%;
        background-color: black;
        color: white;
        border: none;
        padding: 0.5rem;
        font-size: large;
        border-radius: 0.7rem;
        outline: none;
        cursor: pointer;
    }

    #login-box-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 10rem;
        justify-content: space-evenly;
        width: 60%;
    }

    #imageBy {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        color: white;
        font-size: small;
    }

    #login-box-text {
        color: gray;
    }
</style>

<div id="login">
    <div id="login-box">
        <div id="login-box-input">
            <input type="text" class="login-text" id="email" placeholder="Email">
            <input type="password" class="login-text" id="password" placeholder="Password">
        </div>
        <div id="login-box-buttons">
            <p id="login-box-text">By logging in, you accept the use of cookies (only to store credentials).</p>
            <button on:click={login} class="login-button">Log in</button>
        </div>
        
    </div>
</div>

<p id="imageBy">Image by  Richard Horvath</p>