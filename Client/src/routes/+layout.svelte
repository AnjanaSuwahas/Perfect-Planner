<script lang="ts">
	import '../app.pcss';
	import { FirebaseApp } from 'sveltefire';
	import { getAuth } from 'firebase/auth';
	import { app, firestore } from '$lib/firebase';

	const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
