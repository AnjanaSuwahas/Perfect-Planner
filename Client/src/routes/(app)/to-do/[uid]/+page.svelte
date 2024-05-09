<script lang="ts">
	import type { Todo } from '$lib/firebase';
	import { uploadTodos } from '$lib/firebase';
	import { Checkbox, Input } from 'flowbite-svelte';

	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	export let data;

	// console.log(data);

	let todos: Todo[] = data.todos;

	const todoData = {
		descripiton: '',
		marked: false,
		createdAt: ''
	};

	const addTodo = () => {
		// get current timestamp
		const date = new Date();
		todoData.createdAt = date.toISOString();
		todos = [...todos, Object.assign({}, todoData)];
		uploadTodos(data.uid, todos);
	};

	const markTodoasDone = (index: number) => {
		todos[index].marked = !todos[index].marked;
		uploadTodos(data.uid, todos);
	};

	const deleteTodo = (index: number) => {
		todos = todos.filter((_, i) => i !== index);
		uploadTodos(data.uid, todos);
	};
</script>

<div
	class="flex w-full flex-col items-center justify-center bg-[url('https://unsplash.com/photos/dS87qokCAC4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEwNDcxMjQ2fA&force=true&w=1920')] bg-cover"
>
	<div class="bg-primary-900 h-full w-full p-16 py-48 text-center opacity-30">
		<h2 class="cursive text-2xl font-bold text-white md:text-6xl">To Do List</h2>
	</div>
</div>

<div class="flex flex-col items-center justify-center">
	<h2 class="mt-8 text-2xl font-bold">Add a new todo</h2>
	<div class="mt-8 w-full md:w-1/2">
		<Input
			type="text"
			placeholder="Add a new todo"
			class="w-full rounded-md border-2 p-2"
			bind:value={todoData.descripiton}
		/>
		<button class="bg-primary-900 mt-2 w-full rounded-md p-2 text-white" on:click={addTodo}>
			Add Todo
		</button>
	</div>
	<div class="mt-8 flex w-full flex-col gap-2 md:w-1/2">
		{#each todos as todo, index}
			<div class="flex items-center justify-between rounded-md p-2">
				{#if todo.marked}
					<p class="text-lg line-through">{todo.descripiton}</p>
				{:else}
					<p class="text-lg">{todo.descripiton}</p>
				{/if}
				<div class="flex items-center">
					<Checkbox
						type="checkbox"
						class="mr-2"
						checked={todo.marked}
						on:change={() => markTodoasDone(index)}
					/>
					<button
						class="bg-primary-900 rounded-md p-2 text-white"
						on:click={() => deleteTodo(index)}
					>
						Delete
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
