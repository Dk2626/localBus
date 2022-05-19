import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDPA1lZJ4F9mSj_ZurKXnAVijSUZOp7riI',
  authDomain: 'localbus-8bd79.firebaseapp.com',
  projectId: 'localbus-8bd79',
  storageBucket: 'localbus-8bd79.appspot.com',
  messagingSenderId: '854920363097',
  appId: '1:854920363097:web:860e9b42c3a2a370cd8548',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const database = firebase.database();

export { database };
