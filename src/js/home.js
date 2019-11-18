import {auth, firestore} from "./firebase";
import {MDCList} from '@material/list';
import {MDCRipple} from '@material/ripple';
import {MDCDialog} from '@material/dialog';
import {MDCIconButtonToggle} from '@material/icon-button';

const dialog = new MDCDialog(document.getElementById('mdc-logout-dialog'));
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
const iconToggle = new MDCIconButtonToggle(document.querySelector('.mdc-icon-button'));

new MDCList(document.querySelector('.mdc-list'));
window.onload = function verifyUser() {
    auth.onAuthStateChanged(function (user) {
            if (!user) {
                window.location.href='/';
            }
    });
};

$("#createbtn").on("click", function (event) {
event.preventDefault();
    $("#cardRoutine").append(`
        <div class="mdc-card routine">
                    <div class="mdc-card__primary-action demo-card__primary-action my-card-content" tabindex="0">
                        <div class="demo-card__primary">
                            <h2 class="demo-card__title mdc-typography mdc-typography--headline6">Day 0</h2>
                            <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">by Alex Trujillo</h3>
                        </div>
                        <div class="demo-card__secondary mdc-typography mdc-typography--body2">This is the first routine. Visit ten places on our planet that are undergoing the biggest changes today.</div>
                    </div>
                    <div class="mdc-card__actions">
                        <div class="mdc-card__action-buttons">
                            <button class="mdc-button mdc-card__action mdc-card__action--button">  <span class="mdc-button__ripple"></span> Read</button>
                            <button class="mdc-button mdc-card__action mdc-card__action--button">  <span class="mdc-button__ripple"></span> Edit</button>
                        </div>
                        <div class="mdc-card__action-icons">
                            <button id="add-to-pubic"
                                    class="mdc-icon-button"
                                    aria-label="Add to public"
                                    aria-hidden="true"
                                    aria-pressed="false">
                                <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">visibility</i>
                                <i class="material-icons mdc-icon-button__icon">visibility_off</i>
                            </button>
                            <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Delete">delete</button>
                        </div>
                    </div>
                </div>
`);
});


const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
    drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
    mainContentEl.querySelector('input, button').focus();
});
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

function logoutAction() {
    console.log("logoutAction()");
    $("#logoutConfirm").on("click", function (event) {
        event.preventDefault();
        auth.signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    });
}


function logoutBtnAction() {
    console.log("logoutBtnAction()");
    $("#logoutBtn").on("click", function (event) {
        event.preventDefault();
        dialog.open()
    });
}

logoutBtnAction();


logoutAction();

