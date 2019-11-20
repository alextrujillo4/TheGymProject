
const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/auth');
// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCMQfCVoDb2eiuXHACCUX66TO_6v4XFTF0",
    authDomain: "gymproject-9f46b.firebaseapp.com",
    databaseURL: "https://gymproject-9f46b.firebaseio.com",
    projectId: "gymproject-9f46b",
    storageBucket: "gymproject-9f46b.appspot.com",
    messagingSenderId: "585009595190",
    appId: "1:585009595190:web:cad18d95185a486bf1e997",
    measurementId: "G-TSWB8RLHM9"
});
const auth  = firebase.auth();
const URL = "https://us-central1-gymproject-9f46b.cloudfunctions.net";

window.onload = function verifyUser() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            window.location.href='/home.html';
        }
    });
};
import {MDCRipple} from '@material/ripple';
import {MDCLinearProgress} from "@material/linear-progress";
import {MDCSnackbar} from '@material/snackbar';
import {MDCTextField} from "@material/textfield";
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
new MDCRipple(document.querySelector('.cancel'));
new MDCRipple(document.querySelector('.next'));
const email = new MDCTextField(document.querySelector('.email'));
const password = new MDCTextField(document.querySelector('.password'));

function loginAction(){
    console.log("loginAction()");
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email.value, password.value).then(function(user) {
            console.log("User logged In!");
            window.location.href='/home.html';
        }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                snackbar.labelText = "Incorrect password. Please try again.";
                snackbar.open();
            } else {
                snackbar.labelText = "Error. Please try again.";
                snackbar.open();
            }
            console.log(error);
        });
    });
}

loginAction();

