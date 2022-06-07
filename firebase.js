import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAMgy9cc5xciNxG9BMyQG4b718iI1-bQ9Y',
  authDomain: 'travelon-22f65.firebaseapp.com',
  projectId: 'travelon-22f65',
  storageBucket: 'travelon-22f65.appspot.com',
  messagingSenderId: '367671707283',
  appId: '1:367671707283:web:19614f911281939bacef66',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const database = firebase.database();

export { database };
