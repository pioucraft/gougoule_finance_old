import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"

export async function getAccounts(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    let accounts = (await DBClient.query("SELECT * FROM accounts WHERE userid = $1", [userId])).rows
    return new Response(JSON.stringify(accounts), {headers: {"Content-Type": "application/json"}})
}