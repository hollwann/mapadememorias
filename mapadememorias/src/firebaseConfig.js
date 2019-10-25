import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// firebase init goes here

let config = {
  apiKey: 'AIzaSyAcZWDtq5wYU5sNDTY9bX3qhwvINy_WiXY',
  authDomain: 'mapadememorias.firebaseapp.com',
  databaseURL: 'https://mapadememorias.firebaseio.com',
  projectId: 'mapadememorias',
  storageBucket: 'mapadememorias.appspot.com',
  messagingSenderId: '891423638686',
  appId: '1:891423638686:web:32fc198cf4fc921664a78f'
}

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storageRef = firebase.storage().ref()

export { db, auth, storageRef }
