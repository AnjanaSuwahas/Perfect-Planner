<script lang="ts">
	import { Button, Input, Checkbox, Alert } from 'flowbite-svelte';
	import { SignedOut, SignedIn } from 'sveltefire';
	import { login } from '$lib/firebase';

	const userData = {
		email: '',
		password: ''
	};

	let error = '';

	const formSubmit = async (e: SubmitEvent, auth: any) => {
		e.preventDefault();
		if (userData.email === '' || userData.password === '') {
			error = 'Please enter your email and password';
			return 0;
		}
		let results = await login(auth, userData.email, userData.password);

		if (results.type == 'error') {
			error = 'Invalid email or password';
		}
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
					<h2 class="text-2xl font-thin text-gray-900">Login to Your Account</h2>
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
							<label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

							<Input
								type="email"
								id="Email"
								name="email"
								class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								required
								bind:value={userData.email}
							/>
						</div>

						<div class="col-span-6">
							<label for="Password" class="block text-sm font-medium text-gray-700">
								Password
							</label>

							<Input
								type="password"
								id="Password"
								name="password"
								class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
								required
								bind:value={userData.password}
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
							<Button type="submit">Login to Your Account</Button>

							<p class="mt-4 text-sm text-gray-500 sm:mt-0">
								Don't have an account?
								<a href="/register" class="text-gray-700 underline">Register</a>.
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
