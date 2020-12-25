import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDevQapA5kn_DfJepEYxgb8FJX3qnJvxAE",
  authDomain: "fiquipped-8ac53.firebaseapp.com",
  databaseURL: "https://fiquipped-8ac53.firebaseio.com",
  projectId: "fiquipped-8ac53",
  storageBucket: "fiquipped-8ac53.appspot.com",
  messagingSenderId: "243918214688",
  appId: "1:243918214688:web:d8db14a2ff8f19f45a0e45",
  measurementId: "G-1Q3J9Y4LQY"
};

firebase.initializeApp(config);

if (window.location.hostname === 'localhost') {
  console.log("testing locally -- hitting local functions and firestore emulators");
  firebase.functions().useFunctionsEmulator('http://localhost:5001');
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.database().useEmulator('http://localhost:9000')
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  });
}


export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const realDB = firebase.database();
export const func = firebase.functions();
