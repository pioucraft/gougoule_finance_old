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

console.log(await DBClient.query("select * from defaultcurrency;"))

console.log("done !")

DBClient.end()