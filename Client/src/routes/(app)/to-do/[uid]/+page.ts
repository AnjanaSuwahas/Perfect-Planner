import { getTodos } from '$lib/firebase';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const uid = params.uid;
	const todos = await getTodos(uid);

	return {
		todos,
		uid
	};
};
