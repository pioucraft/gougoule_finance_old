import { getCookie } from 'svelte-cookie';
import axios from "axios"

export function expandFolder(location, filesAndFolders) {
    if(!location) return [filesAndFolders.filter(x => !x.includes("/")), ""];
    
    filesAndFolders = filesAndFolders.filter(x => x.startsWith(`${location}/`) && !x.split(`${location}/`)[1].includes("/"))
    return [filesAndFolders, location]
}

export async function makeData(url) {
    let password = getCookie("password")
    let email = getCookie("email")
    let fetchBody = JSON.stringify({"email": email, "password": password})

    let filesAndFolders = (await axios.post(`${url}/api/getNotes`, fetchBody)).data
    return filesAndFolders
}