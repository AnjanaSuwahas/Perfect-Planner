<script>
	import { AngleRightOutline } from 'flowbite-svelte-icons';

	const products = [
		// Birthday, Baby Shower, Bride to Be, Weddings, Conferences, Funeral, Memorial Servies
		{
			name: 'Birthday',
			image:
				'https://unsplash.com/photos/Hli3R6LKibo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHwwfHx8MTcxMDQ3NzY3M3ww&force=true&w=1920',
			link: '/events/birthday'
		},
		{
			name: 'Baby Shower',
			image:
				'https://unsplash.com/photos/oxP3bl3xQPI/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mjd8fGJhYnklMjBzaG93ZXJ8ZW58MHwwfHx8MTcxMDQ3NzcyMHww&force=true&w=1920',
			link: '/events/baby-shower'
		},
		{
			name: 'Bride to Be',
			image:
				'https://unsplash.com/photos/y-FqXKLEYLY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGJyaWRlJTIwdG8lMjBiZXxlbnwwfDB8fHwxNzEwNDc3NzU3fDA&force=true&w=1920',
			link: '/events/bride-to-be'
		},
		{
			name: 'Weddings',
			image:
				'https://unsplash.com/photos/pU_A9uhqcBU/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDc3ODA3fA&force=true&w=1920',
			link: '/events/weddings'
		},
		{
			name: 'Conferences',
			image:
				'https://unsplash.com/photos/Q_KdjKxntH8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGV2ZW50fGVufDB8MHx8fDE3MTA0NzE0OTB8MA&force=true&w=1920',
			link: '/events/conferences'
		},
		{
			name: 'Funeral',
			image:
				'https://unsplash.com/photos/JWlZS708L1Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGZ1bmVyYWx8ZW58MHwwfHx8MTcxMDQ3Nzg5OXww&force=true&w=1920',
			link: '/events/funeral'
		},
		{
			name: 'Memorial Services',
			image:
				'https://unsplash.com/photos/b_JR-yqqc3E/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NjZ8fG1lbW9yaWFsJTIwc2VydmljZXN8ZW58MHwwfHx8MTcxMDQ3ODA0NHww&force=true&w=1920',
			link: '/events/memorial-services'
		}
	];
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/iPgQJEcGoE0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8b3V0ZG9vciUyMGV2ZW50fGVufDB8MHx8fDE3MTA0Nzg5MTd8MA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Events</h2>
	</div>
</div>

<section>
	<div class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<header>
			<h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Services by Events</h2>

			<p class="mt-4 max-w-md text-gray-500">
				Explore Services by Events effortlessly. From fashion to wellness, find curated selections
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

						<div class="relative top-[-9em] pt-3">
							<h3
								class="cursive flex w-full flex-row items-center justify-center bg-white p-4 text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4"
							>
								{product.name}<AngleRightOutline />
							</h3>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
