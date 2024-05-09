import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	updateProfile,
	type Auth,
	signInWithEmailAndPassword
} from 'firebase/auth';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	serverTimestamp,
	setDoc,
	where
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBreSTeUkMGwT-_JijZ-8dThWhs7QvZ9O8',
	authDomain: 'event-planner-bcaed.firebaseapp.com',
	projectId: 'event-planner-bcaed',
	storageBucket: 'event-planner-bcaed.appspot.com',
	messagingSenderId: '340609104674',
	appId: '1:340609104674:web:467645c7e3a9eccf91837b'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

// create new account and update display name
export const createUser = async (
	auth: Auth,
	email: string,
	password: string,
	displayName: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(userCredential.user, { displayName });
		return { type: 'success' };
	} catch (error) {
		return { type: 'error', error };
	}
};

// login with email and password
export const login = async (auth: Auth, email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		return { type: 'success' };
	} catch (error) {
		return { type: 'error', error };
	}
};

// upload item image to firebase storage
export const uploadItemImage = async (files: FileList) => {
	const urls = [];
	const storage = getStorage(app);
	const storageRef = ref(storage, 'items');
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const fileRef = ref(storageRef, file.name);
		await uploadBytes(fileRef, file);
		const url = await getDownloadURL(fileRef);
		urls.push(url);
	}
	return urls;
};

export interface Item {
	id?: string;
	userID: string;
	name: string;
	shortDescription: string;
	longDescription: string;
	price: string;
	category: string;
	image: string[];
}

// add item to firestore
export const addItem = async (item: Item) => {
	try {
		await addDoc(collection(firestore, 'items'), item);
		return { type: 'success' };
	} catch (error) {
		return { type: 'error', error };
	}
};

// get items with specific category
export const getItemsCatefory = async (category: string) => {
	const items: Item[] = [];
	// console.log(category);
	const querySnapshot = await getDocs(
		query(collection(firestore, 'items'), where('category', '==', category))
	);
	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		const itemData = doc.data();
		itemData.id = doc.id;
		items.push(itemData as Item);
	});
	return items;
};

// get item by ID
export const getItemByID = async (id: string) => {
	const docRef = doc(firestore, 'items', id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const itemData = docSnap.data();
		itemData.id = docSnap.id;
		return itemData as Item;
	}
	return null;
};

// get all items
export const getAllItems = async () => {
	const items: Item[] = [];
	const querySnapshot = await getDocs(collection(firestore, 'items'));
	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		const itemData = doc.data();
		itemData.id = doc.id;
		items.push(itemData as Item);
	});
	return items;
};

// remove item by ID
export const removeItem = async (id: string) => {
	await setDoc(doc(firestore, 'items', id), { removed: true }, { merge: true });
};

// add to cart
export const addToCart = async (userID: string, itemID: string) => {
	const docRef = doc(firestore, 'users', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const userData = docSnap.data();
		if (!userData.cart) {
			userData.cart = [];
		}
		// check if item is already in cart
		if (userData.cart.includes(itemID)) {
			return userData.cart;
		}
		userData.cart.push(itemID);
		await setDoc(docRef, userData);
		return userData.cart;
	}

	await setDoc(docRef, { cart: [itemID] });
	return [itemID];
};

// get cart
export const getCart = async (userID: string) => {
	const docRef = doc(firestore, 'users', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const userData = docSnap.data();
		if (!userData.cart) {
			userData.cart = [];
		}
		return userData.cart;
	}
	return [];
};

// remove from cart
export const removeFromCart = async (userID: string, itemID: string) => {
	const docRef = doc(firestore, 'users', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const userData = docSnap.data();
		if (!userData.cart) {
			userData.cart = [];
		}
		userData.cart = userData.cart.filter((id: string) => id !== itemID);
		await setDoc(docRef, userData);
	}
};

// add purchase
export const addPurchase = async (userID: string, email: string, name: string, itemID: string) => {
	const collectionRef = collection(firestore, 'purchases');
	await addDoc(collectionRef, {
		email,
		name,
		itemID,
		createdAt: serverTimestamp(),
		userID
	});
	await removeFromCart(userID, itemID);
};

// get item id list by user id
export const getItemsByUserID = async (userID: string) => {
	const itemIDs: string[] = [];
	const querySnapshot = await getDocs(
		query(collection(firestore, 'items'), where('userID', '==', userID))
	);
	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		itemIDs.push(doc.id);
	});
	return itemIDs;
};

// get item data list by user id
export const getItemsDataByUserID = async (userID: string) => {
	const items: Item[] = [];
	const querySnapshot = await getDocs(
		query(collection(firestore, 'items'), where('userID', '==', userID))
	);
	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		const itemData = doc.data();
		itemData.id = doc.id;
		items.push(itemData as Item);
	});
	return items;
};

export interface PurchaseData {
	email: string;
	name: string;
	itemID: string;
	createdAt: string;
	userID: string;
}

// get purchase list by user id
export const getPurchasesByUserID = async (userID: string) => {
	const userItems = await getItemsByUserID(userID);
	const q = query(collection(firestore, 'purchases'), where('itemID', 'in', userItems));
	const querySnapshot = await getDocs(q);
	const purchases: PurchaseData[] = [];

	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		const purchaseData = doc.data();
		purchaseData.id = doc.id;
		purchases.push(purchaseData as PurchaseData);
	});

	const items: Item[] = [];

	for (const item of userItems) {
		const itemData = await getItemByID(item);
		if (itemData) {
			items.push(itemData);
		}
	}

	// combine purchases and items
	const purchasesWithItems = purchases.map((purchase) => {
		const item = items.find((item) => item.id === purchase.itemID);
		return { ...purchase, item };
	});

	// order by createdAt
	purchasesWithItems.sort((b, a) => {
		if (a.createdAt < b.createdAt) {
			return 1;
		}
		if (a.createdAt > b.createdAt) {
			return -1;
		}
		return 0;
	});

	return purchasesWithItems;
};

// get Purchase by userID
export const getPurchaseByUserID = async (userID: string) => {
	const querySnapshot = await getDocs(
		query(collection(firestore, 'purchases'), where('userID', '==', userID))
	);
	const purchases: PurchaseData[] = [];

	// biome-ignore lint/complexity/noForEach: <explanation>
	querySnapshot.forEach((doc) => {
		const purchaseData = doc.data();
		purchaseData.id = doc.id;
		purchases.push(purchaseData as PurchaseData);
	});

	const items: Item[] = [];

	for (const purchase of purchases) {
		const itemData = await getItemByID(purchase.itemID);
		if (itemData) {
			items.push(itemData);
		}
	}

	// combine purchases and items
	const purchasesWithItems = purchases.map((purchase) => {
		const item = items.find((item) => item.id === purchase.itemID);
		return { ...purchase, item };
	});

	// order by createdAt
	purchasesWithItems.sort((b, a) => {
		if (a.createdAt < b.createdAt) {
			return 1;
		}
		if (a.createdAt > b.createdAt) {
			return -1;
		}
		return 0;
	});

	return purchasesWithItems;
};

// todo list
export interface Todo {
	descripiton: string;
	marked: boolean;
	createdAt: string;
}

// upload todos to firestore
export const uploadTodos = async (userID: string, todos: Todo[]) => {
	const docRef = doc(firestore, 'todos', userID);
	await setDoc(docRef, { todos });
};

// get todos from firestore
export const getTodos = async (userID: string) => {
	const docRef = doc(firestore, 'todos', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const userData = docSnap.data();
		if (!userData.todos) {
			userData.todos = [];
		}
		return userData.todos;
	}
	return [];
};

// budget calculator

export interface BudgetItem {
	name: string;
	amount: number;
	category: string;
}

// upload budget items to firestore
export const uploadBudgetItems = async (userID: string, items: BudgetItem[]) => {
	const docRef = doc(firestore, 'budget', userID);
	await setDoc(docRef, { items });
};

// get budget items from firestore
export const getBudgetItems = async (userID: string) => {
	const docRef = doc(firestore, 'budget', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const userData = docSnap.data();
		if (!userData.items) {
			userData.items = [];
		}
		return userData.items;
	}
	return [];
};
