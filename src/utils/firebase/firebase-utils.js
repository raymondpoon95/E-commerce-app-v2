import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaHz4-Dc2JRmZllpptjM80SwuWCASOaU0",
  authDomain: "e-commerce-app-db-ad820.firebaseapp.com",
  projectId: "e-commerce-app-db-ad820",
  storageBucket: "e-commerce-app-db-ad820.appspot.com",
  messagingSenderId: "707981443776",
  appId: "1:707981443776:web:ba18f0e02cc88d18f56325",
  measurementId: "G-SKJPBKM213",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const googleSnapshot = await getDoc(userDocRef);

  if (!googleSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error when creating the user", error.message);
    }
  }

  return userDocRef;
};
