import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAbzXHiBVb6Md_6R2vOsfYlaS89uwiNmf0',
  authDomain: 'quotesapi-738f5.firebaseapp.com',
  databaseURL: 'https://quotesapi-738f5.firebaseio.com',
  projectId: 'quotesapi-738f5',
  storageBucket: 'quotesapi-738f5.appspot.com',
  messagingSenderId: '225879898659',
  appId: '1:225879898659:web:72a6c66c3845fb49e6cf96',
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(app);

export const quotesRef = db.collection('quotes');
