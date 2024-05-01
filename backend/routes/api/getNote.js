import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"

import { createUserFolder } from "../../modules/createUserFolder"

export async function getNote(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    
    createUserFolder(userId)
}