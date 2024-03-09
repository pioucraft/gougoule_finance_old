import { loginFunction } from "../../modules/login"
import { DBClient } from "../../modules/db"
import { calculateBalance } from "../../modules/calculateBalance"

export async function defaultCurrency(req) {
    let body = await req.json()

    if(!(await loginFunction(body))) {
        return new Response("401 Unauthorized", {status: 401})
    }

    if (req.method == "POST") return await getDefaultCurrency(body)
    else if(req.method == "PATCH") return await changeDefaultCurrency(body)
}

async function changeDefaultCurrency(body) {
    await DBClient.query(`UPDATE defaultcurrency
    SET defaultcurrency = $1
    where email = $2`, [body.defaultCurrency, body.email])
    await calculateBalance()
    return new Response("200 Success")
}

async function getDefaultCurrency(body) {
    let currencyJsonObject = (await DBClient.query(`SELECT * FROM defaultcurrency WHERE email = $1`, [body.email])).rows[0]
    return new Response(JSON.stringify(currencyJsonObject), {headers:{"Content-type": "application/json"}})
}