import { DBClient } from "../../modules/db"
import { loginFunction } from "../../modules/login"
import fs from "node:fs"

import { createUserFolder } from "../../modules/createUserFolder"

export async function note(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    
    createUserFolder(userId)

    if(req.method == "POST") return createNote(body, userId)
    else if(req.method == "PUT") return modifyNote(body, userId)
    else if(req.method == "PATCH") return deleteNote(body, userId)
}

function createNote(body, userId) {
    // body : {location, name (without directory)}
    Bun.write(`${__dirname}/../../userFiles/${userId}/notes/${body.location}/${body.name}.html`, "")
    return new Response("200 Success")
}

function modifyNote(body, userId) {
    // body : {location (folder to modify), name (new name ), content (full content of file)}
    if(body.name) {
        let newLocation = body.location.split("/").slice(0,-1).join("/") + "/" + body.name;
        fs.renameSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`, `${__dirname}/../../userFiles/${userId}/notes/${newLocation}`)
    }
    else if(body.content) {
        Bun.write(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`, body.content)
    }
    return new Response("200 Success")
}

function deleteNote(body, userId) {
    // body : {location (folder to delete)}
    fs.rmSync(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`,  { recursive: true, force: true })
    return new Response("200 Success")
}