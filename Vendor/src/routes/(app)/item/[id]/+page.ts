import type { Item } from '$lib/firebase.js';
import { getItemByID } from '$lib/firebase.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const id = params.id;
	const item: Item = (await getItemByID(id)) as Item;

	return {
		item
	};
}
