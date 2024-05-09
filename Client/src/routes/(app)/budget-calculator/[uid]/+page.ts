import { getBudgetItems } from '$lib/firebase';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const uid = params.uid;
	const budget = await getBudgetItems(uid);

	return {
		budget,
		uid
	};
};
