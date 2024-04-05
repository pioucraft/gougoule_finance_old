import { api } from "./routes/api"
import { calculateBalance } from "./modules/calculateBalance";

Bun.serve({
    port: 3000,
    async fetch(req) {
        if(req.method == "OPTIONS") return new Response("204 No Content", {status: 204, headers: {"Allow": "POST, PATCH, DELETE, PUT", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, PATCH, DELETE, PUT"}})
        console.log(req)
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
}