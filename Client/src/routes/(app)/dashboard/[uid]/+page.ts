import { getItemsDataByUserID } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const uid = params.uid;
	const items = await getItemsDataByUserID(uid);

	return {
		items
	};
};
