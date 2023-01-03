import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBSKLvnQstXxGo7ZYNKkEfVloyMjhdNudA",
    authDomain: "tuul-724d6.firebaseapp.com",
    projectId: "tuul-724d6",
    storageBucket: "tuul-724d6.appspot.com",
    messagingSenderId: "816311674537",
    appId: "1:816311674537:web:4e91b691de7d1708b62bb8",
    measurementId: "G-JBKGTK8L2C"
};

/*const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}*/

export const app = initializeApp(firebaseConfig);
