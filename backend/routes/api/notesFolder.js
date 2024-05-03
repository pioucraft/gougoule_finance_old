import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"
import fs from "node:fs"

import { createUserFolder } from "../../modules/createUserFolder"

export async function notesFolder(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    
    createUserFolder(userId)

    if(!fs.existsSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`)) return new Response("403 Forbidden", {status: 403})

    if(req.method == "POST") return createNotesFolder(body, userId)
    else if(req.method == "PUT") return modifyNotesFolder(body, userId)
    else if(req.method == "PATCH") return deleteNotesFolder(body, userId)
}

function createNotesFolder(body, userId) {
    // body : {location, name (without directory)}
    if(!body.hasOwnProperty("location") || !body.hasOwnProperty("name")) return new Response("400 Bad Request", {status: 400})
    if(body.location.includes("..")) return new Response("403 Forbidden", {status: 403})

    fs.mkdirSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}/${body.name}`)
    return new Response("200 Success")
}

function modifyNotesFolder(body, userId) {
    // body : {location (folder to modify), name (new name )}
    if(!body.hasOwnProperty("location") || !body.hasOwnProperty("name")) return new Response("400 Bad Request", {status: 400})
    if(body.location.includes("..") || body.name.includes("..")) return new Response("403 Forbidden", {status: 403})

    let newLocation = body.location.split("/").slice(0,-1).join("/") + "/" + body.name;
    fs.renameSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`, `${__dirname}/../../userFiles/${userId}/notes/${newLocation}`)
    return new Response("200 Success")
}

function deleteNotesFolder(body, userId) {
    // body : {location (folder to delete)}
    if(!body.hasOwnProperty("location")) return new Response("400 Bad Request", {status: 400})
    if(body.location.includes("..")) return new Response("403 Forbidden", {status: 403})

    fs.rmSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`,  { recursive: true, force: true })
    return new Response("200 Success")
}