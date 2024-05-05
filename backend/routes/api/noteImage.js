import { createUserFolder } from "../../modules/createUserFolder";
import { DBClient } from "../../modules/db";
import { loginFunction } from "../../modules/login";

export async function noteImage(req) {
    if(req.method == "POST") return await postImage(req);
    else if(req.method == "GET") return await getImage(req);
}

async function postImage(req) {
    let formData = await req.formData();
    
    let password = formData.get("password");
    let email = formData.get("email");

    if(!(await loginFunction({"password": password, "email": email}))) {
        return new Response("401 Unauthorized", {status: 401})
    }
    

    let userId = (await DBClient.query("SELECT * FROM users where email = $1", [email])).rows[0]["id"]
    createUserFolder(userId)

    let image = formData.get("image");
    console.log(image)
    let name = `${crypto.randomUUID()}.${image.type.split("/")[1]}`
    if(name.includes("..")) return new Response("403 Forbidden", {status: 403})

    Bun.write(`${__dirname}/../../userFiles/${userId}/notesImages/${name}`, image)
    return new Response(`${userId}/${name}`);
}

async function getImage(req) {
    let path = new URL(req.url).pathname.split("/");
    let userId = path[3];
    let name = path[4]
    let pathToFile = (`userFiles/${userId}/notesImages/${name}`)
    if(pathToFile.includes("..")) return new Response("403 Forbidden", {status: 403})

    let file = await Bun.file(`${__dirname}/../../${pathToFile}`);
    return new Response(file, {headers:{'Content-Type': 'image'}});
}