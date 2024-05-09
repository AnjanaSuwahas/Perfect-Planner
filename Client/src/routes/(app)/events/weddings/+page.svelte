<script>
	const products = [
		/* Attire
Catering 
Venue
Attire
Jewelry 
Makeup & Hair
Photography & Videography 
Floral Arrangements 
Decorations 
Cakes
Thank you gift for guest
Liquor
 */
		{
			name: 'Attire',
			image:
				'https://unsplash.com/photos/Db4d6MRIXJc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8QXR0aXJlfGVufDB8fHx8MTcxNDU4OTMxOHww&force=true&w=640',
			link: '/category/Attire',
			price: ''
		},
		{
			name: 'Catering',
			image:
				'https://unsplash.com/photos/GJwKzsxUQu4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Q2F0ZXJpbmd8ZW58MHx8fHwxNzE0NTg5NDI1fDA&force=true&w=640',
			link: '/category/Catering',
			price: ''
		},
		{
			name: 'Venue',
			image:
				'https://unsplash.com/photos/m8YjB0noWiY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8VmVudWV8ZW58MHx8fHwxNzE0NTg5MTQ3fDA&force=true&w=640',
			link: '/category/Venue',
			price: ''
		},
		{
			name: 'Attire',
			image:
				'https://unsplash.com/photos/lwfKuWWuY4E/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8d2VkZGluZyUyMGRlY29yfGVufDB8fHx8MTcxMDQ0MDczMHww&force=true&w=640',
			link: '/category/Attire',
			price: ''
		},
		{
			name: 'Jewelry',
			image:
				'https://unsplash.com/photos/202NAwjisYA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8amV3ZWxyeXxlbnwwfHx8fDE3MTQ1NjM4NjN8MA&force=true&w=640',
			link: '/category/Jewelry',
			price: ''
		},
		{
			name: 'Makeup & Hair',
			image:
				'https://unsplash.com/photos/fplnXE5loWo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bWFrZXVwJTIwYW5kJTIwaGFpcnxlbnwwfHx8fDE3MTQ1ODk4MjR8MA&force=true&w=640',
			link: '/category/Makeup%20&%20Hair',
			price: ''
		},
		{
			name: 'Photograph & Videography',
			image:
				'https://unsplash.com/photos/aS4Duj2j7r4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzE0NTg5OTgxfA&force=true&w=640',
			link: '/category/Photograph%20&%20Videography',
			price: ''
		},
		{
			name: 'Floral Arrangements',
			image:
				'https://unsplash.com/photos/0IsBu45B3T8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZmxvcmFsJTIwYXJyYW5nZW1lbnRzfGVufDB8fHx8MTcxNDU5MDI3M3ww&force=true&w=640',
			link: '/category/Floral%20Arrangements',
			price: ''
		},
		{
			name: 'Decorations',
			image: 'https://unsplash.com/photos/O38Id_cyV4M/download?force=true&w=640',
			link: '/category/Decorations',
			price: ''
		},
		{
			name: 'Cakes',
			image:
				'https://unsplash.com/photos/vdx5hPQhXFk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y2FrZXxlbnwwfHx8fDE3MTQ1NTM2MDh8MA&force=true&w=640',
			link: '/category/Cakes',
			price: ''
		},
		{
			name: 'Thank you gift for guest',
			image:
				'https://unsplash.com/photos/PxM8aeJbzvk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z2lmdHN8ZW58MHx8fHwxNzE0NTEyNjY1fDA&force=true&w=640',
			link: '/category/Thank%20you%20gift%20for%20guest',
			price: ''
		},
		{
			name: 'Liquor',
			image:
				'https://unsplash.com/photos/YBlcnXfv9OM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bGlxdW9yfGVufDB8fHx8MTcxNDU5MDA1NXww&force=true&w=640',
			link: '/category/Liquor',
			price: ''
		}
	];
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Weddings</h2>
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
