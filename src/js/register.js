import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';



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

function registerUser() {
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
}
registerAction();