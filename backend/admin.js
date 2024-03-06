import inquirer from 'inquirer';
import { DBClient } from './modules/db';

let answer = await inquirer.prompt({
    "name": "command", 
    "type": "list", 
    "message": "What do you want to do ?", 
    choices: [
        "Create a new user", 
        "Delete an existing user", 
        "Manage admins"
    ]
})

switch(answer.command) {
    case "Create a new user": {
        createUserWithPrompt()
    }
}

async function createUserWithPrompt() {
    console.log("\nCreating a new user...\n")
    let userData = await inquirer.prompt([
        {
            "name": "name",  
            "message": "Enter name : ", 
        },
        {
            "name": "email",  
            "message": "Enter email : ", 
        },
        {
            "name": "password",  
            "message": "Enter password : ", 
        },
        {
            "name": "storage",
            "message": "Enter storage path : "
        }
    ])
    userData.password = await Bun.password.hash(userData.password);

    await DBClient.query("INSERT INTO users (name, email, password, storage) VALUES ($1, $2, $3, $4)", [userData.name, userData.email, userData.password, userData.storage])

    console.log("New user successfully created, you can now safely Ctrl+C this script.")
}