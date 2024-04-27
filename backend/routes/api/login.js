import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"

export async function login(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(await loginFunction(body)) {
        let username = (await DBClient.query("SELECT * FROM users WHERE email = $1", [body.email])).rows[0].name
        return new Response(JSON.stringify({"username": username}), {headers: {"Content-Type": "application/json"}})
    }
    else {
        return new Response("401 Unauthorized", {status: 401})
    }
}
