// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {arrayUnion, collection, doc, getDoc, getDocs, addDoc, getFirestore, setDoc, updateDoc, onSnapshot, where} from "firebase/firestore";
import {getDatabase, onValue, push, ref, set, serverTimestamp, query, orderByChild, startAt,limitToFirst } from "firebase/database";
import firebase from "firebase/compat";



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
export const db = getFirestore();
const database = getDatabase(app);
// const chatsDatabaseRef = ref(db, 'chats');
const chatsDatabaseRef = ref(database, 'chats');


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
export const signoutAccount = async () => {
    try {
        await signOut(auth);
        auth.currentUser = null;
        alert('Signout successful');
    } catch (error) {
        alert(error);
    }
}
export const updateDisplayName = async (displayName) => {
    await updateProfile(auth.currentUser, {
        displayName: displayName
    })
}

export const createChat = async (userMail) => {
    await setDoc(doc(db, "chats", (auth.currentUser.email + userMail)), {
        users: [auth.currentUser.email,userMail],
    });
}
// export const createChat = async (userEmail) => {
//     // const a = ref(database, 'chats',);
//     push(chatsDatabaseRef, {
//         'users': [auth.currentUser.email, userEmail]
//     })
// }
export const sendMessage  = async (message, userMail) => {
    const chatRef = doc(db, "chats", auth.currentUser.email + userMail);

    const chatSnap = await getDoc(chatRef);
    if (chatSnap.exists()) {
        // Mevcut sohbet varsa, mesajları alın
        const chatData = chatSnap.data();
        const messages = chatData.messages || {};

        // Yeni mesajı mesajlar nesnesine ekleyin
        messages[message._id] = {
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user,
        };

        // Mesajları güncelleyin
        await updateDoc(chatRef, { messages });
    } else {
        // Mevcut sohbet yoksa, yeni bir sohbet oluşturun
        const newChat = {
            messages: {
                [message._id]: {
                    _id: message._id,
                    createdAt: message.createdAt,
                    text: message.text,
                    user: message.user,
                },
            },
        };

        await setDoc(chatRef, newChat);
    }
};

//     export const setUserData = async (displayName, email) => {
//         const {userdata} = await setDoc(doc(db, "users", auth.currentUser.uid), {
//             userID: auth.currentUser.uid,
//             displayName: displayName,
//             email: email,
//         });
//         return userdata;
//     }
// }
// export const listenChats =  (snapshotFunc) => {
//     onValue(chatsDatabaseRef, snapshotFunc);
// }
export const listenChatss = (setChatMessages) => {
    const q = query(collection(db, "chats"),
        where("users", 'array-contains', auth.currentUser?.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatss = [];
        querySnapshot.forEach((doc) => {
            const messages = doc.data().messages;
            Object.keys(messages).forEach((key) => {
                chatss.push(messages[key]);
            });
        });
        setChatMessages(chatss); // Chat mesajlarını state'e yerleştir
    });
};
// console.warn('TESTTT',doc.data().users)

export const snapshotToArray = (snapshot) => {
    const result = [];
    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        result.push(item);
    });
    // console.log('FULL',result)
    return result;
}