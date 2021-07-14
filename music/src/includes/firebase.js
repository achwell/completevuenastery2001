import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCl7KGfY7d1QeLVsV7xZUOzpvvzId-x-Rs',
  authDomain: 'music-d9e52.firebaseapp.com',
  projectId: 'music-d9e52',
  storageBucket: 'music-d9e52.appspot.com',
  appId: '1:180576008156:web:c520224575f98da7b2c119',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
};
