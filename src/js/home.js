import {auth} from "./firebase";
new MDCList(document.querySelector('.mdc-list'));
window.onload = function verifyUser() {
    auth.onAuthStateChanged(function(user) {
        auth.onAuthStateChanged(function(user) {
            if (!user) {
                window.location.href='/';
            }
        });
    });
};
import {MDCList} from '@material/list';



