<script lang="ts">
	import type { BudgetItem } from '$lib/firebase';
	import { uploadBudgetItems } from '$lib/firebase';
	import { Button, Dropdown, DropdownItem, Input } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	export let data;

	// console.log(data);

	let budgetItems: BudgetItem[] = data.budget;

	const budgetItemData = {
		name: '',
		amount: 0,
		createdAt: '',
		category: ''
	};

	const addBudgetItem = () => {
		// get current timestamp
		const date = new Date();
		budgetItemData.createdAt = date.toISOString();
		budgetItems = [...budgetItems, Object.assign({}, budgetItemData)];
		// console.log(budgetItems);
		uploadBudgetItems(data.uid, budgetItems);
	};

	const deleteBudgetItem = (index: number) => {
		budgetItems = budgetItems.filter((_, i) => i !== index);
		uploadBudgetItems(data.uid, budgetItems);
	};

	const items = [
		{
			label: 'Event Planning and Coordination'
		},
		{
			label: 'Decor and Designs'
		},
		{
			label: 'Catering and Culinary'
		},
		{
			label: 'Fashion and Beauty'
		},
		{
			label: 'Photography and Videography'
		},
		{
			label: 'Music and Entertainment'
		}
	];

	let totalPrice: number = budgetItems.reduce((acc, item) => acc + item.amount, 0);

	$: totalPrice = budgetItems.reduce((acc, item) => acc + Number.parseFloat(item.amount), 0);
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Budget Calculator</h2>
	</div>
</div>

<div class="flex flex-col items-center justify-center p-4">
	<h2 class="mt-8 text-2xl font-bold">Add a Item</h2>
	<div class="mt-8 flex w-full flex-col gap-2 md:w-3/4 md:flex-row">
		<Input
			type="text"
			placeholder="Add a new todo"
			class="w-full rounded-md border-2 p-2"
			bind:value={budgetItemData.name}
		/>
		<Input
			type="number"
			placeholder="Amount"
			class="w-full rounded-md border-2 p-2"
			bind:value={budgetItemData.amount}
		/>
		<Button color="light" class="w-full">
			{budgetItemData.category || 'Select Category'}
			<ChevronDownOutline class="ms-2 h-6 w-6 text-white dark:text-white" />
		</Button>
		<Dropdown>
			{#each items as { label }}
				<DropdownItem
					on:click={() => {
						budgetItemData.category = label;
					}}
					class={budgetItemData.category === label ? 'underline' : ''}
				>
					{label}
				</DropdownItem>
			{/each}
		</Dropdown>
		<Button color="primary" class="w-full" on:click={addBudgetItem}>Add Budget Item</Button>
	</div>
	<div class="mt-8 flex w-full flex-col gap-2 md:w-1/2">
		<table class="w-full">
			<thead>
				<tr>
					<th class="text-lg">Name</th>
					<th class="text-lg">Amount (Rs.)</th>
					<th class="text-lg">Category</th>
					<th class="text-lg">Actions</th>
				</tr>
			</thead>

			<tbody>
				{#each budgetItems as budgetItem, index}
					<tr>
						<td class="border-2 p-2 text-lg">{budgetItem.name}</td>
						<td class="border-2 p-2 text-right text-lg">Rs.{budgetItem.amount}</td>
						<td class="border-2 p-2 text-lg">{budgetItem.category}</td>
						<td class="border-2 p-2 text-lg">
							<button
								class="bg-primary-900 rounded-md p-2 text-white"
								on:click={() => deleteBudgetItem(index)}
							>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
			<!-- </table>
		{#each budgetItems as budgetItem, index}
			<div class="flex items-center justify-between rounded-md p-2">
				<p class="text-lg">{budgetItem.name}</p>
				<p class="text-lg">Rs.{budgetItem.amount}</p>
				<p class="text-lg">{budgetItem.category}</p>
				<div class="flex items-center">
					<button
						class="bg-primary-900 rounded-md p-2 text-white"
						on:click={() => deleteBudgetItem(index)}
					>
						Delete
					</button>
				</div>
			</div>
		{/each} -->
			<!-- For Total -->
			<div class="flex items-center justify-between rounded-md p-2 pt-4">
				<p class="text-lg font-bold">Total Rs.{totalPrice}</p>
			</div>
		</table>
	</div>
</div>
