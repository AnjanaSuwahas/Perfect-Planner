<script>
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	// Define an array of product objects
	export let data;
	// biome-ignore lint/style/useConst: <explanation>
	let priceFrom = 0;
	// biome-ignore lint/style/useConst: <explanation>
	let priceTo = 1000000;
	// biome-ignore lint/style/useConst: <explanation>
	let sortBy = 'Title, DESC';

	let items = data.items;

	// sort the products based on the selected option
	// @ts-ignore
	// biome-ignore lint/suspicious/noConfusingLabels: <explanation>
	$: items = data.items.sort((a, b) => {
		if (sortBy === 'Title, DESC') {
			return a.name < b.name ? 1 : -1;
		}
		if (sortBy === 'Title, ASC') {
			return a.name > b.name ? 1 : -1;
		}
		if (sortBy === 'Price, DESC') {
			return a.price < b.price ? 1 : -1;
		}
		if (sortBy === 'Price, ASC') {
			return a.price > b.price ? 1 : -1;
		}
	});

	// filter the products based on the selected price range
	// biome-ignore lint/suspicious/noConfusingLabels: <explanation>
	$: items = data.items.filter((product) => {
		return (
			Number.parseFloat(product.price) >= priceFrom && Number.parseFloat(product.price) <= priceTo
		);
	});

	let search = '';

	onMount(() => {
		if (data.search) {
			search = data.search;
		}
	});
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
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="h-full w-full bg-primary-900 p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Gallery</h2>
	</div>
</div>

<section>
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<header>
			<h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Product Gallery</h2>
			<!-- <p class="mt-4 max-w-md text-gray-500">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
				dicta incidunt est ipsam, officia dolor fugit natus?
			</p> -->
		</header>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<div class="mt-8 block">
				<div class="hidden space-y-4 lg:block">
					<div>
						<label for="Search" class="block text-xs font-medium text-gray-700"> Search </label>

						<div class="flex gap-2">
							<input
								type="text"
								id="Search"
								placeholder="Search"
								bind:value={search}
								class="w-full rounded border-gray-300 text-sm"
							/>

							<button
								type="button"
								class="rounded bg-primary-900 px-4 py-2 text-sm font-medium text-white"
								on:click={performSearch}
							>
								Search
							</button>
						</div>
					</div>
					<div>
						<label for="SortBy" class="block text-xs font-medium text-gray-700"> Sort By </label>

						<select id="SortBy" bind:value={sortBy} class="mt-1 rounded border-gray-300 text-sm">
							<option disabled>Sort By</option>
							<option value="Title, DESC">Title, DESC</option>
							<option value="Title, ASC">Title, ASC</option>
							<option value="Price, DESC">Price, DESC</option>
							<option value="Price, ASC">Price, ASC</option>
						</select>
					</div>

					<div>
						<p class="block text-xs font-medium text-gray-700">Filters</p>

						<div class="mt-1 space-y-2">
							<details
								class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
							>
								<summary
									class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
								>
									<span class="text-sm font-medium"> Price </span>

									<span class="transition group-open:-rotate-180">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="h-4 w-4"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</span>
								</summary>

								<div class="border-t border-gray-200 bg-white">
									<header class="flex items-center justify-between p-4">
										<!-- <span class="text-sm text-gray-700"> The highest price is $600 </span> -->
										<button
											type="button"
											class="text-sm text-gray-900 underline underline-offset-4"
											on:click={() => {
												priceFrom = 0;
												priceTo = 1000000;
											}}
										>
											Reset
										</button>
									</header>

									<div class="border-t border-gray-200 p-4">
										<div class="flex justify-between gap-4">
											<label for="FilterPriceFrom" class="flex items-center gap-2">
												<span class="text-sm text-gray-600">Rs.</span>

												<input
													type="number"
													id="FilterPriceFrom"
													placeholder="From"
													bind:value={priceFrom}
													class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
												/>
											</label>

											<label for="FilterPriceTo" class="flex items-center gap-2">
												<span class="text-sm text-gray-600">Rs.</span>

												<input
													type="number"
													id="FilterPriceTo"
													placeholder="To"
													bind:value={priceTo}
													class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
												/>
											</label>
										</div>
									</div>
								</div>
							</details>
						</div>
					</div>
				</div>
			</div>

			<div
				class=" col-span-3 mt-4 md:grid md:grid-cols-2 md:items-start md:gap-8 lg:mt-8 lg:grid-cols-3 xl:grid-cols-4"
			>
				<!-- Loop through products and generate HTML for each product -->
				{#each items as product}
					<div class="lg:col-span-1">
						<a href={'/item/' + product.id} class="group block overflow-hidden">
							<img
								src={product.image[0]}
								alt={product.name}
								class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
							/>

							<div class="relative bg-white pt-3">
								<h3
									class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
								>
									{product.name}
								</h3>
								<p class="mt-2">
									<span class="sr-only"> Regular Price </span>
									<span class="tracking-wider text-gray-900">Rs.{product.price}</span>
								</p>
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
