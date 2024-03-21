<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, type User } from 'firebase/auth';
	import { authStore, loginWithGoogle, logout } from '$stores/authGoogleStore';
	import authorizedUsersStore from '$stores/authorizedUsersStore';

	let user: User | null;
	const nonAuthRoutes = ['/'];
	let isAuthorized = false;

	onMount(async () => {
		onAuthStateChanged(auth, async (newUser) => {
			user = newUser;
			authStore.set({
				isLoggedIn: user != null,
				user: newUser,
				firebaseControlled: true
			});

			let authorizedUsers = await authorizedUsersStore.fetchauthorizedUsers();
			let authorizedUsersUidsList = authorizedUsers.map((authorizedUser) => authorizedUser.id);
			isAuthorized = authorizedUsersUidsList.includes(user?.email || '');

			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (!isAuthorized && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (!user) {
				return;
			}
		});
	});
</script>

{#if user}
	{#if isAuthorized}
		<p>Vous êtes connecté en tant que {user.displayName} - {user.email}</p>
		<button on:click={logout}>Logout</button>
		<hr />
		<main>
			<slot />
		</main>
	{:else}
		<p>Vous n'êtes pas autorisé à acceder à l'application.</p>
		<button on:click={logout}>Logout</button>
	{/if}
{:else}
	<p>Vous n'êtes pas connecté.</p>
	<button on:click={loginWithGoogle}>Login with Google</button>
{/if}
