import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"
import fs from "node:fs"

import { createUserFolder } from "../../modules/createUserFolder"

export async function moveNote(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    
    createUserFolder(userId)

    if(body.location.includes("..") || body.newLocation.includes("..")) return new Response("403 Forbidden", {status: 403})
    fs.renameSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`, `${__dirname}/../../userFiles/${userId}/notes/${body.newLocation}/${body.location.split("/")[body.location.split("/").length-1]}`)
    return new Response("200 Success")
}