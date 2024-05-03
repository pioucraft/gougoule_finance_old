import { getCookie } from 'svelte-cookie';
import axios from "axios"

export function expandFolder(location, filesAndFolders) {
    if(!location) return [filesAndFolders.filter(x => !x.includes("/")), "", ""];
    
    filesAndFolders = filesAndFolders.filter(x => x.startsWith(`${location}/`) && !x.split(`${location}/`)[1].includes("/"))
    return [filesAndFolders, location, location]
}

export async function makeData(url) {
    let password = getCookie("password")
    let email = getCookie("email")
    let fetchBody = JSON.stringify({"email": email, "password": password})

    let filesAndFolders = (await axios.post(`${url}/api/getNotes`, fetchBody)).data
    return filesAndFolders
}

export async function createNewFolder(url, location) {
    try {
        let folderName = prompt("Enter the name of your new folder")
        let password = getCookie("password")
        let email = getCookie("email")
        
        await axios.post(`${url}/api/notesFolder`, JSON.stringify({"email": email, "password": password, "name": folderName, "location": location}))
    }
    catch(err) {
        alert("Error")
    }
    let filesAndFolders = await makeData(url)
    let currentFilesAndFolders = expandFolder(location, filesAndFolders)[0]
    console.log(filesAndFolders)
    return [filesAndFolders, currentFilesAndFolders]
}

export async function createNewNote(url, location) {
    try {
        let noteName = prompt("Enter the name of your new note")
        let password = getCookie("password")
        let email = getCookie("email")
        
        await axios.post(`${url}/api/note`, JSON.stringify({"email": email, "password": password, "name": noteName, "location": location}))
    }
    catch(err) {
        alert("Error")
    }
    let filesAndFolders = await makeData(url)
    let currentFilesAndFolders = expandFolder(location, filesAndFolders)[0]
    return [filesAndFolders, currentFilesAndFolders]
}

export async function editNote(url, location) {
    try {
        let newName = prompt("Enter the new name")
        let password = getCookie("password")
        let email = getCookie("email")
        
        await axios.put(`${url}/api/note`, JSON.stringify({"email": email, "password": password, "name": newName, "location": location}))
    }
    catch(err) {
        alert("Error")
    }
    let filesAndFolders = await makeData(url)
    let currentFilesAndFolders = expandFolder("", filesAndFolders)[0]
    console.log(currentFilesAndFolders)
    return [filesAndFolders, currentFilesAndFolders, "", ""]
}