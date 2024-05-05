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

    let notesDir = dir + "/notes";
    if (!fs.existsSync(notesDir)) {
        fs.mkdirSync(notesDir);
    }

    let notesImagesDir = dir + "/notesImages";
    if (!fs.existsSync(notesImagesDir)) {
        fs.mkdirSync(notesImagesDir);
    }
}