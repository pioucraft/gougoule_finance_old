import inquirer from 'inquirer';
import { opendir } from "node:fs/promises"
import { DBClient } from "./modules/db"

let listOfBackups = []
const listOfFiles = await opendir("./backups")
for await(let file of listOfFiles) {
    listOfBackups.push(file.name)
    console.log(file.name)
}

let backupToRestore = await inquirer.prompt([{"name": "file", "message": "Select a backup to restore (the file with the highest number in the list is the last backup)"}])

let file = await Bun.file(`./backups/${backupToRestore.file}`).json()

var listOfStocks = []

for(let table of Object.entries(file)) {
    await DBClient.query(`DELETE FROM ${table[0]}`)
    for(let row of table[1]) {
        if(table[0] == "transactions" && row.type == "s" && !listOfStocks.includes(row.symbol)) listOfStocks.push(row.symbol)

        let columns = []
        let entries = []
        Object.entries(row).forEach(async (column) => {
            if(column[1]) {
                columns.push(column[0])
                entries.push(column[1])
            }
        })
        
        DBClient.query(`INSERT INTO ${table[0]} (${columns.join(", ")}) VALUES (${entries.map((entry) => `'${entry}'`).join(", ")})`)
        
    }
    console.log(listOfStocks)
    if(listOfStocks.length) {
        for(let stock of listOfStocks) {
            let currency = (await (await fetch(`https://financialmodelingprep.com/api/v3/search?query=${stock}&apikey=${process.env.FINANCIAL_MODELING_PREP_API}`)).json())[0].currency
            await DBClient.query("UPDATE converter SET currency = $1 WHERE type = 's' AND symbol = $2", [currency, stock])
        }
        listOfStocks = []
    }
}

console.log("Success !")