import { api } from "./routes/api"
import { calculateBalance } from "./modules/calculateBalance";

Bun.serve({
    port: 3000,
    async fetch(req) {
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