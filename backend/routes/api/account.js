import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"

export async function account(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    if(req.method == "POST") return await createAccount(body)
    else if(req.method == "PATCH") return await modifyAccount(body)
    else if(req.method == "DELETE") return await deleteAccount(body)
}

async function createAccount(body) {
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    await DBClient.query("INSERT INTO accounts (name, userid, balance) VALUES ($1, $2, 0)", [body.name, userId])
    return new Response("200 Success")
}

async function modifyAccount(body) {
    let userId = (await DBClient.query("SELECT * FROM users WHERE email = $1", [body.email])).rows[0]["id"]
    await DBClient.query("UPDATE accounts SET name = $1 WHERE id = $2 AND userid = $3", [body.name, body.id, userId])
    return new Response("200 Success")
}

async function deleteAccount(body) {
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    await DBClient.query("DELETE FROM accounts WHERE id = $1 AND userid = $2", [body.id, userId])
    return new Response("200 Success")
}