import { login } from "./api/login"

import { defaultCurrency } from "./api/defaultCurrency"
import { account } from "./api/account"
import { getAccounts } from "./api/getAccounts"
import { transaction } from "./api/transaction"
import { getBalanceHistory } from "./api/getBalanceHistory"
import { getTransactions } from "./api/getTransactions"

import { notesFolder } from "./api/notesFolder"
import { note } from "./api/note"
import { getNote } from "./api/getNote"

export async function api(req) {
    let url = new URL(req.url)
    if (url.pathname.startsWith("/api/login")) return await login(req)

    //finance
    else if (url.pathname.startsWith("/api/defaultCurrency")) return await defaultCurrency(req)
    else if (url.pathname.startsWith("/api/account")) return await account(req)
    else if (url.pathname.startsWith("/api/getAccounts")) return await getAccounts(req)
    else if (url.pathname.startsWith("/api/transaction")) return await transaction(req)
    else if (url.pathname.startsWith("/api/getBalanceHistory")) return await getBalanceHistory(req)
    else if (url.pathname.startsWith("/api/getTransactions")) return await getTransactions(req)

    //notes
    else if (url.pathname.startsWith("/api/notesFolder")) return await notesFolder(req)
    else if (url.pathname.startsWith("/api/note")) return await note(req)
    else if (url.pathname.startsWith("/api/getNote")) return await getNote(req)

    else return new Response("404 Not Found", {status: 404})
}