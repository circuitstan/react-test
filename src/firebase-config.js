import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASkpletaqUH-NHlo1avkOAijauzoDf09A", 
    authDomain: "coscooter-eu-staging.firebaseapp.com", 
    projectId: "coscooter-eu-staging",
    storageBucket: "coscooter-eu-staging.appspot.com", 
    messagingSenderId: "485561968577",
    appId: "1:485561968577:web:1066af28a9c306f124f140",
    measurementId: "G-27RX6KEM2F"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db, app}

/*firebase.initializeApp(firebaseConfig);

export default firebase.firestore();*/

//export const app = initializeApp(firebaseConfig);
