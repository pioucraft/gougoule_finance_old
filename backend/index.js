import { api } from "./routes/api"
import { fetchQuotes } from "./modules/calculateBalance";
import { backup } from "./modules/backup";

Bun.serve({
    development: process.env.DEVELOPMENT_MODE == "true",
    port: process.env.PORT,
    async fetch(req) {
        if(req.method == "OPTIONS") return new Response("204 No Content", {status: 204, headers: {"Allow": "POST, PATCH, DELETE, PUT", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, PATCH, DELETE, PUT"}})
        let res = await fetchHandler(req);
        res.headers.set('Access-Control-Allow-Origin', '*');
        return res
    },
});


async function fetchHandler(req) {
    let url = new URL(req.url)
    if(url.pathname.startsWith("/api/")) {
        return await api(req)
    }
    else return new Response("404 Not Found", {status: 404})
}

//await calculateBalance()
if(process.env.DEVELOPMENT_MODE != "true") {
    await backup()
    await fetchQuotes()
}

setInterval(async () => {
    await fetchQuotes()
    await backup()
}, 1000*60*60*6);