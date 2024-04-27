import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"
import { calculateBalance } from "../../modules/calculateBalance"

export async function account(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    if(req.method == "POST") return await createAccount(body)
    else if(req.method == "PUT") return await modifyAccount(body)
    else if(req.method == "PATCH") return await deleteAccount(body)
}

async function createAccount(body) {
    if(!body.hasOwnProperty("name")) return new Response("400 Bad Request", {status: 400})
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    await DBClient.query("INSERT INTO accounts (name, userid, balance) VALUES ($1, $2, 0)", [body.name, userId])
    return new Response("200 Success")
}

async function modifyAccount(body) {
    if(!body.hasOwnProperty("name") || !body.hasOwnProperty("id")) return new Response("400 Bad Request", {status: 400})
    let userId = (await DBClient.query("SELECT * FROM users WHERE email = $1", [body.email])).rows[0]["id"]
    if((await DBClient.query("SELECT * FROM accounts WHERE id = $1 AND userid = $2", [body.id, userId])).rows.length == 0) return new Response("401 Unhauthorized", {status: 401})
    await DBClient.query("UPDATE accounts SET name = $1 WHERE id = $2 AND userid = $3", [body.name, body.id, userId])
    return new Response("200 Success")
}

async function deleteAccount(body) {
    if(!body.hasOwnProperty("id")) return new Response("400 Bad Request", {status: 400})
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
        
    if((await DBClient.query(`SELECT * FROM accounts WHERE id = $1 AND userid = $2`, [body.id, userId])).rows.length) {
        await DBClient.query("DELETE FROM accounts WHERE id = $1", [body.id])
        await DBClient.query("DELETE FROM transactions WHERE accountid = $1", [body.id])
        await calculateBalance()
    }
    else {
        return new Response("401 Unauthorized", {status: 401})
    }
    
    
    return new Response("200 Success")
}