import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"

export async function login(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    if(req.method == "POST") return await createTransaction(body)
    else if(req.method == "PATCH") return await modifyTransaction(body)
    else if(req.method == "DELETE") return await deleteTransaction(body)
}

export async function createTransaction(body) {

}

export async function modifyTransaction(body) {

}

export async function deleteTransaction(body) {
    
}