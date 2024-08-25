import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBL1OJHseUTKJ9Y-PjklZVfXoXrpJ4ei1k",
    authDomain: "mya-e47cd.firebaseapp.com",
    projectId: "mya-e47cd",
    storageBucket: "mya-e47cd.appspot.com",
    messagingSenderId: "1038467968056",
    appId: "1:1038467968056:web:fa2c18629315f9477f0acd"
  };

  const app = !firebase.apps.length?
               firebase.initializeApp(firebaseConfig)
               :firebase.app()

  const db = getFirestore(app);

  export default db;
  