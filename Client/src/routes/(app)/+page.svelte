<script lang="ts">
	import { Button, Dropdown, DropdownItem, Search } from 'flowbite-svelte';
	import { ChevronDownOutline, SearchOutline } from 'flowbite-svelte-icons';
	import toast, { Toaster } from 'svelte-french-toast';

	const items = [
		{ label: 'Venue' },
		{ label: 'Attire' },
		{ label: 'Catering' },
		{ label: 'Entertainment' },
		{ label: 'Decorations' },
		{ label: 'Makeup & Hair' },
		{ label: 'Photography & Videography' },
		{ label: 'Liquor' },
		{ label: 'Technical support' },
		{ label: 'Volunteer support' },
		{ label: 'Floral Arrangements' },
		{ label: 'Cakes' },
		{ label: 'Food & drink' },
		{ label: 'Jewelry' },
		{ label: 'Thank you gift for guest' }
	];

	// biome-ignore lint/style/useConst: <explanation>
	let selectCategory = 'All categories';

	let search = '';

	const performSearch = () => {
		search = search.trim();
		if (search === '') {
			toast.error('Please enter a search term');
			return;
		}

		// go to search page
		window.location.href = `/gallery?search=${search}`;
	};
</script>

<Toaster />
<div
	class="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-[url('https://unsplash.com/photos/kWJm2a6DbAw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8YmFieSUyMHNob3dlcnxlbnwwfHx8fDE3MTQ1Mzk1ODZ8MA&force=true&w=1920')] bg-cover p-4"
>
	<form class="mx-4 flex w-full max-w-xl">
		<div class="relative">
			<Button class="border-primary-700 whitespace-nowrap rounded-e-none border border-e-0">
				{selectCategory}
				<ChevronDownOutline class="ms-2.5 h-2.5 w-2.5" />
			</Button>
			<Dropdown classContainer="w-40">
				{#each items as { label }}
					<DropdownItem
						on:click={() => {
							selectCategory = label;
						}}
						class={selectCategory === label ? 'underline' : ''}
					>
						{label}
					</DropdownItem>
				{/each}
			</Dropdown>
		</div>
		<Search
			size="md"
			class="rounded-none py-2.5"
			placeholder="Search Mockups, Logos, Design Templates..."
			bind:value={search}
		/>
		<Button class="rounded-s-none !p-2.5" on:click={performSearch}>
			<SearchOutline class="h-5 w-5" />
		</Button>
	</form>
	<div class="bg-primary-900 mx-4 w-full max-w-xl p-16 text-center opacity-75">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">
			Crafting Memorable<br />Events With<br />Expert Precision.
		</h2>
	</div>
</div>
