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

<script>
    import { login } from "./script.js";
</script>

<style>
    @import "style.css";
</style>