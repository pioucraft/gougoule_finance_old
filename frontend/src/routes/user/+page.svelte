<style>
    #user {
        width: 100%;
    }

    #user * {
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: x-large;
    }

    #user-Logout {
        color: red;
    }

    #user-Logout svg {
        height: 3.5rem;
        width: 3.5rem;
    }
</style>

<div id="user">
    <button id="user-Logout" class="buttonWithShadow">Logout <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
</div>