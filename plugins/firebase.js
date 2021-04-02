import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDhsZH44hFApkAExIgc_ZjdlEdYagMHqs8",
    authDomain: "e-ticket-f7802.firebaseapp.com",
    projectId: "e-ticket-f7802",
    storageBucket: "e-ticket-f7802.appspot.com",
    messagingSenderId: "514928735819",
    appId: "1:514928735819:web:6f8e5a1ddbbe5832283fce"
  };

  let app = null, db = null;

  if(!firebase.apps.length)
  {
      app = firebase.initializeApp(firebaseConfig);
      firebase.firestore().settings({timestampsInSnapshots: true});
      db = firebase.firestore();
  }

  export {db};
  export default firebase;