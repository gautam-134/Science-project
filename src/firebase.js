// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHxY_KB8v7vWCFNiJw4bTKgtL_X06K4ps",
  authDomain: "science-project-c648a.firebaseapp.com",
  projectId: "science-project-c648a",
  storageBucket: "science-project-c648a.appspot.com",
  messagingSenderId: "1034983753413",
  appId: "1:1034983753413:web:16ff4ef5d3bf498e40d2ac",
  measurementId: "G-Z28TKS45KE"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {auth};
export default firebase;