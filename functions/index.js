const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
var firebase = require("firebase/app");
require("firebase/firestore");

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
const firestore = firebase.firestore();
let excercisesRef = firestore.collection('Excercises');
let routinesRef = firestore.collection ('Routines');



//===============================================================================================
//===============================================================================================
exports.register = functions.https.onRequest((request, response) => {
    console.log("BODY => ");
    console.log(request.body);
    console.log("QUERY => ");
    console.log(request.query);
    console.log("PARAMS => ");
    console.log(request.params);
    cors(request, response, () => {
        return processRequest(request, response);
    });
});
//===============================================================================================
//===============================================================================================
exports.query = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log("BODY => ");
        console.log(request.body.uid);
        console.log("QUERY => ");
        console.log(request.query.uid);
        console.log("PARAMS => ");
        console.log(request.params.uid);
        console.log(request.method);
        return processQueryRequest(request, response );
    });
});
//===============================================================================================
//===============================================================================================
exports.data = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log("Data BODY => ");
        console.log(request.body);
        console.log(request.method);
        return processDataRequest(request, response ,request.method);
    });
});
//===============================================================================================
function processRequest(request, response) {
    let userregistered = request.body.user;
    return new Promise((resolve, reject) => {
        firestore.collection('Users').doc(`${userregistered.uid}`).set({
            username: userregistered.username,
            email: userregistered.mail,
            uid: userregistered.uid,
        }).then(() => {
            console.log("Document successfully written!");
            setUpperBody(userregistered.uid);
            setLowerBody(userregistered.uid);
            setCore(userregistered.uid);
            return response.status(200).send({
                statusMessage: 'Usuario Registrado',
                status: 200
            });
        }).catch(error => {
            console.error("Error writing document: ", error);
            return response.status(400).send({
                statusMessage: 'Usuario No Registrado',
                status: 400
            });
        });
        resolve();
    })
}
//===============================================================================================
function processQueryRequest(request, response) {
    let uid = request.query.uid;
    return new Promise((resolve, reject) => {
        firestore.collection('Users').doc(`${uid}`)
            .collection("Muscles").get()
            .then(snapshot => {
                console.log("getMusclesRequest");
                if (!snapshot.empty) {
                    let array = [];
                    snapshot.forEach(doc => {
                        array.push(doc.data())
                    });
                    return response.status(200).send({
                        statusMessage: 'Usuario Registrado',
                        status: 200,
                        data : array
                    });
                }
                console.log('No matching documents. :(');
                return;
            })
            .catch(error => {
                console.error("Error writing document: ", error);
                return response.status(300).send({
                    statusMessage: 'Usuario No Registrado',
                    status: 400,
                    data : []
                });
            });
        resolve();
    })
}
//===============================================================================================
function processDataRequest(request, response, method) {
    console.log("processDataRequest()");
    if(method === "POST"){
        let data = request.body.routine;
        console.log("data");
        console.log(data);

        createRoutine(data)
    }else{
        getUpperBody(response);
        getLowerBody(response);
        getCore(response);
    }
}
function createRoutine(data){
    console.log("createRoutine()");
    routinesRef.doc().set(data);
}

function getUpperBody(response){
    return new Promise((resolve, reject) => {
        excercisesRef.where('muscleType', '==', 'upperBody').get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return response.status(200).send({
                        statusMessage: 'Muscle type, not found',
                        status: 300
                    });
                }
                let arr = []
                snapshot.forEach(doc => {
                    let name = doc.data().name;
                    let id = doc.data().id;
                    arr.push({
                        id:id,
                        name: name
                    })
                });
                return response.status(200).send({
                    statusMessage: 'Muscle type, UpperBody',
                    status: 200,
                    data : arr
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    })
}

function getLowerBody(response){
    return new Promise((resolve, reject) => {
        excercisesRef.where('muscleType', '==', 'lowerBody').get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return response.status(200).send({
                        statusMessage: 'Muscle type, not found',
                        status: 300
                    });
                }
                let arr = []
                snapshot.forEach(doc => {
                    let name = doc.data().name;
                    let id = doc.data().id;
                    arr.push({
                        id:id,
                        name: name
                    })
                });
                return response.status(200).send({
                    statusMessage: 'Muscle type, LowerBody',
                    status: 200,
                    data : arr
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    })
}

function getCore(response){
    console.log("getCore()");
    return new Promise((resolve, reject) => {
        excercisesRef.where('muscleType', '==', 'core').get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return response.status(200).send({
                        statusMessage: 'Muscle type, not found',
                        status: 300
                    });
                }
                let arr = []
                snapshot.forEach(doc => {
                    let name = doc.data().name;
                    let id = doc.data().id;
                    arr.push({
                        id:id,
                        name: name
                    })
                });
                return response.status(200).send({
                    statusMessage: 'Muscle type, Core',
                    status: 200,
                    data : arr
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    })
}
//===============================================================================================
function setUpperBody(userid) {
    const exersicesReference = firestore.collection("Excercises");
    exersicesReference.where('muscleType', '==', 'upperBody').get()
        .then(snapshot => {
            console.log("setUpperBody_snap");
            if (!snapshot.empty) {
                let array = [];
                snapshot.forEach(doc => {
                    var data = doc.data();
                    data.weight = 10;
                    data.unit = "lbs";
                    array.push(data)
                });
                const obj = Object.assign({}, array); // {0:"a", 1:"b", 2:"c"}
                firestore.collection("Users").doc(`${userid}`).collection("Muscles")
                    .doc("upperBody").set(obj);
            }
            console.log('No matching documents.');
            return;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

function setLowerBody(userid) {
    const exersicesReference = firestore.collection("Excercises");
    exersicesReference.where('muscleType', '==', 'lowerBody').get()
        .then(snapshot => {
            console.log("setLowerBody_snap");
            if (!snapshot.empty) {
                let array = [];
                snapshot.forEach(doc => {
                    var data = doc.data();
                    data.weight = 30;
                    data.unit = "lbs";
                    array.push(data)
                });
                const obj = Object.assign({}, array); // {0:"a", 1:"b", 2:"c"}
                firestore.collection("Users").doc(`${userid}`).collection("Muscles")
                    .doc("lowerBody").set(obj);
                return;
            }
            console.log('No matching documents.');
            return;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

function setCore(userid) {
    const exersicesReference = firestore.collection("Excercises");
    exersicesReference.where('muscleType', '==', 'core').get()
        .then(snapshot => {
            console.log("setCore_snap");
            if (!snapshot.empty) {
                let array = [];
                snapshot.forEach( (doc) => {
                    var data = doc.data();
                    data.weight = 0;
                    data.unit = "lbs";
                    array.push(data)
                });
                const obj = Object.assign({}, array); // {0:"a", 1:"b", 2:"c"}
                firestore.collection("Users").doc(`${userid}`).collection("Muscles")
                    .doc("core").set(obj);
                return;
            }
            console.log('No matching documents.');
            return;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}
