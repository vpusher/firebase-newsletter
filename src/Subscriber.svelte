<script>
    import { space } from "svelte/internal";

    export let id;
    export let email;
    export let created;
    export let confirmed;
</script>

<style>
</style>

<li>
    <span>{email}</span>
    <em>{created}</em>
    {#if confirmed}
        <i>✅</i>
    {:else}
        <i>❌</i>
    {/if}
</li>