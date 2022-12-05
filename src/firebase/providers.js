import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    };
  }
};

export const signInWithEmail_Password = async (userEmail, password, displayName) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, userEmail, password);
    const { email, photoURL, uid } = result.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, 
      photoURL, 
      email, 
      displayName
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    };
  }
};

export const loginWithEmailAndPassword = async (userEmail, password) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, userEmail, password);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      uid, 
      photoURL, 
      email, 
      displayName
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    };
  }
};
