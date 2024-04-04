import { loginFunction } from "../../modules/login"

export async function login(req) {
    let body = await req.json()

    if(await loginFunction(body)) {
        return new Response("200 Success")
    }
    else {
        return new Response("401 Unauthorized", {status: 401})
    }
}
