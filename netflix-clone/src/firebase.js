import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCxX63rTJbCn8Nash3UddXw9FMjjfqDdSI",
    authDomain: "netflix-clone-9c7f4.firebaseapp.com",
    databaseURL: "https://netflix-clone-9c7f4-default-rtdb.firebaseio.com",
    projectId: "netflix-clone-9c7f4",
    storageBucket: "netflix-clone-9c7f4.appspot.com",
    messagingSenderId: "72296097491",
    appId: "1:72296097491:web:6770f7d697a7fd5bfd5626"
  };

const firebaeApp =  firebase.initializeApp(firebaseConfig);
const db = firebaeApp.fireStore();
const auth = firebase.auth()

export {auth}
export default db;