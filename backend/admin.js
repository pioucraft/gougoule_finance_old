import inquirer from 'inquirer';
import { DBClient } from './modules/db';
import sha256 from "js-sha256"

let answer = await inquirer.prompt({
    "name": "command", 
    "type": "list", 
    "message": "What do you want to do ?", 
    choices: [
        "Create a new user", 
        "Modify an existing user", 
        "Delete an existing user"
    ]
})

if(answer.command == "Create a new user") {
    createUser();
}
else if(answer.command == "Modify an existing user") {
    modifyUser();
}
else if(answer.command == "Delete an existing user") {
    deleteUser()
}

async function createUser() {
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
        }
    ])
    userData.password = await Bun.password.hash(sha256(userData.password));
    await DBClient.query("INSERT INTO users (name, email, password, storage) VALUES ($1, $2, $3, $4)", [userData.name, userData.email, userData.password, ""])

    console.log("New user successfully created, you can now safely Ctrl+C this script. DON'T FORGET TO RUN 'bun migrations.js'")
}

async function modifyUser() {
    let userData = await inquirer.prompt([
        {
            "name": "oldName",
            "message": "Enter the current name of your user : "
        },
        {
            "name": "name",  
            "message": "Enter the new name (leave empty for unchanged) : ", 
        },
        {
            "name": "email",  
            "message": "Enter the new email (leave empty for unchanged) : ", 
        },
        {
            "name": "password",  
            "message": "Enter the new password (leave empty for unchanged) : ", 
        }
    ])

    if(userData.email) {
        await DBClient.query("UPDATE users SET email = $1 WHERE name = $2", [userData.email, userData.oldName]);
    }
    if(userData.password) {
        userData.password = await Bun.password.hash(sha256(userData.password));
        await DBClient.query("UPDATE users SET password = $1 WHERE name = $2", [userData.password, userData.oldName]);
    }
    if(userData.name) {
        await DBClient.query("UPDATE users SET name = $1 WHERE name = $2", [userData.name, userData.oldName]);
    }
    console.log("Success !")

    DBClient.end()
}

async function deleteUser() {
    let userData = await inquirer.prompt([
        {
            "name": "name",
            "message": "Enter the name of the user you want to delete : "
        }
    ])

    await DBClient.query("DELETE FROM users WHERE name = $1", [userData.name]);

    console.log("Success !")

    DBClient.end()
}