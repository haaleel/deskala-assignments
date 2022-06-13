
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8QYJNeAxJSP8p7twIMOZLR-neplfDdTI",
  authDomain: "react-form-assesment.firebaseapp.com",
  projectId: "react-form-assesment",
  storageBucket: "react-form-assesment.appspot.com",
  messagingSenderId: "278394457510",
  appId: "1:278394457510:web:3cc11ee38f852b02b8d367",
};



const firebasedb = firebase.initializeApp(firebaseConfig);

// // !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// const db=firebase.firestore()

export default firebasedb



// export { auth, db };