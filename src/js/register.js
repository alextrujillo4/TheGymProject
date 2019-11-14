import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';
var admin = require("firebase-admin");
admin.initializeApp({
    apiKey: "AIzaSyCMQfCVoDb2eiuXHACCUX66TO_6v4XFTF0",
    authDomain: "gymproject-9f46b.firebaseapp.com",
    databaseURL: "https://gymproject-9f46b.firebaseio.com",
    projectId: "gymproject-9f46b",
    storageBucket: "gymproject-9f46b.appspot.com",
    messagingSenderId: "585009595190",
    appId: "1:585009595190:web:cad18d95185a486bf1e997",
    measurementId: "G-TSWB8RLHM9"
});

const URL = " https://us-central1-gymproject-9f46b.cloudfunctions.net";
const username = new MDCTextField(document.querySelector('.username'));
const mail = new MDCTextField(document.querySelector('.email'));
const password = new MDCTextField(document.querySelector('.password'));
const confirmPassword = new MDCTextField(document.querySelector('.confirmPassword'));
const registerbutton = new MDCRipple(document.querySelector('#next'));

function registerAction() {
    console.log("registerAction()");
    let registerBtn = document.getElementById('next');
    registerBtn.addEventListener('click', function(event) {
        event.preventDefault();
      if(username.valid && mail.valid && password.valid && confirmPassword.valid){
          registerUser();
      }
    });

}

/*function registerUser() {
    $.ajax({
        url: URL + "/register",
        method: "POST",
        dataType: "json",
        data:{
            username : username.value,
            mail : mail.value,
            password : password.value
        },
        success: responseJSON => {
            console.log("Connexión Exitosa");
            console.log(responseJSON)

        },
        error: function(err) {
            console.log("Connexión Error");
            console.log(err)
        }
    });
}*/
registerAction();