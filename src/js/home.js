
import {auth, firestore} from "./firebase";

new MDCList(document.querySelector('.mdc-list'));
window.onload = function verifyUser() {
    auth.onAuthStateChanged(function (user) {
        auth.onAuthStateChanged(function (user) {
            if (!user.uid) {
                window.location.href='/home.html';
            }
        });
    });
};
import {MDCList} from '@material/list';
import {MDCRipple} from '@material/ripple';
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));

$("#createbtn").on("click", function (event) {
event.preventDefault();
    $("#cardRoutine").append(`
        <div class="mdc-layout-grid__cell">
            <div class="mdc-card routine">
            <div class="mdc-card__primary-action">
            <div class="mdc-card__media mdc-card__media--square">
            <div class="mdc-card__media-content">Title</div>
            </div>
            </div>
            <div class="mdc-card__actions">
                <div class="mdc-card__action-buttons">
                 <button class="mdc-button mdc-card__action mdc-card__action--button">
                    <span class="mdc-button__label">Ver</span>
                </button>
                <button class="mdc-button mdc-card__action mdc-card__action--button">
                    <span class="mdc-button__label">Editar</span>
                </button>
                </div>
            </div>
            </div>
        </div>`);
});


const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
    drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
    mainContentEl.querySelector('input, button').focus();
});

/*
*
* firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
* */

let excerciseRef = firestore.collection('Excercises').doc('0npiQehggfuPgF3X6Z6y');
let getDoc = excerciseRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

function logoutBtnAction() {
    $("#logoutBtn").on("click", function (event) {
        event.preventDefault();
    });
}

logoutBtnAction();
