import { app } from "@/firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);


export const createNewUserFirebase = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserFirebase = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

