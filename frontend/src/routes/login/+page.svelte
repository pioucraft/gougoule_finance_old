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
    @import "style.css";
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