// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore'

// const firebaseConfig ={
//     apiKey: "AIzaSyATleeyPlkcbuhng8nj5gBhXRY1zz_Fn_E",
//     authDomain: "todolist-7cbe4.firebaseapp.com",
//     projectId: "todolist-7cbe4",
//     storageBucket: "todolist-7cbe4.appspot.com",
//     messagingSenderId: "535354365896",
//     appId: "1:535354365896:web:d6fb73fd84cd4742a912fd",
//     measurementId: "G-T94Z14NLKX"
// };

// if (!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig)
// }

// export {firebase};

import firebase from 'firebase/compat/app'
import {getDatabase} from 'firebase/database'

const firebaseConfig ={
    apiKey: "AIzaSyBWIr4RdNJqCbiiwzd-8ZU0XQmTbuEZIlY",
    authDomain: "crudwithdb.firebaseapp.com",
    projectId: "crudwithdb",
    storageBucket: "crudwithdb.appspot.com",
    messagingSenderId: "647914732959",
    appId: "1:647914732959:web:7a5fdddc9432250f1e91aa",
    measurementId: "G-YRRZD6G7T9"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase()

export {db}