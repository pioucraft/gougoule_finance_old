import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"
import fs from "node:fs"

import { createUserFolder } from "../../modules/createUserFolder"

export async function getNote(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    
    createUserFolder(userId)

    console.log
    try {
        let response = fs.readdirSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`)
        return new Response(JSON.stringify(response), {headers: {"Content-Type": "application/json"}})
    }
    catch(err) {
        let response = await Bun.file(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`).text()
        return new Response(JSON.stringify(response))
    }
}