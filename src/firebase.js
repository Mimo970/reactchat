// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "chat-ab746.firebaseapp.com",
//   projectId: "chat-ab746",
//   storageBucket: "chat-ab746.appspot.com",
//   messagingSenderId: "901216368405",
//   appId: "1:901216368405:web:8ec942ee51611df5c49b1c",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const storage = getStorage();
// export const db = getFirestore()

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, FieldValue } from "firebase/firestore";
// import { getStorage, ref } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAWW5ErnIOkweeGJokTCAfreYKkgwB-rTY",
//   authDomain: "communicationsapp-9ac43.firebaseapp.com",
//   projectId: "communicationsapp-9ac43",
//   storageBucket: "communicationsapp-9ac43.appspot.com",
//   messagingSenderId: "1023188269026",
//   appId: "1:1023188269026:web:510be74bc57eee4df0ebbb",
//   measurementId: "G-3CWSMLBWMK",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const storage = getStorage(app);
// export const db = getFirestore(app);
// export { FieldValue };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, FieldValue } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db, FieldValue };
