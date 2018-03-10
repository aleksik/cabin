import firebase from 'firebase';
import 'firebase/firestore';

firebase.firestore.QueryDocumentSnapshot
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

auth.onAuthStateChanged(user => {
  db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    photoURL: user.photoURL
  });
});

export {
  auth,
  db,
  storage
};