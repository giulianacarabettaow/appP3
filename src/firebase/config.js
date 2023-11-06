import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAoNoGCscjo5vzNlqSDtkHNGRSh3r9Io9s",
    authDomain: "appprog3-a2b17.firebaseapp.com",
    projectId: "appprog3-a2b17",
    storageBucket: "appprog3-a2b17.appspot.com",
    messagingSenderId: "57416350085",
    appId: "1:57416350085:web:3c609df1cbb34a9fcc6cec"
  };

  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();
