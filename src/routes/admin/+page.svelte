<script>
	import authorizedUsersStore from '$stores/authorizedUsersStore';

	let newauthorizedUser = '';

	const addauthorizedUser = () => {
		if (newauthorizedUser.trim() !== '') {
			authorizedUsersStore.addauthorizedUser(newauthorizedUser);
			newauthorizedUser = ''; // Réinitialiser le champ de saisie après l'ajout
		}
	};

	const deleteauthorizedUser = (id) => {
		authorizedUsersStore.deleteauthorizedUser(id);
	};
</script>

<h1>authorizedUsers store</h1>

<input
	type="text"
	bind:value={newauthorizedUser}
	placeholder="Ajouter un utilisateur ..."
	on:keydown={(e) => e.key === 'Enter' && addauthorizedUser()}
/>
<button on:click={addauthorizedUser}>Add</button>

<ul>
	{#each $authorizedUsersStore as authorizedUser (authorizedUser.id)}
		<li>
			<span>{authorizedUser.id}</span>
			<button on:click={() => deleteauthorizedUser(authorizedUser.id)}>Supprimer</button>
		</li>
	{/each}
</ul>

<pre id="json">{JSON.stringify($authorizedUsersStore, undefined, 2)}</pre>

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}
</style>
