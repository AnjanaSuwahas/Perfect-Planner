<script>
	import { Button, Rating, Textarea, Label, Select, Star } from 'flowbite-svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { addReview } from '$lib/firebase';

	export let data;
	console.log(data);

	const review = [
		{
			rating: 1
		},
		{
			rating: 2
		},
		{
			rating: 3
		},
		{
			rating: 4
		},
		{
			rating: 5
		}
	];

	let selectedRating = 3;
	let userReview = '';

	const submitReview = async () => {
		if (userReview === '') {
			toast.error('Please enter a review');
			return;
		}
		await addReview(
			data.purchases?.id,
			userReview,
			data.purchases?.itemID,
			data.purchases?.userID,
			selectedRating
		);
		data.purchases.reviewed = true;
		toast.success('Review submitted');
	};
</script>

<Toaster />
<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/P3pI6xzovu0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c2hvcHxlbnwwfHx8fDE3MTQzNTAyOTJ8MA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Write a Review</h2>
	</div>
</div>
<div class="p-8">
	<h2 class="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl dark:text-white">
		Write a Review
	</h2>
	<div
		class="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 rounded-sm border bg-white px-5 pb-2.5 pt-6 xl:pb-1"
	>
		<div class="mx-auto max-w-xl p-8">
			{#if !data.purchases?.reviewed}
				<!-- Review Box -->
				<div class="flex flex-col gap-4">
					<div>
						<Label for="first_name" class="mb-2">Rating</Label>
						<div class="flex gap-2">
							{#each review as item}
								<Star
									fillPercent={100}
									on:click={() => {
										selectedRating = item.rating;
									}}
								/>
							{/each}
							<p>{selectedRating} out of 5</p>
						</div>
					</div>
					<div>
						<Label for="first_name" class="mb-2">Review</Label>
						<Textarea
							id="textarea-id"
							placeholder="Your message"
							rows="4"
							name="message"
							bind:value={userReview}
						/>
					</div>
					<Button on:click={submitReview} color="primary">Submit Review</Button>
				</div>
			{/if}
			{#if data.purchases?.reviewed}
				<p>You have already reviewed this product</p>
			{/if}
		</div>
	</div>
</div>
