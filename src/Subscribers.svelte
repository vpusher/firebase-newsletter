<script lang="ts">
    import { db } from './firebase/firebase';
    import Subscriber from './Subscriber.svelte';
    import { collection, getDocs } from "firebase/firestore";
    import { onMount } from 'svelte'

    let subs = [];

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "subscribers"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            subs.push(doc.data());
        });
        subs = subs
    });
</script>

{#if subs.length > 0}
    {#each subs as sub}
        <Subscriber {...sub} />
    {/each}
{:else}
    <p>Aucun subs.</p>
{/if}