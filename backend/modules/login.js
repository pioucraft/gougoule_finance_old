import { DBClient } from "./db"

export async function loginFunction(body) {

    let userFromDB = (await DBClient.query("SELECT * FROM users WHERE email = $1", [body.email])).rows
    if(userFromDB[0]) userFromDB = userFromDB[0]
    else return false

    if(await Bun.password.verify(body.password, userFromDB.password)) {
        return true
    }
    else {
        return false
    }
}