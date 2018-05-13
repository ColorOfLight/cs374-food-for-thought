import firebase from 'firebase'

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDu3a9JmVraNWsQkbp54mTa8ppyrR3t6Og",
  authDomain: "cs374-foodforthought.firebaseapp.com",
  databaseURL: "https://cs374-foodforthought.firebaseio.com",
  projectId: "cs374-foodforthought",
  storageBucket: "cs374-foodforthought.appspot.com",
  messagingSenderId: "539605816514"
})

let db = firebaseApp.database();

export default db;
