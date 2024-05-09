import { getPurchaseByID } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const pid = params.pid;
	const purchases = await getPurchaseByID(pid);

	return {
		purchases
	};
};
