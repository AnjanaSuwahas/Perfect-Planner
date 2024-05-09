<script lang="ts">
	import { Section, Contact } from 'flowbite-svelte-blocks';
	import { Label, Input, Textarea, Button } from 'flowbite-svelte';
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="h-full w-full bg-primary-900 p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">Contact Us</h2>
	</div>
</div>

<Section name="contact">
	<Contact>
		<svelte:fragment slot="h2">Contact Us</svelte:fragment>
		<svelte:fragment slot="paragraph"
			>Got a technical issue? Want to send feedback about a beta feature? Need details about our
			Business plan? Let us know.</svelte:fragment
		>
		<form class="space-y-8">
			<div>
				<Label for="email" class="mb-2 block">Your email</Label>
				<Input id="email" name="email" placeholder="name@flowbite.com" required />
			</div>
			<div>
				<Label for="subject" class="mb-2 block">Subject</Label>
				<Input id="subject" name="subject" placeholder="Let us know how we can help you" required />
			</div>
			<div>
				<Textarea
					id="subject"
					name="subject"
					placeholder="Leave a comment..."
					label="Your message"
				/>
			</div>
			<Button>Send message</Button>
		</form>
	</Contact>
</Section>
