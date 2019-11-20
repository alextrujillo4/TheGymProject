import {auth, firestore} from "./firebase";
let excercisesRef = firestore.collection('Excercises');
//const URL = "https://us-central1-gymproject-9f46b.cloudfunctions.net";
const URL = "http://localhost:5000/gymproject-9f46b/us-central1";
let excChecked = [];
function getUpperBody() {
    $.ajax({
        url: URL + "/data",
        method: "GET",
        dataType: "json",
        success: responseJSON => {
            console.log("Conexión Exitosa");
            console.log(responseJSON.status);
            if (responseJSON.status === 200){
                responseJSON.data.forEach(element => {
                    $("#upper").append(`
                    <li aria-checked="false" class="mdc-list-item" role="checkbox" id="${element.id}" name="${element.name}">
                        <span class="mdc-list-item__graphic">
                            <div class="mdc-checkbox">
                                <input class="mdc-checkbox__native-control"
                                       id="demo-list-checkbox-item-3"
                                       type="checkbox"/>
                                <div class="mdc-checkbox__background">
                                  <svg class="mdc-checkbox__checkmark"
                                       viewBox="0 0 24 24">
                                    <path class="mdc-checkbox__checkmark-path"
                                          d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                          fill="none"/>
                                  </svg>
                                  <div class="mdc-checkbox__mixedmark"></div>
                                </div>
                              </div>
                        </span>
                        <label class="mdc-list-item__text" for="demo-list-checkbox-item-3">${element.name}</label>
                    </li>
                    `)
                });
            }
        },
        error: function(err) {
            console.log("UpperBody error");
        }
    });

}

function getLowerBody() {
    $.ajax({
        url: URL + "/data",
        method: "GET",
        dataType: "json",
        success: responseJSON => {
            console.log("Conexión Exitosa");
            console.log(responseJSON.status);
            if (responseJSON.status === 200){
                responseJSON.data.forEach(element => {
                    $("#lower").append(`
                    <li aria-checked="false" class="mdc-list-item" role="checkbox" id="${element.id}" name="${element.name}">
                        <span class="mdc-list-item__graphic">
                            <div class="mdc-checkbox">
                                <input class="mdc-checkbox__native-control"
                                       id="demo-list-checkbox-item-3"
                                       type="checkbox"/>
                                <div class="mdc-checkbox__background">
                                  <svg class="mdc-checkbox__checkmark"
                                       viewBox="0 0 24 24">
                                    <path class="mdc-checkbox__checkmark-path"
                                          d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                          fill="none"/>
                                  </svg>
                                  <div class="mdc-checkbox__mixedmark"></div>
                                </div>
                              </div>
                        </span>
                        <label class="mdc-list-item__text" for="demo-list-checkbox-item-3">${element.name}</label>
                    </li>
                    `)
                });
            }
        },
        error: function(err) {
            console.log("LowerBody error");
        }
    });
}

function getCore() {
    $.ajax({
        url: URL + "/data",
        method: "GET",
        dataType: "json",
        success: responseJSON => {
            console.log("Conexión Exitosa");
            console.log(responseJSON.status);
            if (responseJSON.status === 200){
                responseJSON.data.forEach(element => {
                    $("#core").append(`
                    <li aria-checked="false" class="mdc-list-item" role="checkbox" id="${element.id}" name="${element.name}">
                        <span class="mdc-list-item__graphic">
                            <div class="mdc-checkbox">
                                <input class="mdc-checkbox__native-control"
                                       id="demo-list-checkbox-item-3"
                                       type="checkbox"/>
                                <div class="mdc-checkbox__background">
                                  <svg class="mdc-checkbox__checkmark"
                                       viewBox="0 0 24 24">
                                    <path class="mdc-checkbox__checkmark-path"
                                          d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                          fill="none"/>
                                  </svg>
                                  <div class="mdc-checkbox__mixedmark"></div>
                                </div>
                              </div>
                        </span>
                        <label class="mdc-list-item__text" for="demo-list-checkbox-item-3">${element.name}</label>
                    </li>
                    `)
                });
            }
        },
        error: function(err) {
            console.log("Core error");
        }
    });
}

//core isChecked
$('#core').on('change', ':checkbox', function (event) {
    event.preventDefault()
    let par = event.target.parentNode.parentNode.parentNode;
    if (this.checked) {
        par.setAttribute('isChecked', true);
    } else {
        par.removeAttribute('isChecked');
    }

});

//upperBody isChecked 
$('#upper').on('change', ':checkbox', function (event) {
    event.preventDefault();
    let par = event.target.parentNode.parentNode.parentNode;
    if (this.checked) {
        par.setAttribute('isChecked', true);
    } else {
        par.removeAttribute('isChecked');
    }

});
//lowerBody isChecked
$('#lower').on('change', ':checkbox', function (event) {
    event.preventDefault()
    let par = event.target.parentNode.parentNode.parentNode;
    if (this.checked) {
        //console.log(par);
        par.setAttribute('isChecked', true);

    } else {
        par.removeAttribute('isChecked');
    }
});

//crear rutina (verifica las casillas que se encuentren checked)
$("#createbtn").on("click", function (event) {
    console.log("createbtn");
    event.preventDefault();

    auth.onAuthStateChanged(function (user) {
        console.log("auth");
        let core = $('ul#core li');
        let upper = $('ul#upper li');
        let lower = $('ul#lower li');

        //checa valores checked del muscleType upper
        for (let i = 0; i < upper.length; i++) {
            let checkUpper = upper[i].getAttribute('isChecked');
            if (checkUpper != null) {
                console.log(upper[i].getAttribute('id'));
                let newExc = {
                    id: upper[i].getAttribute('id'),
                    name: upper[i].getAttribute('name')
                }
                excChecked.push(newExc)
            }
        }
        //checa valores checked del muscleType lower
        for (let i = 0; i < lower.length; i++) {
            let checkLower = lower[i].getAttribute('isChecked')
            //console.log(check)
            if (checkLower != null) {
                console.log(lower[i].getAttribute('id'));
                let newExc = {
                    id: lower[i].getAttribute('id'),
                    name: lower[i].getAttribute('name')
                }
                excChecked.push(newExc)
            }
        }
        //checa valores checked del muscleType core
        for (let i = 0; i < core.length; i++) {
            let checkCore = core[i].getAttribute('isChecked')
            //console.log(check)
            if (checkCore != null) {
                console.log(core[i].getAttribute('id'), '=>', core[i].getAttribute('name'));
                let newExc = {
                    id: core[i].getAttribute('id'),
                    name: core[i].getAttribute('name')
                }
                excChecked.push(newExc)
            }
        }

        //checa valores checked del muscleType lower
        for (let i = 0; i < lower.length; i++) {
            let checkLower = lower[i].getAttribute('isChecked')
            //console.log(check)
            if (checkLower != null) {
                console.log(lower[i].getAttribute('id'));
                let newExc = {
                    id: lower[i].getAttribute('id'),
                    name: lower[i].getAttribute('name'),

                }
            }
            console.log("createRoutine...")
            createRoutine(excChecked, user.uid);
        }
    });
});
function createRoutine(excercises, userid) {
    $.ajax({
        url: URL + "/data",
        method: "POST",
        data:{
            routine : {
                query : "create",
                uid: userid,
                isPrivate: true,
                excercises: excercises
            }
        },
        dataType: "json",
        success: responseJSON => {
            console.log("Conexión Exitosa");
            console.log(responseJSON.status);
            if (responseJSON.status === 200){
                //window.location.href='/home.html';
            }else{
                alert("Error");
            }
        },
        error: function(err) {
            console.log("");
        }
    });
}

getUpperBody();
getCore();
getLowerBody();
