import auth from "@/util/firebase/firebase";
import {
	GoogleAuthProvider,
	User,
	onAuthStateChanged,
	signInWithPopup,
	createUserWithEmailAndPassword,
	UserCredential,
	updateProfile,
	signInWithEmailAndPassword,
} from "firebase/auth";

const isStateChanged = (callback: (user: User | null) => void) => {
	return onAuthStateChanged(auth, callback);
};

const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();

	await signInWithPopup(auth, provider).catch((e) => console.error("Error signing in with Google", e));
};

const createAccount = async (email: string, password: string, name: string) => {
	return await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredentials) => {
			updateProfile(userCredentials.user, {
				displayName: name,
			});
		})
		.catch((e) => false);
};

const loginAccount = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password).catch((e) => false);
};

const signOut = () => {
	return auth.signOut().catch((e) => console.error("Error signing out with Google"));
};

export { isStateChanged, signInWithGoogle, signOut, createAccount, loginAccount };
