<script>
    export let displayName
    export let email
    export let photoURL
    export let uid
</script>

<img src={ photoURL } width="100" alt="user avatar">
<p>Welcome {displayName ?? uid} ({email})</p>