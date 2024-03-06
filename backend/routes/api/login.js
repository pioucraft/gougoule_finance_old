import { DBClient } from "../../modules/db"

export async function login(req) {
    let body = await req.json()

    let userFromDB = (await DBClient.query("SELECT * FROM users WHERE email = $1", [body.email])).rows[0]

    if(await Bun.password.verify(body.password, userFromDB.password)) {
        return new Response("200 Success")
    }
    else {
        return new Response("401 Unauthorized", {status: 401})
    }
}