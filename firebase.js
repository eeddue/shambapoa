const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCbXMZENaV05A6WbKdWfGopcioueUPB5Hc",
  authDomain: "olivetrust-c3b49.firebaseapp.com",
  databaseURL: "https://olivetrust-c3b49.firebaseapp.com",
  projectId: "olivetrust-c3b49",
  storageBucket: "olivetrust-c3b49.appspot.com",
  messagingSenderId: "657698033887",
  appId: "1:657698033887:web:201e008b893f4ea3f1196a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };
