import { login } from "./api/login"

export async function api(req) {
    let url = new URL(req.url)
    if(url.pathname.startsWith("/api/login")) return await login(req)
}