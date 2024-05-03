import fs from "node:fs"

export function createUserFolder(userId) {
    let dir = __dirname + '/../userFiles/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    dir += userId;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    dir += "/notes";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}