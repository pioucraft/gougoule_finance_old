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

await Object.entries(file).forEach(async (table) => {
    await DBClient.query(`DELETE FROM ${table[0]}`)
    await table[1].forEach(async (row) => {
        let columns = []
        let entries = []
        await Object.entries(row).forEach(async (column) => {
            if(column[1]) {
                columns.push(column[0])
                entries.push(column[1])
            }
        })
        
        DBClient.query(`INSERT INTO ${table[0]} (${columns.join(", ")}) VALUES (${entries.map((entry) => `'${entry}'`).join(", ")})`)
        
    });
})

console.log("If this script does not end automatically after a while, you can CTRL+C")
