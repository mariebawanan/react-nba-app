import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBN01YBSojoCgfuEBEQNaLbcXZMn32vXJ8",
    authDomain: "nba-full-abf9a.firebaseapp.com",
    databaseURL: "https://nba-full-abf9a.firebaseio.com",
    projectId: "nba-full-abf9a",
    storageBucket: "nba-full-abf9a.appspot.com",
    messagingSenderId: "981372059396"
  
}

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach( (childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
}


export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}