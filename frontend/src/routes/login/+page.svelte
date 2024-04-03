<script>
    import sha256 from "js-sha256"
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
        justify-content: space-evenly;
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

    #imageBy {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        color: white;
        font-size: small;
    }
</style>

<div id="login">
    <div id="login-box">
        <div id="login-box-input">
            <input type="text" class="login-text" placeholder="Username">
                <input type="password" class="login-text" placeholder="Password">
            
        </div>
        <button class="login-button">Login</button>
    </div>
</div>

<p id="imageBy">Image by  Richard Horvath</p>