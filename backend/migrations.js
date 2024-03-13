import { DBClient } from "./modules/db";

console.log("Let's add tables to your database !")
await DBClient.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32),
    email VARCHAR(128) UNIQUE,
    password VARCHAR(128),
    storage VARCHAR(128),
    isadmin BOOLEAN DEFAULT false
)`)

await DBClient.query(`CREATE TABLE IF NOT EXISTS defaultcurrency (
    userid SERIAL,
    defaultcurrency VARCHAR(4)
)`)

let users = (await DBClient.query("SELECT * FROM users;")).rows
for(let i=0;i<users.length;i++) {
    let userid = users[i]["id"]
    if(!(await DBClient.query("SELECT * FROM defaultcurrency WHERE userid = $1", [userid])).rows.length) {
        await DBClient.query(`INSERT INTO defaultcurrency
        (userid, defaultcurrency)
        VALUES ($1, 'USD')`, [userid])
    }
    
}

await DBClient.query(`CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    userid SERIAL,
    name VARCHAR(32),
    balance float8
)`)

await DBClient.query(`CREATE TABLE IF NOT EXISTS converter (
    type VARCHAR(1),
    name VARCHAR(256),
    symbol VARCHAR(32),
    price float8,
    currency VARCHAR(4)
)`)

if((await DBClient.query("SELECT * FROM converter")).rows.length < 70000) {
    console.log("DO NOT INTERRUPT THIS SCRIPT !!!")
    await DBClient.query("DELETE FROM converter;")
    let stocks = await (await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.FINANCIAL_MODELING_PREP_API}`)).json()

    for(let i=0;i<stocks.length;i++) {
        let stock = stocks[i]
        try {
            
            await DBClient.query(`INSERT INTO converter (type, name, symbol, price)
            VALUES ('s', $1, $2, $3)`, [stock.name, stock.symbol, stock.price])
            if(i%1000 == 0) {
                console.log(i/stocks.length*100 + "%")
            }
        }
        catch(err) {
            console.log(stock)
        }
    }

    let cryptos = await (await fetch("https://api.binance.com/api/v3/ticker/price")).json()
    for(let i=0;i<cryptos.length;i++) {
        let crypto = cryptos[i]
        if(crypto.symbol.endsWith("USDT")) {
            let symbol = crypto.symbol.split("USDT")[0]
            await DBClient.query(`INSERT INTO converter (type, name, symbol, price, currency)
            VALUES ('c', $1, $2, $3, 'USD')`, [symbol, symbol, crypto.price])
        }
    }

    let forexes = Object.entries((await (await fetch("https://api.exchangerate-api.com/v4/latest/USD")).json())["rates"])
    console.log(forexes)
    for(let i=0;i<forexes.length;i++) {
        let forex = forexes[i]
        await DBClient.query(`INSERT INTO converter (type, name, symbol, price, currency) 
        VALUES ('f', $1, $2, $3, 'USD')`, [forex[0], forex[0], forex[1]])
    }
}

await DBClient.query(`CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    amount float8,
    date date DEFAULT CURRENT_DATE,
    type VARCHAR(1),
    symbol VARCHAR(32),
    name VARCHAR(256),
    accountid INTEGER
)`)

await DBClient.query(`CREATE TABLE IF NOT EXISTS balanceHistory (
    balance float8,
    isnotaccount BOOLEAN,
    accountid INTEGER,
    date date DEFAULT CURRENT_DATE
)`)


let query = "SELECT * FROM balancehistory;"
console.log((await DBClient.query(query)).rows)

console.log("done !")

DBClient.end()