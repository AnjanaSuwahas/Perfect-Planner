<script>
	const products = [
		// event planning and coordination ,decor and designs, catering and culinary, fashion and beauty, photography and videography, music and entertainment
		{
			name: 'Event Planning and Coordination',
			image:
				'https://unsplash.com/photos/m8YjB0noWiY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZXZlbnQlMjBwbGFubmluZ3xlbnwwfHx8fDE3MTA0MDA0NDZ8MA&force=true&w=640',
			link: '/category/Event%20Planning%20and%20Coordination',
			price: ''
		},
		{
			name: 'Decor and Designs',
			image:
				'https://unsplash.com/photos/lwfKuWWuY4E/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8d2VkZGluZyUyMGRlY29yfGVufDB8fHx8MTcxMDQ0MDczMHww&force=true&w=640',
			link: '/category/Decor%20and%20Designs',
			price: ''
		},
		{
			name: 'Catering and Culinary',
			image:
				'https://unsplash.com/photos/aEnH4hJ_Mrs/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZXZlbnQlMjBwbGFubmluZ3xlbnwwfHx8fDE3MTA0MDA0NDZ8MA&force=true&w=640',
			link: '/category/Catering%20and%20Culinary',
			price: ''
		},
		{
			name: 'Fashion and Beauty',
			image:
				'https://unsplash.com/photos/MRJAeRAn-lM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8d2VkZGluZyUyMGZhc2hpb258ZW58MHx8fHwxNzEwNDU4MDgzfDA&force=true&w=640',
			link: '/category/Fashion%20and%20Beauty',
			price: ''
		},
		{
			name: 'Photography and Videography',
			image:
				'https://unsplash.com/photos/RXFwMWhcOi0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8d2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTcxMDQyMjg4N3ww&force=true&w=640',
			link: '/category/Photography%20and%20Videography',
			price: ''
		},
		{
			name: 'Music and Entertainment',
			image:
				'https://unsplash.com/photos/F_2bqTZ0Vl0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8d2VkZGluZyUyMG11c2ljfGVufDB8fHx8MTcxMDQ1ODAyOHww&force=true&w=640',
			link: '/category/Music%20and%20Entertainment',
			price: ''
		}
	];
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="h-full w-full bg-primary-900 p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Vendors</h2>
	</div>
</div>

<section>
	<div class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<header>
			<h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Shops By Category</h2>

			<p class="mt-4 max-w-md text-gray-500">
				Explore vendors by category effortlessly. From fashion to wellness, find curated selections
				reflecting your unique style. Enjoy a seamless shopping experience tailored to you.
			</p>
		</header>

		<ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Loop through the products array and generate HTML for each product -->
			{#each products as product}
				<li>
					<a href={product.link} class="group block overflow-hidden">
						<img
							src={product.image}
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
								<span class="tracking-wider text-gray-900"> {product.price} </span>
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
