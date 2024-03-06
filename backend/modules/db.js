import { Client } from "pg"

//connect to the database
export const DBClient = new Client({database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD})
DBClient.connect().then(() => console.log("Connected to the database"))