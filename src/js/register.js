import {MDCTextField} from '@material/textfield';
import {MDCDialog} from '@material/dialog';
import { auth } from './firebase/index.js'
window.onload = function verifyUser() {
    auth.onAuthStateChanged(function(user) {
            if (user) {
                window.location.href = '/home.html';
            }
    });
};
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
import {MDCRipple} from '@material/ripple';
import { MDCLinearProgress } from '@material/linear-progress';
//const URL = "https://us-central1-gymproject-9f46b.cloudfunctions.net";
const URL = "http://localhost:5000/gymproject-9f46b/us-central1";
const username = new MDCTextField(document.querySelector('.username'));
const email = new MDCTextField(document.querySelector('.email'));
const password = new MDCTextField(document.querySelector('.password'));
const confirmPassword = new MDCTextField(document.querySelector('.confirmPassword'));
const linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
linearProgress.close();



function dialogAction(){
    console.log("dialogAction()");
    let okBtn = document.getElementById('dialog_ok');
    okBtn.addEventListener('click', function(event) {
        window.location.href='/'
    });
}

function registerAction() {
    console.log("registerAction()");
    let registerBtn = document.getElementById('next');
    registerBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if(username.valid && email.valid && password.valid && confirmPassword.valid){
            registerUser();
        }
    });
}


function registerUserInDatabase(uid) {
    $.ajax({
        url: URL + "/register",
        method: "POST",
        dataType: "json",
        data:{
            user : {
                uid:uid,
                username : username.value,
                mail : email.value,
            }
        },
        success: responseJSON => {
            console.log("Conexión Exitosa");
            console.log(responseJSON.status);
            if (responseJSON.status === 200){
                dialog.open()
            } else{
                alert("Error... user is already registered!");
            }
            linearProgress.close();
        },
        error: function(err) {
            console.log("User Not registered");
            alert("Error... user Not registered :(");
            linearProgress.close();
        }
    });
}
function registerUser() {
    linearProgress.open();
    linearProgress.determinate = false;
    return auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(function(firebaseUser) {
            console.log("User: " + firebaseUser.user.uid+ "Created successfully!");
            registerUserInDatabase(firebaseUser.user.uid);
        })
        .catch(function(error) {
            console.log("User not Created!");
            linearProgress.close();
        });
}
registerAction();
dialogAction();