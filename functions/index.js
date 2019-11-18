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

exports.register = functions.https.onRequest((request, response) => {
    console.log("BODY => ");
    console.log(request.body);
    console.log("QUERY => ");
    console.log(request.query);
    console.log("PARAMS => ");
    console.log(request.params);
    cors(request, response, () => {
        if ((request.body || request.query || request.params)) {
            return processRequest(request, response);
        } else {
            console.log('Invalid Request');
            return response.status(400).end('Invalid Request.');
        }
    });
});

function processRequest(request, response) {
    let userregistered = request.body.user;
    return new Promise((resolve, reject) => {
        firestore.collection('Users').doc(`${userregistered.uid}`).set({
            username: userregistered.username,
            email: userregistered.mail,
            uid: userregistered.uid
        }).then(() => {
            console.log("Document successfully written!");
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



exports.home = functions.https.onRequest((request, response) => {
    console.log("BODY => ");
    console.log(request.body);
    console.log("QUERY => ");
    console.log(request.query);
    console.log("PARAMS => ");
    console.log(request.params);
    cors(request, response, () => {
        if ((request.body || request.query || request.params)) {
            return processHomeRequest(request, response);
        } else {
            console.log('Invalid Request');
            return response.status(400).end('Invalid Request.');
        }
    });
});

function processHomeRequest(request, response) {
    return response.status(200).send({
        statusMessage: 'Hola',
        status: 200
    });
}