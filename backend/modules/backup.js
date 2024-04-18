import { DBClient } from "./db"
import { unlinkSync } from "node:fs"
import { opendir } from "node:fs/promises"

export async function backup() {
    console.log("STARTING TO MAKE THE BACKUP")

    let lowestFileNumber = ""
    try {
    
        const listOfFiles = await opendir("./backups")
        for await(let file of listOfFiles) {
            lowestFileNumber = Number(file.name.split(".")[0]) < Number(lowestFileNumber.split(".")[0]) || lowestFileNumber == "" ? file.name : lowestFileNumber
        }
        await unlinkSync(`./backups/${lowestFileNumber}`)

    }
    catch(err) {
        // if error, it means that there is no directory or the directory is empty
        for(let i=0;i<=Number(process.env.HOW_MANY_BACKUP_TO_KEEP)-1;i++ ) await Bun.write(`./backups/${i}.backup`, "")
        
        lowestFileNumber = "-1.backup"
    }

    let users = (await DBClient.query("SELECT * FROM users;")).rows
    let accounts = (await DBClient.query("SELECT * FROM accounts;")).rows
    let transactions = (await DBClient.query("SELECT * FROM transactions;")).rows
    let balancehistory = (await DBClient.query("SELECT * FROM balancehistory;")).rows
    let defaultcurrency = (await DBClient.query("SELECT * FROM defaultcurrency;")).rows

    let backupData = {"users": users, "accounts": accounts, "transactions" : transactions, "balancehistory": balancehistory, "defaultcurrency": defaultcurrency}

    await Bun.write(`./backups/${Number(lowestFileNumber.split(".")[0])+Number(process.env.HOW_MANY_BACKUP_TO_KEEP)}.backup`, JSON.stringify(backupData))

    console.log("BACKUP COMPLETED")
}