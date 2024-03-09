import { DBClient } from "./db"

export async function loginFunction(body) {

    let userFromDB = (await DBClient.query("SELECT * FROM users WHERE email = $1", [body.email])).rows[0]

    if(await Bun.password.verify(body.password, userFromDB.password)) {
        return true
    }
    else {
        return false
    }
}