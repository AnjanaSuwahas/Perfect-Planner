import { getPurchasesByUserID } from '$lib/firebase';
import { Timestamp } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const uid = params.uid;
	const purchases = await getPurchasesByUserID(uid);

	// convert createdAt to Date
	for (const purchase of purchases) {
		let date = (purchase.createdAt as Timestamp).toDate();
		// assign in HH:MM DD/MM/YYYY format
		purchase.createdAt = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}
	return {
		purchases
	};
};
