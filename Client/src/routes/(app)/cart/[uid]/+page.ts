import { getCart, getItemByID } from '$lib/firebase';
import type { Item } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const uid = params.uid;
	const cart = await getCart(uid);
	const cartItems: Item[] = [];

	for (const itemID of cart) {
		const item = await getItemByID(itemID);
		if (item) {
			cartItems.push(item);
		}
	}

	return {
		cartItems
	};
};
