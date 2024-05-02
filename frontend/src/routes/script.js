import { getCookie, setCookie, deleteCookie } from 'svelte-cookie';
import { goto } from '$app/navigation';
import axios from "axios"

export async function login(url) {

    if(!getCookie("email")) {
        goto("/login")
    }
    else {
        const password = getCookie("password")
        const email = getCookie("email")
        
        let fetchBody = {"email": email, "password": password}

        try {
            var loginFetch = await axios.post(`${url}/api/login`, JSON.stringify(fetchBody))
        }
        catch(err) {
            goto("/login")
        }
        return loginFetch.data.username
    }
        

}