import { database, auth } from "./firebase";
import { arrayUnion, doc, arrayRemove, updateDoc, getDoc } from "firebase/firestore";

const getWatchlistRef = (uid: string) => {
	return doc(database, "fintrack/" + uid);
};

const createWatchlist = (uid: string) => {
	updateDoc(getWatchlistRef(uid), {
		watchlist: arrayUnion(),
		portfolio: arrayUnion(),
	});
};

const addToWatchlist = (ticker: string) => {
	if (auth.currentUser) {
		updateDoc(getWatchlistRef(auth.currentUser.uid), {
			watchlist: arrayUnion(ticker.toUpperCase()),
		});
	}
};

const removeFromWatchlist = (ticker: string) => {
	if (auth.currentUser) {
		updateDoc(getWatchlistRef(auth.currentUser.uid), {
			watchlist: arrayRemove(ticker.toUpperCase()),
		});
	}
};

const getWatchlist = async () => {
	if (auth.currentUser) {
		const snapshot = await getDoc(getWatchlistRef(auth.currentUser.uid));
		return snapshot.data();
	}

	return null;
};

export { createWatchlist, addToWatchlist, removeFromWatchlist, getWatchlist };
