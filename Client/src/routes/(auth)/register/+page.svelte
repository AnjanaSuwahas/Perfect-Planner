<script lang="ts">
	import { Button, Input, Checkbox, Radio, Alert } from 'flowbite-svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
	import { createUser } from '$lib/firebase';

	const userData = {
		email: '',
		password: '',
		cpassword: '',
		fullname: '',
		actype: 'customer'
	};

	let error = '';

	let customer = true;

	const formSubmit = (e: SubmitEvent, auth: any) => {
		e.preventDefault();
		if (userData.fullname === '') {
			error = 'Please enter your full name';
			return 0;
		}

		if (userData.password !== userData.cpassword) {
			error = 'Passwords do not match';
			return 0;
		}

		if (userData.password.length < 6) {
			error = 'Password must be at least 6 characters';
			return 0;
		}

		if (customer) userData.actype = 'customer';
		else userData.actype = 'business';

		createUser(auth, userData.email, userData.password, userData.fullname);
	};
</script>

<section class="bg-white">
	<div class="lg:grid lg:min-h-screen lg:grid-cols-12">
		<section class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
			<img
				alt=""
				src="/assets/loginBG.jpeg"
				class="absolute inset-0 h-full w-full object-cover opacity-80"
			/>

			<div class="hidden lg:relative lg:block lg:p-12"></div>
		</section>

		<main
			class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
		>
			<div class="w-full max-w-xl lg:max-w-3xl">
				<div class="col-span-6">
					<h1 class="cursive text-6xl font-bold text-gray-900">Event Planner</h1>
					<h2 class="text-2xl font-thin text-gray-900">Create a new Account</h2>
				</div>
				<SignedOut let:auth>
					<form
						on:submit={(e) => {
							formSubmit(e, auth);
						}}
						class="mt-8 grid w-full grid-cols-6 gap-6 pt-16"
					>
						{#if error}
							<Alert color="red" class="col-span-6">
								<span class="font-medium">Error!</span>
								{error}
							</Alert>
						{/if}
						<div class="col-span-6">
							<label for="FirstName" class="block text-sm font-medium text-gray-700">
								Account Type
							</label>

							<div class="grid w-full grid-cols-2 py-4">
								<Radio
									name="actype"
									checked={true}
									on:change={() => {
										customer = !customer;
									}}
									required>Customer</Radio
								>
								<Radio name="actype" required>Business</Radio>
							</div>
						</div>

						<!-- Full Name -->
						<div class="col-span-6">
							<label for="FullName" class="block text-sm font-medium text-gray-700">
								Full Name
							</label>

							<Input
								type="text"
								id="FullName"
								name="fullname"
								class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								bind:value={userData.fullname}
								required
							/>
						</div>

						<div class="col-span-6">
							<label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

							<Input
								type="email"
								id="Email"
								name="email"
								class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								bind:value={userData.email}
								required
							/>
						</div>

						<div class="col-span-6 md:col-span-3">
							<label for="Password" class="block text-sm font-medium text-gray-700">
								Password
							</label>

							<Input
								type="password"
								id="Password"
								name="password"
								class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								bind:value={userData.password}
								required
							/>
						</div>

						<div class="col-span-6 md:col-span-3">
							<label for="Password" class="block text-sm font-medium text-gray-700"
								>Confirm Password
							</label>

							<Input
								type="password"
								id="CPassword"
								name="cpassword"
								class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								bind:value={userData.cpassword}
								required
							/>
						</div>

						<div class="col-span-6">
							<p class="text-sm text-gray-500">
								By logging in, you agree to our
								<a href="#" class="text-gray-700 underline"> terms and conditions </a>
								and
								<a href="#" class="text-gray-700 underline">privacy policy</a>.
							</p>
						</div>

						<div class="col-span-6 sm:flex sm:items-center sm:gap-4">
							<Button type="submit">Create new Account</Button>

							<p class="mt-4 text-sm text-gray-500 sm:mt-0">
								Already have an account?
								<a href="/login" class="text-gray-700 underline">Log in</a>.
							</p>
						</div>
					</form>
				</SignedOut>
				<SignedIn let:signOut>
					<div class="mt-8 grid w-full grid-cols-6 gap-6 pt-16">
						<div class="col-span-3">
							<Button href="/" color="light" class="w-full">Go to Home</Button>
						</div>
						<div class="col-span-3">
							<Button on:click={signOut} color="primary" class="w-full">Sign out</Button>
						</div>
					</div></SignedIn
				>
			</div>
		</main>
	</div>
</section>
