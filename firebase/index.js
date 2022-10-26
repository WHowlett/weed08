import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// replace this firebase conFigvariable with your own
const firebaseConfig = {
    apiKey: "AIzaSyBJRRLHqLP8sxvexFXFavov6pQ4b9CSDWQ",
    authDomain: "week-8-ae326.firebaseapp.com",
    projectId: "week-8-ae326",
    storageBucket: "week-8-ae326.appspot.com",
    messagingSenderId: "534977704790",
    appId: "1:534977704790:web:39d0b5a1d17d97697f1cf7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };