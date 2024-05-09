<script>
	export let data;
	// console.log(data);
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">{data.items[0].category}</h2>
	</div>
</div>

<div class="container mx-auto px-6 py-12 xl:px-0">
	<div class="flex flex-col">
		<div class="mt-10 grid items-center gap-x-8 gap-y-8 lg:grid-cols-2">
			<!-- Loop through the images array -->
			{#each data.items as item}
				<a
					href={`/item/${item.id}`}
					class="group relative flex items-center justify-center bg-gray-50 px-10 py-36 transition duration-500 group-hover:bg-opacity-60 sm:p-28 dark:bg-gray-800 dark:hover:bg-gray-700"
				>
					<img
						class="transition duration-500 group-hover:opacity-60"
						src={item.image[0]}
						alt={item.name}
					/>
					<div
						class="absolute left-4 top-4 flex flex-col items-start justify-start space-y-2 sm:left-8 sm:top-8"
					>
						<div>
							<p
								class="text-xl leading-5 text-gray-600 transition duration-500 group-hover:opacity-60 dark:text-white"
							>
								{item.name}
							</p>
						</div>
						<div>
							<p
								class="text-xl font-semibold leading-5 text-gray-800 transition duration-500 group-hover:opacity-60 dark:text-white"
							>
								Rs.{item.price}
							</p>
						</div>
					</div>
					<!-- <div
						class="absolute bottom-8 right-8 flex flex-row items-start justify-start space-x-2 transition duration-500 group-hover:opacity-60"
					>
						<button class="rounded-full border border-gray-600 bg-white p-1.5 focus:bg-gray-800"
						></button>
						<button class="rounded-full border border-gray-600 bg-white p-1.5 focus:bg-gray-800"
						></button>
					</div> -->
					<!-- Additional buttons here -->
					<!-- Also, the "New" label can be added conditionally based on image properties -->
					<!-- {#if /* Condition for "New" label */}
        <div class="absolute right-6 top-4">
          <p class="border-b-2 border-gray-600 pb-0.5 text-base leading-4 text-gray-600 dark:text-white">New</p>
        </div>
        {/if} -->
				</a>
			{/each}
		</div>

		<div class="mt-12 flex items-end justify-end">
			<div class="flex flex-row items-center justify-center space-x-8">
				<button
					class="border-b-2 border-transparent text-base leading-none text-gray-800 focus:border-gray-800 focus:outline-none dark:text-white"
				>
					<p>1</p>
				</button>
				<button
					class="border-b-2 border-transparent text-base leading-none text-gray-800 focus:border-gray-800 focus:outline-none dark:text-white"
				>
					<p>2</p>
				</button>
				<button
					class="border-b-2 border-transparent text-base leading-none text-gray-800 focus:border-gray-800 focus:outline-none dark:text-white"
				>
					<p>3</p>
				</button>
				<button class="flex items-center justify-center">
					<img
						class="dark:hidden"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg4.svg"
						alt="next"
					/>
					<img
						class="hidden dark:block"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product-grid-2-svg4dark.svg"
						alt="next"
					/>
				</button>
			</div>
		</div>
	</div>
</div>
