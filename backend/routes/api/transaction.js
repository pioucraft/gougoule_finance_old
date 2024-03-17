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
    if(body.type == "s" && !(await DBClient.query("SELECT * FROM converter WHERE symbol = $1 AND type = 's'", [body.symbol])).rows[0].currency) {
        console.log((await DBClient.query("SELECT * FROM converter WHERE symbol = $1 AND type = 's'", [body.symbol])).rows[0])
        let currency = (await (await fetch(`https://financialmodelingprep.com/api/v3/search?query=${body.symbol}&apikey=${process.env.FINANCIAL_MODELING_PREP_API}`)).json())[0].currency
        await DBClient.query("UPDATE converter SET currency = $1 WHERE symbol = $2 AND type = 's'", [currency, body.symbol])
    }
    // recalculate the balance of the account and of all the accounts (without fetching the prices)
    await calculateBalance()

    return new Response("200 Success")
}

async function modifyTransaction(body) {
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    let accounts = (await DBClient.query("SELECT * FROM accounts WHERE userid = $1", [userId])).rows.map(x => x["id"])

    let transaction = (await DBClient.query("SELECT * FROM transactions WHERE id = $1", [body.id])).rows[0]


    if(!accounts.includes(transaction["accountid"])) return new Response("401 Unauthorized", {status: 401})

    if(body.amount) {
        await DBClient.query(`UPDATE transactions SET amount = $1 WHERE id = $2`, [body.amount, body.id])
    }

    if(body.name) {
        await DBClient.query(`UPDATE transactions SET name = $1 WHERE id = $2`, [body.name, body.id])
    }

    await calculateBalance()

    return new Response("200 Success")
}

async function deleteTransaction(body) {
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    let accounts = (await DBClient.query("SELECT * FROM accounts WHERE userid = $1", [userId])).rows.map(x => x["id"])
    let transaction = (await DBClient.query("SELECT * FROM transactions WHERE id = $1", [body.id])).rows[0]

    if(!accounts.includes(transaction["accountid"])) return new Response("401 Unauthorized", {status: 401})
    await DBClient.query(`DELETE FROM transactions WHERE id = $1`, [body.id])

    await calculateBalance()

    return new Response("200 Success")
}