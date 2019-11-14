const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
var admin = require("firebase-admin");
admin.initializeApp({
    apiKey: "AIzaSyCMQfCVoDb2eiuXHACCUX66TO_6v4XFTF0",
    authDomain: "gymproject-9f46b.firebaseapp.com",
    databaseURL: "https://gymproject-9f46b.firebaseio.com",
    projectId: "gymproject-9f46b",
    storageBucket: "gymproject-9f46b.appspot.com",
    messagingSenderId: "585009595190",
    appId: "1:585009595190:web:cad18d95185a486bf1e997",
    measurementId: "G-TSWB8RLHM9"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.register = functions.https.onRequest( (request, response) => {
    console.log("BODY => ");
    console.log(request.body);

    console.log("QUERY => ");
    console.log(request.query);

    console.log("PARAMS => ");
    console.log(request.params);

    cors(request, response, () => {
        /*if (!request.body.queryResult){
        console.log('Invalid Request');
        return response.status(400).end('Invalid Request.');
    } else {*/
        processRequest(request, response);
        //}
    });
});

function processRequest(request, response){
    response.status(200).send({test: 'Conexion Exitosa'});

}
