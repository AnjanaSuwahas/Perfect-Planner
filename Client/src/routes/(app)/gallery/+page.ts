import { getAllItems } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
	const items = await getAllItems();
	const search = url.searchParams.get('search');

	if (search) {
		return {
			items: items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
		};
	}

	return {
		items,
		search
	};
};
