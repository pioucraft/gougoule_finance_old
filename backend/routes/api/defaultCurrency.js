import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"
import { calculateBalance } from "../../modules/calculateBalance"

export async function defaultCurrency(req) {
    let body = await req.json()
    if(!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) return new Response("400 Bad Request", {status: 400})

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }
    
    if (req.method == "POST") return await getDefaultCurrency(body)
    else if(req.method == "PUT") return await changeDefaultCurrency(body)
}

async function changeDefaultCurrency(body) {
    if(!body.hasOwnProperty("defaultCurrency")) return new Response("400 Bad Request", {status: 400})
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    await DBClient.query(`UPDATE defaultcurrency
    SET defaultcurrency = $1
    where userid = $2`, [body.defaultCurrency, userId])
    await calculateBalance()
    return new Response("200 Success")
}

async function getDefaultCurrency(body) {
    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [body.email])).rows[0]["id"]
    let currencyJsonObject = (await DBClient.query(`SELECT * FROM defaultcurrency WHERE userid = $1`, [userId])).rows[0]
    let price = (await DBClient.query("SELECT * FROM converter WHERE symbol = $1 AND type = 'f'", [currencyJsonObject.defaultcurrency])).rows[0]
    currencyJsonObject["price"] = price.price
    return new Response(JSON.stringify(currencyJsonObject), {headers:{"Content-type": "application/json"}})
}