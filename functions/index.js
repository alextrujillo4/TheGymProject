const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest( (request, response) => {
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
