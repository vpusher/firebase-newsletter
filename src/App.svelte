<script lang="ts">
    import Login from './Login.svelte';
    import Profile from './Profile.svelte';
    import { auth } from './firebase/firebase'
    import { onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';
    import Subscribers from './Subscribers.svelte';
    import Subscribe from './Subscribe.svelte';

    export let user;

    $: getUserRole = getUserRoleFromClaims(user);

    const getUserRoleFromClaims = async function (user) {
        if (user) {
            return (await user.getIdTokenResult()).claims.role;
        } else {
            return false
        }
    }

    onAuthStateChanged(auth, async (u) => {
        if (u) {
            user = u;
        } else {
            user = null;
        }
    });

    onMount(() => {
    });
</script>

<svelte:head>

</svelte:head>

<main>
    <h1>Newsletter</h1>
    {#if user}
    <Profile {...user} />
    {/if}
    <Login user={user}/>
    {#await getUserRole then role}
        {#if role === 'admin'}
            <Subscribers />
        {/if}
    {/await}
    <Subscribe />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>