import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import {auth} from "./firebase"
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const doCreateUserWithEmailAndPassword = async (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}


export const doSignInWithEmailAndPassword = async (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
}

export const doSignInWithGoogle = async ()=>{
    const provider = new GoogleAuthProvider;
    const result = await signInWithPopup(auth,provider)
    return result
}

export const doSignOut = ()=>{
    return auth.signOut();
}   