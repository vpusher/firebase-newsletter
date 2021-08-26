<script>
    import { db } from './firebase/firebase';

    export let email

    function handle(e) {
        e.preventDefault();
    }
</script>

<form action="" on:submit={handle}>
    <input type="email" name="email" required />
    <button type="submit">Subscribe</button>
</form>