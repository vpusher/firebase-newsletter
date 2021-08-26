<script>
    import Profile from './Profile.svelte'
    import { auth, googleProvider } from './firebase/firebase'
    import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

    export let user;

    function login() {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const idToken = result.user.getIdToken();
            // The signed-in user info.
            user = result.user;
            
            console.info('Access Token', accessToken);
            return user.getIdToken();
        })
        .then((idToken) => {
            console.info('ID Token', idToken);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            user = null;
        }).catch((error) => {
            // An error happened.
        });
    }
</script>

<section>
    {#if user}
        <button on:click={logout}>Logout</button>
    {:else} 
        <button on:click={login}>Signin with Google</button>
    {/if}
</section>