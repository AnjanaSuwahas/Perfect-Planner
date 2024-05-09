<script>
	import { Button } from 'flowbite-svelte';

	export let data;
	console.log(data);
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/P3pI6xzovu0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c2hvcHxlbnwwfHx8fDE3MTQzNTAyOTJ8MA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Order History</h2>
	</div>
</div>
<div class="p-8">
	<h2 class="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl dark:text-white">My Orders</h2>
	<div
		class="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 rounded-sm border bg-white px-5 pb-2.5 pt-6 xl:pb-1"
	>
		<div class="max-w-full overflow-x-auto">
			<table class="w-full table-auto">
				<thead>
					<tr class="bg-gray-2 dark:bg-meta-4 text-left">
						<th class="min-w-[220px] px-4 py-4 font-medium text-black xl:pl-11 dark:text-white">
							Item
						</th>
						<th class="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
							Category
						</th>
						<th class="px-4 py-4 font-medium text-black dark:text-white"> Contact Name </th>
						<th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
							Contact Email
						</th>
						<th class="px-4 py-4 font-medium text-black dark:text-white"> Order Date </th>
						<th class="px-4 py-4 font-medium text-black dark:text-white"> Review </th>
					</tr>
				</thead>
				<tbody>
					{#each data.purchases as purchase}
						<tr>
							<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
								<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
									<div class="h-12.5 w-16 rounded-md">
										<img
											src={purchase.item?.image[0]}
											alt="Product"
											class=" rounded-md object-cover"
										/>
									</div>
									<div>
										<a
											class="font-medium text-black dark:text-white"
											href={`/item/${purchase.item?.id}`}>{purchase.item?.name}</a
										>
										<p class="text-sm">Rs.{purchase.item?.price}</p>
									</div>
								</div>
							</td>
							<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
								<a href="/category/tag" class="text-black dark:text-white"
									>{purchase.item?.category}</a
								>
							</td>
							<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
								<p
									class="bg-success text-success inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"
								>
									{purchase.name}
								</p>
							</td>
							<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
								<p
									class="bg-success text-success inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"
								>
									{purchase.email}
								</p>
							</td>
							<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
								<div class="flex items-center space-x-3.5">
									{purchase.createdAt}
								</div>
							</td>
							{#if !purchase.reviewed}
								<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
									<Button
										color="light"
										on:click={() => {
											window.location.href = `/review/${purchase.id}`;
										}}
									>
										Write a Review
									</Button>
								</td>
							{:else}
								<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
									<p
										class="bg-success text-success inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"
									>
										Reviewed
									</p>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
