import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"
import { calculateBalance } from "../../modules/calculateBalance"

export async function transaction(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    if(req.method == "POST") return await createTransaction(body)
    else if(req.method == "PATCH") return await modifyTransaction(body)
    else if(req.method == "DELETE") return await deleteTransaction(body)
}

async function createTransaction(body) {

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    let accounts = (await DBClient.query("SELECT * FROM accounts WHERE userid = $1 AND id = $2", [userId, body.accountId])).rows

    if(accounts.length == 0) return new Response("401 Unauthorized", {status: 401})

    // add transaction to the table
    await DBClient.query(`INSERT INTO transactions (
        amount,
        type,
        symbol,
        name,
        accountid
    )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
    )`, [body.amount, body.type, body.symbol, body.name, body.accountId])
    // recalculate the balance of the account and of all the accounts (without fetching the prices)
    await calculateBalance()

    return new Response("200 Success")
}

async function modifyTransaction(body) {

}

async function deleteTransaction(body) {
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    let accounts = (await DBClient.query("SELECT * FROM accounts WHERE userid = $1", [userId])).rows.map(x => x["id"])
    console.log(accounts)
    let transaction = (await DBClient.query("SELECT * FROM transactions WHERE id = $1", [body.id])).rows[0]
    console.log(transaction)

    if(!accounts.includes(transaction["accountid"])) return new Response("401 Unauthorized", {status: 401})
    await DBClient.query(`DELETE FROM transactions WHERE id = $1`, [body.id])

    await calculateBalance()

    return new Response("200 Success")
}