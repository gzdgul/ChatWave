// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore";


// Firebase yapılandırma bilgilerini buraya yapıştırın
const firebaseConfig = {
    apiKey: "AIzaSyB_4Rih7Vx78b5aeKO4tZ-z64Tghj5Kb7Q",
    authDomain: "chatty-db4dc.firebaseapp.com",
    projectId: "chatty-db4dc",
    storageBucket: "chatty-db4dc.appspot.com",
    messagingSenderId: "386409363832",
    appId: "1:386409363832:web:7e6a1f737a0d0ff868f08d"
};

// Firebase'i başlatma
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const currentUserID = auth.currentUser.uid
const db = getFirestore();

// Yeni kullanıcı oluşturma
export const createAccount = async (email, password) => {
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    // const welcome_text = 'TEST 123'
    // // await sendBOTMessage(user.uid, welcome_text)
    // await setBOTMessageLTS(user.uid, welcome_text)
    return user
}
export const loginAccount = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        alert('giriş başarılı')
        return user
    }catch (err) {
        alert(err)
        // (err.message.includes('user-not-found')) &&
        // alert('Girdiğiniz e-posta veya parola yanlış. Lütfen tekrar deneyin.')
    }
}
