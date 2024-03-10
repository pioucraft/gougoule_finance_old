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
/*
await DBClient.query("DROP TABLE converter;")
*/
await DBClient.query(`CREATE TABLE IF NOT EXISTS converter (
    type VARCHAR(1),
    name VARCHAR(256),
    symbol VARCHAR(32),
    price float8,
    currency VARCHAR(4)
)`)
/*
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
}*/

console.log("done !")

DBClient.end()