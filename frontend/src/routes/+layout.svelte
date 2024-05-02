<script>
    import { onMount } from "svelte";

    import { login } from "./script"

    const url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
        if(location.pathname != "/login") await login(url)
    })
</script>

<style> 

</style>

<slot />