<script>
	import { Button } from 'flowbite-svelte';
	export let data;

	// console.log(data);
	import { addToCart } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';
	import { SignedIn } from 'sveltefire';
</script>

<Toaster />
<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/P3pI6xzovu0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c2hvcHxlbnwwfHx8fDE3MTQzNTAyOTJ8MA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">{data.item.name}</h2>
	</div>
</div>
<div class="bg-gray-100 py-8 dark:bg-gray-800">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="-mx-4 flex flex-col md:flex-row">
			<div class="px-4 md:flex-1">
				<div class="mb-4 h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img class="h-full w-full object-cover" src={data.item.image[0]} alt="Product Image" />
				</div>
			</div>
			<div class="px-4 md:flex-1">
				<h2 class="mb-2 text-2xl font-bold text-gray-800 dark:text-white">{data.item.name}</h2>
				<p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
					{data.item.shortDescription}
				</p>
				<div class="mb-4 flex">
					<div class="mr-4">
						<span class="font-bold text-gray-700 dark:text-gray-300">Booking Price:</span>
						<span class="text-gray-600 dark:text-gray-300">Rs.{data.item.price}</span>
					</div>
					<!-- <div>
						<span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
						<span class="text-gray-600 dark:text-gray-300">In Stock</span>
					</div> -->
				</div>

				<div>
					<span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
					<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
						{data.item.longDescription}
					</p>
				</div>
				<SignedIn let:user>
					<div class=" my-4 mb-4 flex gap-4">
						<!-- <Button
							on:click={() => {
								addToCart(user.uid, data.item.id ? data.item.id : '');
								toast.success('Item added to cart');
							}}>Add to Cart</Button
						> -->

						<!-- <Button color="light">Add to Wishlist</Button> -->
					</div>
				</SignedIn>
			</div>
		</div>
	</div>
</div>
