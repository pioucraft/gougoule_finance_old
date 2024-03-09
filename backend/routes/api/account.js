import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"

export async function account(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    else if(req.method == "POST") return await createAccount(body)
    else if(req.method == "PATCH") return await modifyAccount(body)
    else if(req.method == "DELETE") return await deleteAccount(body)
}

async function createAccount(body) {
    await DBClient.query("INSERT INTO accoun")
}

async function modifyAccount(body) {
    
}

async function deleteAccount(body) {
    
}