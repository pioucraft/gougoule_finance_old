import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"

export async function getBalanceHistory(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }
    
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]

    if(body.account) {
        let response = (await DBClient.query("SELECT * FROM balancehistory WHERE accountid = $1", [body.account])).rows
        let account = (await DBClient.query("SELECT * FROM accounts WHERE userid = $1 AND id = $2", [userId, body.account])).rows[0]

        if(account.userid == userId) return new Response(JSON.stringify(response), {headers: {"Content-Type": "application/json"}})
        else return new Response("401 Unauthorized", {status: 401})
    }
    else {
        let response = (await DBClient.query("SELECT * FROM balancehistory WHERE userid = $1", [userId])).rows
        return new Response(JSON.stringify(response), {headers: {"Content-Type": "application/json"}})
    }
}