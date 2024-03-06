import { DBClient } from "./modules/db";

console.log("Let's add tables to your database !")
DBClient.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32),
    email VARCHAR(128) UNIQUE,
    password VARCHAR(128),
    storage varchar(128),
    isadmin BOOLEAN DEFAULT false
)`)

console.log("done !")

console.log(await DBClient.query("select * from users;"))