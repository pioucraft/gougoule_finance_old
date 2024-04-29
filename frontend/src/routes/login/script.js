import sha256 from "js-sha256"
import {setCookie} from 'svelte-cookie';

export function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    password = sha256(password)

    setCookie("password", password, 100, true)
    setCookie("email", email, 100, true)
    location.href = "/"
}