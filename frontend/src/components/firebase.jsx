import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA7lecxGdSzYZyq7JJWTuce7IQFIeHNAhA",
  authDomain: "mit-wpu-student-console.firebaseapp.com",
  databaseURL: "https://mit-wpu-student-console.firebaseio.com",
  projectId: "mit-wpu-student-console",
  storageBucket: "mit-wpu-student-console.appspot.com",
  messagingSenderId: "66181943192",
  appId: "1:66181943192:web:dfbe4f6eeca82613f7e5ed"
};
firebase.initializeApp(config);

//Change this value to switch emulator and firebase

let sw = true

if (window.location.hostname === 'localhost' && sw) {
  console.log("testing locally -- hitting local functions and firestore emulators");
  firebase.functions().useFunctionsEmulator('http://localhost:5001');
  firebase.auth().useEmulator('http://localhost:9099')

  firebase.database().useEmulator("localhost", 9000)
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
