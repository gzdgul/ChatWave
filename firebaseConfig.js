// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {arrayUnion, collection, doc, getDoc, getDocs, addDoc, orderBy, getFirestore, setDoc, updateDoc, onSnapshot, where} from "firebase/firestore";
import {getDatabase, onValue, push, ref, set, get, serverTimestamp, query, orderByChild, startAt,limitToFirst } from "firebase/database";
import firebase from "firebase/compat";
import {COLORS} from "./config/constants";



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

export const setTyping = async (chatRef, status) => {
    const currentUser = auth.currentUser.email;
    // const encodedRef = encodeURIComponent(chatRef)
    const encodedRef = chatRef?.replace(/[.]/g,'_');
    const typingRef = ref(database, 'typing/' + encodedRef);
    const typingSnapshot = await get(typingRef);

    if (typingSnapshot.exists()) {
        const typers = typingSnapshot.val().typers;

        if (typers.includes(currentUser)) {
            const updatedTypers = typers.filter(typer => typer !== currentUser);

            if (status === false) {
                return await set(typingRef, {
                    typers: updatedTypers
                });
            }
        } else {
            if (status === true) {
                typers.push(currentUser);

                return await set(typingRef, {
                    typers: typers
                });
            }
        }
    } else {
        if (status === true) {
            return await set(typingRef, {
                typers: [currentUser]
            });
        }
    }
};
export const listenTyping = (chatRef,setTypers) => {
    const encodedRef = chatRef?.replace(/[.]/g,'_');
    const typingRef = ref(database, 'typing/' + encodedRef);

    // Dinleyiciyi başlat
    const unsubscribe = onValue(typingRef, (snapshot) => {
        // Veri değiştiğinde burası çalışacak
        const typingData = snapshot.val();

        // Typing verisini kullanabilirsiniz
        // Örneğin, typers dizisini almak isterseniz
        const typers = typingData?.typers || [];

        // Typers'ı kullanarak yapmak istediğiniz işlemi gerçekleştirin
        console.log('Typers:', typers);
        setTypers(typers)
    });

    // Dinleyiciyi durdurmak istediğinizde, unsubscribe fonksiyonunu çağırın
    // Örneğin, bir bileşenin temizlenmesi veya sayfa geçişi durumunda
    // unsubscribe();
};

// Yeni kullanıcı oluşturma
export const createAccount = async (email, password) => {
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    return user
}
export const loginAccount = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        setOnline(true)
        alert('Success Login')
        return user
    }catch (err) {
        (err.message.includes('user-not-found')) ?
        alert('Girdiğiniz e-posta veya parola yanlış. Lütfen tekrar deneyin.') :  alert(err)
    }
}
export const signoutAccount = async () => {
    try {
        await setOnline(false)
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

export const createChat = async (userMail,messageRef) => {
    await setDoc(doc(db, "chats", messageRef), {
        users: [auth.currentUser.email,userMail],
    });
}

export const setChatStatus = async (messageRef, unread, archive) => {
    await updateDoc(doc(db, "chats", messageRef), {
        status: {
            unread: unread,
            lastTyper: auth.currentUser.email,
            archive: archive
        },
    });
}
export const setNotificationStatus = async (messageRef, unread) => {
    const docRef = doc(db, "chats", messageRef);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const { lastTyper, archive } = docSnapshot.data().status;

        await updateDoc(docRef, {
            status: {
                unread: unread,
                lastTyper: lastTyper, // Mevcut değeri koruyun
                archive: archive // Mevcut değeri koruyun
            },
        });
    }
}

export const createUser = async (userData) => {
    const colorNum = Math.floor(Math.random() * 8) + 1
    await setDoc(doc(db, "users", userData.id), {
        id: userData.id,
        name: userData.name,
        colorNum: colorNum,
        online: true,
    });
}
export const setOnline = async (online) => {
    if (auth?.currentUser?.email) {
        const userRef = auth.currentUser.email
        const chatRef = doc(db, 'users', userRef);
        await updateDoc(chatRef, { online: online });
    }
}
export const getUser = async (userId,setUser) => {
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
        console.log("Current data: ", doc.data());
        setUser(doc.data());
    });
}
export const sendMessage = async (message, messageRef) => {
    const chatRef = doc(db, "chats", messageRef);

    const chatSnap = await getDoc(chatRef);
    if (chatSnap.exists()) {
        // Mevcut sohbet varsa, mesajları alın
        const chatData = chatSnap.data();
        let messages = chatData.messages || [];

        if (!Array.isArray(messages)) {
            // Convert messages from object to array
            messages = Object.values(messages);
        }

        // Yeni mesajı mesajlar dizisine ekleyin
        const updatedMessages = [
            ...messages,
            {
                _id: message._id,
                createdAt: message.createdAt,
                text: message.text,
                user: message.user,
            },
        ];

        // Mesajları güncelleyin
        await updateDoc(chatRef, { messages: updatedMessages });
    } else {
        // Mevcut sohbet yoksa, yeni bir sohbet oluşturun
        const newChat = {
            messages: [
                {
                    _id: message._id,
                    createdAt: message.createdAt,
                    text: message.text,
                    user: message.user,
                },
            ],
        };

        await setDoc(chatRef, newChat);
    }
    setChatStatus(messageRef,true,false)
};

export const listenChatss = (setChatMessages) => {
    const q = query(
        collection(db, "chats"),
        where("users", "array-contains", auth.currentUser?.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatss = querySnapshot.docs.map((doc) => doc.data());

        chatss.forEach((chat) => {
            if (chat?.messages) {
                chat?.messages.sort((a, b) => b.createdAt - a.createdAt);
            }
        });

        chatss.sort((a, b) => {
            const latestMessageA = a.messages?.[0];
            const latestMessageB = b.messages?.[0];
            return latestMessageB?.createdAt - latestMessageA?.createdAt;
        });
        setChatMessages(chatss); // Chat mesajlarını state'e yerleştir
    });
};



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