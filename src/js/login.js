
import { auth } from './firebase/index.js'
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
/*const linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
linearProgress.close();*/
//const URL = "https://us-central1-gymproject-9f46b.cloudfunctions.net";
const URL = "http://localhost:5000/gymproject-9f46b/us-central1";


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

