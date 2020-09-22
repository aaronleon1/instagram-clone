import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDA6LtTJ6RVxXgJHKHoOPmLMpJ3HtAfac0",
    authDomain: "instagram-clone-a77c1.firebaseapp.com",
    databaseURL: "https://instagram-clone-a77c1.firebaseio.com",
    projectId: "instagram-clone-a77c1",
    storageBucket: "instagram-clone-a77c1.appspot.com",
    messagingSenderId: "432464692516",
    appId: "1:432464692516:web:f215e61a54a9c34058dfb1"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage}

