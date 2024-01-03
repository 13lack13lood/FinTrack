import { GoogleAuthProvider, NextOrObserver, User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import auth from "./FireBase";

const isStatedChanged = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (e) {
        console.error("Error signing in with Google", e);
    }
};

const signOut = () => {
    try {
        return auth.signOut();
    } catch (e) {
        console.error("Error signing out with Google", e);
    }
};

export { isStatedChanged, signInWithGoogle, signOut };
