import { login } from "./api/login"
import { defaultCurrency } from "./api/defaultCurrency"
import { account } from "./api/account"
import { getAccounts } from "./api/getAccounts"
import { transaction } from "./api/transaction"
import { getBalanceHistory } from "./api/getBalanceHistory"
import { getTransactions } from "./api/getTransactions"

export async function api(req) {
    let url = new URL(req.url)
    if (url.pathname.startsWith("/api/login")) return await login(req)
    else if (url.pathname.startsWith("/api/defaultCurrency")) return await defaultCurrency(req)
    else if (url.pathname.startsWith("/api/account")) return await account(req)
    else if (url.pathname.startsWith("/api/getAccounts")) return await getAccounts(req)
    else if (url.pathname.startsWith("/api/transaction")) return await transaction(req)
    else if (url.pathname.startsWith("/api/getBalanceHistory")) return await getBalanceHistory(req)
    else if (url.pathname.startsWith("/api/getTransactions")) return await getTransactions(req)
    else return new Response("404 Not Found", {status: 404})
}