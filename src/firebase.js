import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAat6rftEiBVatRcrqCS1JASwfDHwg89kw",
  authDomain: "deakin-8.firebaseapp.com",
  projectId: "deakin-8",
  storageBucket: "deakin-8.appspot.com",
  messagingSenderId: "218031383670",
  appId: "1:218031383670:web:ca21bd19f54da687066b57",
  measurementId: "G-92GLE8SHS7",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
