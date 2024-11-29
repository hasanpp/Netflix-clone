
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBTiLX25g0z_3QdyDgRAjE5fNSGSuJYMQc",
  authDomain: "netflix-9504a.firebaseapp.com",
  projectId: "netflix-9504a",
  storageBucket: "netflix-9504a.firebasestorage.app",
  messagingSenderId: "508181401058",
  appId: "1:508181401058:web:2068dba659cf926ee77dbb"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email,password)=>{
    try {
      await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}