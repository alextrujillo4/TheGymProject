
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

import {MDCDialog} from '@material/dialog';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCTextField} from "@material/textfield";
import {MDCLinearProgress} from "@material/linear-progress";

const dialog = new MDCDialog(document.getElementById('mdc-logout-dialog'));
const dialogSearch = new MDCDialog(document.getElementById('dialog_search'));
const querieField = new MDCTextField(document.getElementById('search_field'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
const menu = document.getElementById("menu");
const list = new MDCList(document.getElementById('my-list'));
list.singleSelection = true;
const mainContentEl = document.querySelector('.main-content');



const progressOne = new MDCLinearProgress(document.getElementById('first-progress'));
const progressTwo = new MDCLinearProgress(document.getElementById('second-progress'));
const progressThird = new MDCLinearProgress(document.getElementById('third-progress'));
progressOne.determinate = false;
progressTwo.determinate = false;
progressThird.determinate = false;






auth.onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = '/';
    } else {
        $("#user_name").text(`${user.email}`);
    }
});
topAppBar.setScrollTarget(document.getElementById('main-content'));
menu.addEventListener('click', function (event) {
    drawer.open = !drawer.open;
});

function closeIfDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        drawer.open = false;
    } else {
        drawer.open = true;
    }
}

document.body.addEventListener('MDCDrawer:closed', () => {
    mainContentEl.querySelector('input, button').focus();
});

function addRoutine() {
    console.log("addRoutine()");
    $("#createbtn").on("click", function (event) {
        event.preventDefault();
        window.location.href='/create.html';
    });
}

function getSelectedTab() {
    console.log("getSelectedTab() ");
    const tabSelected = document.getElementById("my-list");
    tabSelected.addEventListener("click", event => {
        event.preventDefault();
        console.log(list.selectedIndex);
        if (list.selectedIndex === 0) {
            $("#first").removeClass("hide");
            $("#second").addClass("hide");
            $("#createbtn").removeClass("hide");
        } else if (list.selectedIndex === 1) {
            $("#first").addClass("hide");
            $("#second").removeClass("hide");
            $("#createbtn").addClass("hide");

        } else {
            $("#first").removeClass("hide");
            $("#second").addClass("hide");
            $("#createbtn").removeClass("hide");
            list.selectedIndex = 0;
            dialog.open()
        }
        closeIfDevice();
    });
}

function logoutAction() {
    console.log("logoutAction()");
    $("#logoutConfirm").on("click", function (event) {
        event.preventDefault();
        auth.signOut().then(function () {
        }).catch(function (error) {
        });
    });
}

function displayData(data) {
    for (let k = 0; k < data.length; k++) {
        console.log("Element" + k);
        let element = data[k];
        for (let exer in element) {
            let objData = element[exer];
            $("#muscle_list").append(`
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <div class="mdc-card routine mdc-card--outlined col-12">
                        <div class="mdc-card__primary-action" tabindex="0">
                            <div class="mdc-card__media mdc-card__media--square" style="background:linear-gradient( rgba(255, 255, 255, 0.4) 100%, rgba(255, 255, 255, 0.4)100%),url(${objData.image}); background-size: cover; ">
                                <div class="mdc-card__media-content text mdc-typography--headline6">${objData.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }
    }
}

function callExcersicesAction() {
    console.log("callExcersicesAction()");
    auth.onAuthStateChanged((user) => {
        if (user) {
            $.ajax({
                url: URL + "/query",
                method: "GET",
                dataType: "json",
                data: {
                    uid: user.uid
                },
                success: responseJSON => {
                    console.log("Conexión Exitosa");
                    if (responseJSON.status === 200) {
                        console.log("200");
                        //displayData(responseJSON.data);
                    }
                },
                error: function (err) {
                    console.log("User Not registered");
                    alert("Error... user Not registered :(");
                }
            });
        }
    });
}


function callRoutines() {
    console.log("callRoutines");
    auth.onAuthStateChanged((user) => {
        if (user) {
            $.ajax({
                url: URL + "/routines",
                method: "GET",
                dataType: "json",
                data: {
                    uid: user.uid
                },
                success: responseJSON => {
                    console.log("Conexión Routines Exitosa");
                    console.log(responseJSON.status);
                    if (responseJSON.status === 200) {
                        console.log("Routines 200");
                        displayroutineData(responseJSON.data);
                    }
                },
                error: function (err) {
                    console.log("Routines Error...");
                }
            });
        }
});
}
function displayroutineData(data) {
    data.forEach(element => {
        $("#cardRoutine").append(`
         <div class="col-sm-11 col-md-11 col-lg-4 col-xl-4">
            <div class="mdc-card routine mdc-card--outlined col-12">
            <div class="mdc-card__primary-action demo-card__primary-action my-card-content" tabindex="0">
                <div class="demo-card__primary">
                    <h2 class="demo-card__title mdc-typography mdc-typography--headline6">${element.nameRoutine}</h2>
                    <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">${element.email}</h3>
                </div>
                <div class="demo-card__secondary mdc-typography mdc-typography--body2">Numero de Ejersicios: ${element.excercises}</div>
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
                            aria-hidden="false"
                            aria-pressed="true"
                            >
                        <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">visibility</i>
                        <i class="material-icons mdc-icon-button__icon">visibility_off</i>
                    </button>
                    <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Delete">delete</button>
                </div>
            </div>
            </div>
        </div>
        `);

    });

}
/*
$("#cardRoutine").on('change','.mdc-icon-button',function(event){
event.preventDefault();
});
*/
function getRoutineByName(name){
console.log("getRoutineByName()")
    $.ajax({
        url: URL + "/routines",
        method: "PUT",
        dataType: "json",
        data: name,
        success: responseJSON => {
            console.log("Conexión Routines Exitosa");
            console.log(responseJSON.status);
            if (responseJSON.status === 200) {
                console.log("Routines 200");
             //   displayroutineData(responseJSON.data);
            }
        },
        error: function (err) {
            console.log("Routines Error...");
        }
    });


}


function searchButtonAction(){
    $("#search_button_q").on("click", event => {
        console.log("search_button: CLick")
        event.preventDefault();
        dialogSearch.open()
    })

}


logoutAction();
addRoutine();
getSelectedTab();
callRoutines();
callExcersicesAction();
closeIfDevice();
searchAction();
searchButtonAction();
