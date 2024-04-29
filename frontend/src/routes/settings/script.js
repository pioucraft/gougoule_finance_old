import axios from 'axios';
import { getCookie } from 'svelte-cookie';

export async function changeDefaultCurrency(defaultCurrency, url) {
    let password = getCookie("password")
    let email = getCookie("email")
    let fetchBody = {"email": email, "password": password, "defaultCurrency": defaultCurrency.toUpperCase()}
    try {
        await axios.put(`${url}/api/defaultCurrency`, JSON.stringify(fetchBody))
    }
    catch(err) {
        alert("Error")
    }
}