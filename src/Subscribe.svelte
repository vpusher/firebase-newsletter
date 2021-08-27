<script>
    import { db } from './firebase/firebase';

    let email;
    let lastSub = null;

    function handle(e) {
        e.preventDefault();
        subscribe(email);
        email = '';
    }

    async function subscribe(email) {
		const res = await fetch('http://localhost:3001/newsletter-6ba9f/us-central1/api/subscribe', {
			method: 'POST',
			body: JSON.stringify({
				email
			}),
            headers: {
                'content-type': 'application/json'
            }
		})
		
		const json = await res.json();
		lastSub = JSON.stringify(json, null, 4);
	}
</script>

<form method="POST" action="" on:submit={handle}>
    <input type="email" name="email" bind:value={email} required />
    <button type="submit">Subscribe</button>
</form>

{#if lastSub}
<p>
	Last sub:
</p>
<pre>
    {lastSub}
</pre>  
{/if}