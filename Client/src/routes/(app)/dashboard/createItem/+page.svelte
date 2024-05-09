<script lang="ts">
	import { Input, Textarea, Select, Fileupload, Button, Label } from 'flowbite-svelte';
	import { SignedIn } from 'sveltefire';
	import type { Item } from '$lib/firebase';
	import { uploadItemImage, addItem } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';

	const formData = {
		userID: '',
		name: '',
		shortDescription: '',
		longDescription: '',
		price: '',
		category: '',
		image: []
	};

	const categories = [
		'Event Planning and Coordination',
		'Decor and Designs',
		'Catering and Culinary',
		'Fashion and Beauty',
		'Photography and Videography',
		'Music and Entertainment'
	];

	function handleSubmit() {
		uploadItemImage(formData.image).then((url) => {
			const item: Item = {
				userID: formData.userID,
				name: formData.name,
				shortDescription: formData.shortDescription,
				longDescription: formData.longDescription,
				price: formData.price,
				category: formData.category,
				image: url
			};
			addItem(item).then(() => {
				toast.success('Item created successfully');
				formData.name = '';
				formData.shortDescription = '';
				formData.longDescription = '';
				formData.price = '';
				formData.category = '';
				formData.image = [];
			});
		});
	}
</script>

<Toaster />
<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/P3pI6xzovu0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c2hvcHxlbnwwfHx8fDE3MTQzNTAyOTJ8MA&force=true&w=1920')] bg-cover"
>
	<div class="h-full w-full bg-primary-900 p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Create Item</h2>
	</div>
</div>

<SignedIn let:user>
	<div class="flex flex-col items-center justify-center gap-8 p-8">
		<h2 class="text-2xl font-bold">Create Listing</h2>
		<form on:submit|preventDefault={handleSubmit} class="flex w-full max-w-xl flex-col gap-4">
			<span class="hidden">
				{(formData.userID = user.uid)}
			</span>
			<div>
				<Label>Item Name</Label>
				<Input label="Listing Name" bind:value={formData.name} />
			</div>
			<div>
				<Label>Short Description</Label>
				<Textarea label="Short Description" bind:value={formData.shortDescription} />
			</div>
			<div>
				<Label>Long Description</Label>
				<Textarea label="Long Description" bind:value={formData.longDescription} />
			</div>
			<div>
				<Label>Price (Rs.)</Label>
				<Input type="number" label="Price" bind:value={formData.price} />
			</div>
			<div>
				<Label>Category</Label>
				<Select label="Category" bind:value={formData.category}>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</Select>
			</div>
			<div>
				<Label>Item Image</Label>
				<Fileupload label="Item Image" bind:files={formData.image} accept="image/*" />
			</div>
			<Button type="submit">Create Listing</Button>
		</form>
	</div>
</SignedIn>
