import type { Item } from '$lib/firebase.js';
import { getItemsCatefory } from '$lib/firebase.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const tag = params.tag;
	const items: Item[] = await getItemsCatefory(tag);

	return {
		items
	};
}
