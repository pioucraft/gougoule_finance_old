import { login } from "./api/login"
import { defaultCurrency } from "./api/defaultCurrency"
import { account } from "./api/account"

export async function api(req) {
    let url = new URL(req.url)
    if (url.pathname.startsWith("/api/login")) return await login(req)
    else if (url.pathname.startsWith("/api/defaultCurrency")) return await defaultCurrency(req)
    else if (url.pathname.startsWith("/api/account")) return await account(req)
}