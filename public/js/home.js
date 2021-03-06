import {MDCDialog} from '@material/dialog';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCTextField} from "@material/textfield";
import {MDCLinearProgress} from "@material/linear-progress";
import {MDCSnackbar} from '@material/snackbar';
import {MDCIconButtonToggle} from '@material/icon-button';
import {MDCRipple} from '@material/ripple';
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
//const URL = "http://localhost:5001/gymproject-9f46b/us-central1";
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const dialog = new MDCDialog(document.getElementById('mdc-logout-dialog'));
const dialogSearch = new MDCDialog(document.getElementById('dialog_search'));
const querieField = new MDCTextField(document.getElementById('search_field'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
const menu = document.getElementById("menu");
const list = new MDCList(document.getElementById('my-list'));
const mainContentEl = document.querySelector('.main-content');
const progressOne = new MDCLinearProgress(document.getElementById('first-progress'));
const progressTwo = new MDCLinearProgress(document.getElementById('second-progress'));
const progressThird = new MDCLinearProgress(document.getElementById('third-progress'));

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.disable = false;
const selector = '.favbtn';

progressOne.determinate = false;
progressTwo.determinate = false;
progressThird.determinate = false;
list.singleSelection = true;

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
    console.log("getSelectedTab()");
    const tabSelected = document.getElementById("my-list");
    tabSelected.addEventListener("click", event => {
        event.preventDefault();
        console.log(list.selectedIndex);
        if (list.selectedIndex === 0) {
            $("#first").removeClass("hide");
            $("#second").addClass("hide");
            $("#third").addClass("hide");
            $("#createbtn").removeClass("hide");
        } else if (list.selectedIndex === 1) {
            $("#first").addClass("hide");
            $("#second").removeClass("hide");
            $("#third").addClass("hide");
            $("#createbtn").addClass("hide");
        } else {
            $("#first").removeClass("hide");
            $("#second").addClass("hide");
            $("#third").addClass("hide");
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

function displayMusclesData(data) {
    for (let k = 0; k < data.length; k++) {
        console.log("Element" + k);
        let element = data[k];
        for (let exer in element) {
            let objData = element[exer];
            $("#muscle_list").append(`
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <div class="mdc-card routine mdc-card--outlined col-12">
                        <div class="mdc-card__primary-action" tabindex="0">
                            <div class="mdc-card_media mdc-card_media--square" style="height:200px; background:linear-gradient( rgba(255, 255, 255, 0.4) 100%, rgba(255, 255, 255, 0.4)100%),url(${objData.image}); background-size: cover; ">
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
                        displayMusclesData(responseJSON.data);
                    }
                    progressTwo.close()
                },
                error: function (err) {
                    console.log("User Not registered");
                    alert("Error... user Not registered :(");
                    progressTwo.close()
                }
            });
        }
    });
}

function callRoutines() {
    console.log("callRoutines");
    progressOne.open();
    $("#cardRoutine").html("");
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
                        console.log("PRUEBA",responseJSON.data.id);
                        displayroutineData(responseJSON.data);
                        progressOne.close()
                    }
                },
                error: function (err) {
                    console.log("Routines Error...");
                    progressOne.close()
                }
            });
        }
});
}

function displayroutineData(data, userid) {
    let count = 0;
    data.forEach(element => {
        console.log("data id",element.id);
        let isVisible, isHiden = "";
        if (element.isPrivate == "true") {
            isVisible = "visibility_off"
        }else{
            isVisible = "visibility"
        }

        $("#cardRoutine").append(`
         <div class="col-sm-11 col-md-11 col-lg-4 col-xl-4">
            <div class="mdc-card routine mdc-card--outlined col-12" id="${element.id}" index="${count}" >
            <div class="mdc-card_primary-action demo-card_primary-action my-card-content" tabindex="0">
                <div class="demo-card__primary">
                    <h2 class="demo-card__title mdc-typography mdc-typography--headline6">${element.nameRoutine}</h2>
                    <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">${element.email}</h3>
                </div>
                <div class="demo-card__secondary mdc-typography mdc-typography--body2">Numero de Ejersicios: ${element.excercises.length}</div>
            </div>
            <div class="mdc-card__actions" >
                <div class="mdc-card__action-buttons">
                    <button class="mdc-button mdc-card_action mdc-cardaction--button hide">  <span class="mdc-button_ripple"></span>Edit</button>
                </div>
                <div class="mdc-card__action-icons">
                    <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon favbtn" title="Visible">${isVisible}</button>
                    <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon deletebtn" title="Delete">delete</button>
                </div>
            </div>
            </div>
        </div>
        `);
    count++;
    });
}

$("#cardRoutine").on('click',".deletebtn", function(event){
event.preventDefault();
console.log("cardRoutine")
//console.log("adentro del delete");
let padre = event.target.parentNode.parentNode.parentNode;
//console.log(padre);
let id = padre.getAttribute('id');
//console.log("id elemento;", id);
deleteRoutine(id);
    snackbar.labelText="Deleting..."
    snackbar.open()
});

function deleteRoutine(id){
    console.log("deletelRoutine");
    auth.onAuthStateChanged((user) => {
        if (user) {
            $.ajax({
                url: URL + "/routines",
                method: "DELETE",
                dataType: "json",
                data: {
                    id: id
                },
                success: responseJSON => {
                    console.log("Conexión eliminar rutina Exitosa");
                    console.log(responseJSON.status);
                    if (responseJSON.status === 200) {
                        
                        console.log("Routine delete 200");
                        window.location.href='/home.html';
                    
                        progressOne.close()
                    }
                },
                error: function (err) {
                    console.log("Routines Error...");
                    progressOne.close()
                }
            });
        }
});

}

function setPublic(id, value){
    console.log("setPublic");
    auth.onAuthStateChanged((user) => {
        if (user) {
            $.ajax({
                url: URL + "/routines",
                method: "PUT",
                dataType: "json",
                data: {
                    id: id,
                    value: value
                },
                success: responseJSON => {
                    console.log("Conexión setPublic rutina Exitosa");
                    console.log(responseJSON.status);
                    if (responseJSON.status === 200) {
                        
                        console.log("Routine setPublic 200");
                       // window.location.href='/home.html';
                    
                        progressOne.close()
                    }
                },
                error: function (err) {
                    console.log("Routines Error...");
                    progressOne.close()
                }
            });
        }
});

}

function displaySearchRoutineData(data){
    data.forEach(element => {
        $("#cardSearchRoutines").append(`
         <div class="col-sm-11 col-md-11 col-lg-4 col-xl-4">
            <div class="mdc-card routine mdc-card--outlined col-12">
            <div class="mdc-card_primary-action demo-card_primary-action my-card-content" tabindex="0">
                <div class="demo-card__primary">
                    <h2 class="demo-card__title mdc-typography mdc-typography--headline6">${element.nameRoutine}</h2>
                    <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">${element.email}</h3>
                </div>
                <div class="demo-card__secondary mdc-typography mdc-typography--body2">Numero de Ejersicios: ${element.excercises.length}</div>
            </div>
            <div class="mdc-card__actions">
                <div class="mdc-card__action-buttons">
                    <button class="mdc-button mdc-card_action mdc-cardaction--button">  <span class="mdc-button_ripple"></span> Edit</button>
                </div>
                <div class="mdc-card__action-icons">
                    <button id="add-to-pubic"
                            class="mdc-icon-button"
                            aria-label="Add to public"
                            aria-hidden="true"
                            aria-pressed="false">
                        <i class="material-icons mdc-icon-button_icon mdc-icon-button_icon--on">visibility</i>
                        <i class="material-icons mdc-icon-button__icon">visibility_off</i>
                    </button>
                    <button class="material-icons mdc-icon-button mdc-card_action mdc-card_action--icon" title="Delete">delete</button>
                </div>
            </div>
            </div>
        </div>
        `);

    });
}

function searchButtonAction(){
    $("#search_button_q").on("click", event => {
        if(querieField.valid){
            console.log("Search Query: CLick");
            event.preventDefault();
            dialogSearch.close();
            $("#first").addClass("hide");
            $("#second").addClass("hide");
            $("#createbtn").addClass("hide");
            $("#third").removeClass("hide");
            $.ajax({
                url: URL + "/search",
                method: "GET",
                dataType: "json",
                data: {
                    text: querieField.value
                },
                success: responseJSON => {
                    console.log(responseJSON.statusMessage);
                    console.log(responseJSON.data);
                    if (responseJSON.status === 200) {
                        displaySearchRoutineData(responseJSON.data);
                        progressThird.close();
                        querieField.value = "";
                    }
                },
                error: function (err) {
                    console.log("Routines Error...");
                    progressOne.close()
                }
            });
        }else{
            alert("Please add a valid text")
        }

    })

}

function searchAction() {
    $("#search_icon").on("click", event => {
        console.log("search_icon: CLick");
        event.preventDefault();
        dialogSearch.open();
        progressThird.open();
    })
}

function enableFavClick(){
    $('#cardRoutine').on('click', ".favbtn", function (event) {
        event.preventDefault();
        console.log("click ...");
        let padre = event.target.parentNode.parentNode.parentNode;
        let onChild =padre.lastElementChild.lastElementChild.firstElementChild;
        let id = padre.getAttribute('id');
        let value ;

        if (onChild.textContent === "visibility_off") {
            onChild.textContent = "visibility"
            snackbar.labelText="Yout Routine is now PUBLIC to everyone!"
            value = false;
            snackbar.open()
        }else{
            onChild.textContent = "visibility_off"
            snackbar.labelText="Yout Routine is now HIDE to everyone!"
            value = true;
            snackbar.open()
        }

        setPublic(id,value);

    });
}

logoutAction();
addRoutine();
getSelectedTab();
callRoutines();
callExcersicesAction();
closeIfDevice();
searchAction();
searchButtonAction();
enableFavClick();
