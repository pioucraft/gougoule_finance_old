import axios from 'axios';
import { goto } from '$app/navigation';
import { getCookie } from 'svelte-cookie';

const url = import.meta.env.VITE_BACKEND_URL

export async function addTransaction(name, amount, type, symbol, accountId) {

    const password = getCookie("password")
    const email = getCookie("email")
    
    let fetchBody = JSON.stringify({"email": email, "password": password, "name": name, "amount": amount, "type": type, "symbol": symbol.toUpperCase(), "accountId": accountId})
    console.log(fetchBody)
    try {
        await axios.post(`${url}/api/transaction`, fetchBody)
        goto("/")
    }
    catch(err) {
        alert("Error")
    }
}

export async function fetchAccountsAndDefaultCurrency() {
    const password = getCookie("password")
    const email = getCookie("email")
    const fetchBody = JSON.stringify({"email": email, "password": password})

    let accounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data
    let accountId = accounts[0].id
    let symbol = (await axios.post(`${url}/api/defaultCurrency`, fetchBody)).data.defaultcurrency

    return {accounts: accounts, accountId: accountId, symbol: symbol}
}