<script>
	// @ts-nocheck

	import { Button } from 'flowbite-svelte';
	import { removeFromCart, addPurchase } from '$lib/firebase';
	import { SignedIn } from 'sveltefire';
	import toast, { Toaster } from 'svelte-french-toast';
	import { loadScript } from '@paypal/paypal-js';
	import { onMount } from 'svelte';

	export let data;
	const formData = {
		userID: ''
	};

	let cartItems = data.cartItems;
	// biome-ignore lint/style/useConst: <explanation>

	const removeFromCartHandler = async (userID, itemId) => {
		// console.log(userID, itemId);
		await removeFromCart(userID, itemId);
		toast.success('Item removed from cart');
		// remove the item from data.items array
		data.cartItems = data.cartItems.filter((item) => item.id !== itemId);
	};

	// calculate the total price of the items in the cart
	$: totalPrice = data.cartItems.reduce((acc, item) => acc + Number.parseFloat(item.price), 0);

	const CLIENT_ID =
		'AXMljkPJ7LY6wFXtevMGGQmCVtW9oKVO-5SJg3soAF6z-zKq05cW9JK2WFm7Djoy9DWsM6Sq6Kb-nldx'; // change this to your own client id

	onMount(async () => {
		let paypal;

		try {
			paypal = await loadScript({
				clientId: CLIENT_ID,
				currency: 'USD'
			});
		} catch (error) {
			console.error('failed to load the PayPal JS SDK script', error);
		}

		if (paypal) {
			try {
				await paypal
					.Buttons({
						createOrder: (data, actions) => {
							return actions.order.create({
								purchase_units: [
									{
										amount: {
											value: (totalPrice / 300).toFixed(2) // Ensure this matches your currency formatting
										}
									}
								]
							});
						},
						onApprove: (data, actions) => {
							return actions.order.capture().then(async (details) => {
								// console.log('Payment Approved: ', details);
								// Handle successful transaction here
								toast.success('Payment Successful');
								const payer = details.payer;
								const email = payer.email_address;
								const name = payer.name.given_name;

								// add the purchase to the database
								// biome-ignore lint/style/useConst: <explanation>
								for (let item of cartItems) {
									await addPurchase(formData.userID, email, name, item.id);
								}
								toast.success('Purchase Confirmed');
							});
						},
						onError: (err) => {
							console.error('PayPal Button Error', err);
						}
					})
					.render('#paypal-button-container');
			} catch (error) {
				console.error('failed to render the PayPal Buttons', error);
			}
		}
	});
</script>

<Toaster />

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/P3pI6xzovu0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c2hvcHxlbnwwfHx8fDE3MTQzNTAyOTJ8MA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Cart</h2>
	</div>
</div>
<div class="p-8">
	<SignedIn let:user>
		<span class="hidden">
			{(formData.userID = user.uid)}
		</span>
		<h2 class="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl dark:text-white">
			Your Items
		</h2>

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
							<th class="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
								Status
							</th>
							<th class="px-4 py-4 font-medium text-black dark:text-white"> Actions </th>
						</tr>
					</thead>
					<tbody>
						{#each data.cartItems as item}
							<tr>
								<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
									<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
										<div class="h-12.5 w-16 rounded-md">
											<img src={item.image[0]} alt="Product" class=" rounded-md object-cover" />
										</div>
										<div>
											<a class="font-medium text-black dark:text-white" href={`/item/${item.id}`}
												>{item.name}</a
											>
											<p class="text-sm">Rs.{item.price}</p>
										</div>
									</div>
								</td>
								<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
									<a href={`/category/${item.category}`} class="text-black dark:text-white"
										>{item.category}</a
									>
								</td>
								<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
									<p
										class="bg-success text-success inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"
									>
										Booking Available
									</p>
								</td>
								<td class="dark:border-strokedark border-b border-[#eee] px-4 py-5">
									<div class="flex items-center space-x-3.5">
										<button
											class="hover:text-primary"
											on:click={() => {
												removeFromCartHandler(user.uid, item.id);
											}}
										>
											<svg
												class="fill-current"
												width="18"
												height="18"
												viewBox="0 0 18 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
													fill=""
												></path>
												<path
													d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
													fill=""
												></path>
												<path
													d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
													fill=""
												></path>
												<path
													d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
													fill=""
												></path>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</SignedIn>
	<div class="my-4 flex w-full flex-col items-center justify-center">
		<h2 class="mb-4 text-xl font-semibold text-gray-800 md:text-2xl dark:text-white">
			Your Total is Rs.{totalPrice}
		</h2>
		<div class="max-w-md">
			<div id="paypal-button-container" />
		</div>
	</div>
</div>
