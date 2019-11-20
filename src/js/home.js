import {auth, firestore} from "./firebase";
import {MDCDialog} from '@material/dialog';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";

const dialog = new MDCDialog(document.getElementById('mdc-logout-dialog'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
const menu = document.getElementById("menu");
const list = new MDCList(document.getElementById('my-list'));
list.singleSelection = true;
const mainContentEl = document.querySelector('.main-content');
window.onload = function verifyUser() {
    auth.onAuthStateChanged(function (user) {
    
        if (!user) {
            window.location.href='/';
        }
    });
};
topAppBar.setScrollTarget(document.getElementById('main-content'));
menu.addEventListener('click', function (event) {
    drawer.open = !drawer.open;
});
drawer.open = true;
document.body.addEventListener('MDCDrawer:closed', () => {
    mainContentEl.querySelector('input, button').focus();
});

function addRoutine() {
    console.log("addRoutine()");
    $("#createbtn").on("click", function (event) {
        event.preventDefault();
        //window.location.href='/create.html';
        $("#cardRoutine").append(`
        <div class="mdc-card routine mdc-card--outlined">
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
}

function getSelectedTab() {
    console.log("getSelectedTab() ");
    const tabSelected = document.getElementById("my-list");
    tabSelected.addEventListener("click", event => {
        event.preventDefault();
        console.log(list.selectedIndex);
        if (list.selectedIndex === 0){
            $("#first").removeClass("hide");
            $("#second").addClass("hide");
        } else if(list.selectedIndex === 1){
            $("#first").addClass("hide");
            $("#second").removeClass("hide");
        }else{
            $("#first").removeClass("hide");
            $("#second").addClass("hide");
            list.selectedIndex = 0;
            dialog.open()
        }
    });
}
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

logoutAction();
addRoutine();
getSelectedTab();

/*
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
    });*/