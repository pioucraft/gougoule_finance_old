import { DBClient } from "./db"
import { unlinkSync } from "node:fs"
import { opendir } from "node:fs/promises"

export async function backup() {
    console.log("STARTING TO MAKE THE BACKUP")

    let lowestFileNumber = ""
    try {
    
        const listOfFiles = await opendir("./backups")
        for await(let file of listOfFiles) {
            console.log(file.name)
            lowestFileNumber = Number(file.name.split(".")[0]) < Number(lowestFileNumber.split(".")[0]) || lowestFileNumber == "" ? file.name : lowestFileNumber
        }
        await unlinkSync(`./backups/${lowestFileNumber}`)

    }
    catch(err) {
        // if error, it means that there is no directory or the directory is empty
        console.log("error")
        for(let i=0;i<=Number(process.env.HOW_MANY_BACKUP_TO_KEEP)-1;i++ ) await Bun.write(`./backups/${i}.backup`, "")
        
        lowestFileNumber = "-1.backup"
    }

    let usersFromDB = (await DBClient.query("SELECT * FROM users;")).rows
    let accountsFromDB = (await DBClient.query("SELECT * FROM accounts;")).rows
    let transactionsFromDB = (await DBClient.query("SELECT * FROM transactions;")).rows
    let balanceHistoryFromDB = (await DBClient.query("SELECT * FROM balancehistory;")).rows
    let defaultCurrency = (await DBClient.query("SELECT * FROM defaultcurrency;")).rows

    let backupData = {"usersFromDB": usersFromDB, "accountsFromDB": accountsFromDB, "transactionsFromDB" : transactionsFromDB, "balanceHistoryFromDB": balanceHistoryFromDB, "defaultCurrency": defaultCurrency}

    await Bun.write(`./backups/${Number(lowestFileNumber.split(".")[0])+Number(process.env.HOW_MANY_BACKUP_TO_KEEP)}.backup`, JSON.stringify(backupData))

    console.log("BACKUP COMPLETED")
}