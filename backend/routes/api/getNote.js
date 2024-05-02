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
    if(body.location) {
        let response = await Bun.file(`${__dirname}/../../userFiles/${userId}/notes/${body.location}`).text()
        return new Response(response)
    }
    
    let response = getDirectories("/", userId)
    return new Response(JSON.stringify(response), {headers: {"Content-Type": "application/json"}})
}

function getDirectories(location, userId) {

    let directories = fs.readdirSync(`${__dirname}/../../userFiles/${userId}/notes/${location}`).map(x => location+"/"+x).map(x => x.split("/").filter(x => x!= "").join("/"))
    let returnStatement = directories
    directories.forEach((directory) => {
        if(!directory.endsWith(".html")) {
            returnStatement = returnStatement.concat(getDirectories(directory, userId))
        }
    })
    return returnStatement
    
    
}