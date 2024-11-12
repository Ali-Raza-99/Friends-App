import { getAuth,createUserWithEmailAndPassword , } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore"; 
import { getFirestore, collection, addDoc, getDocs,doc,deleteDoc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6-sjausmHzwHfAhQ9a5Klr3cb74SbfDs",
  authDomain: "arfacebookapp.firebaseapp.com",
  projectId: "arfacebookapp",
  storageBucket: "arfacebookapp.appspot.com",
  messagingSenderId: "675808701259",
  appId: "1:675808701259:web:25b9a5d48cd65f92b296ce",
  measurementId: "G-G7BV1FN0S1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = (path) => ref(storage, path); 


export {app,auth,storage,storageRef,uploadBytes,collection,addDoc,db};