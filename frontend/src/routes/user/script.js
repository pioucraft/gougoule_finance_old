import { goto } from '$app/navigation';
import { deleteCookie } from 'svelte-cookie';

export function logout() {
    deleteCookie("password")
    deleteCookie("email")
    goto("/login")
}