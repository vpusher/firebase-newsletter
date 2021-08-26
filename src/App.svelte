<script>
    import Login from './Login.svelte';
    import Profile from './Profile.svelte';
    import { auth } from './firebase/firebase'
    import { onAuthStateChanged } from 'firebase/auth'
    import { onMount } from 'svelte';

    export let user;

    onAuthStateChanged(auth, (u) => {
        if (u) {
            user = u
        } else {
            user = null
        }
    });

    onMount(() => {
    });
</script>

<svelte:head>

</svelte:head>

<main>
    <h1>Hello!</h1>
    <Login user={user}/>
    {#if user}
        <Profile {...user} />
    {/if}
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