import { api } from "./routes/api"
import { calculateBalance } from "./modules/calculateBalance";

Bun.serve({
    port: 3000,
    async fetch(req) {
        return await fetchHandler(req);
    },
});


async function fetchHandler(req) {
    let url = new URL(req.url)
    if(url.pathname.startsWith("/api/")) {
        return await api(req)
    }
}