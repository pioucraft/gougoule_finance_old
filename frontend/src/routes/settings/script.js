import axios from 'axios';
import { getCookie, deleteCookie } from 'svelte-cookie';
import { goto } from '$app/navigation';

const url = import.meta.env.VITE_BACKEND_URL

export async function changeDefaultCurrency(defaultCurrency) {
    const password = getCookie("password")
    const email = getCookie("email")
    
    let fetchBody = {"email": email, "password": password, "defaultCurrency": defaultCurrency.toUpperCase()}
    try {
        await axios.put(`${url}/api/defaultCurrency`, JSON.stringify(fetchBody))
    }
    catch(err) {
        alert("Error")
    }
}

export async function fetchDefaultCurrency() {
    const password = getCookie("password")
    const email = getCookie("email")

    let fetchBody = JSON.stringify({"email": email, "password": password})

    return (await axios.post(`${url}/api/defaultCurrency`, fetchBody)).data["defaultcurrency"]
}


export function logout() {
    deleteCookie("password")
    deleteCookie("email")
    goto("/login")
}