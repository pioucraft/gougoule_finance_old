export function expandFolder(location, filesAndFolders) {
    if(!location) return [filesAndFolders.filter(x => !x.includes("/")), ""];
    
    filesAndFolders = filesAndFolders.filter(x => x.startsWith(`${location}/`) && !x.split(`${location}/`)[1].includes("/"))
    return [filesAndFolders, location]
}