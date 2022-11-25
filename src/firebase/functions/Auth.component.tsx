import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase.config";

export const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  return await signOut(auth);
}


