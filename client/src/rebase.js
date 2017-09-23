import Rebase from 're-base';
import firebase, { database } from 'firebase';

let app = firebase.initializeApp({
    apiKey: 'AIzaSyAUqf02rNmL8U1yE4SPiYI7LGoGzU69pWI',
    authDomain: 'mhax-180802.firebaseapp.com',
    databaseURL: 'https://mhax-180802.firebaseio.com',
    projectId: 'mhax-180802'
});

let isSigned = false;
app.auth().onAuthStateChanged((user) => {
    if (user) isSigned = true;
    else isSigned = false;
    console.log("user: ", user, "and", isSigned)
});

let db = database(app);
let base = Rebase.createClass(db);

export default base;