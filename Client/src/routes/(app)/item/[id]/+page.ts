import type { Item, Review } from '$lib/firebase';
import { getItemByID, getReviewsByItemID } from '$lib/firebase';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const id = params.id;
	const item: Item = (await getItemByID(id)) as Item;
	const reviews: Review[] = await getReviewsByItemID(id);

	const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
	const averageRating = totalRating / reviews.length;
	const countOf5Stars = reviews.filter((review) => review.rating === 5).length;
	const countOf4Stars = reviews.filter((review) => review.rating === 4).length;
	const countOf3Stars = reviews.filter((review) => review.rating === 3).length;
	const countOf2Stars = reviews.filter((review) => review.rating === 2).length;
	const countOf1Stars = reviews.filter((review) => review.rating === 1).length;
	const countOfRatings = reviews.length;

	return {
		item,
		reviews,
		ratings: {
			countOfRatings,
			averageRating,
			advArray: [
				{ label: '5 star', rating: countOf5Stars },
				{ label: '4 star', rating: countOf4Stars },
				{ label: '3 star', rating: countOf3Stars },
				{ label: '2 star', rating: countOf2Stars },
				{ label: '1 star', rating: countOf1Stars }
			]
		}
	};
}
