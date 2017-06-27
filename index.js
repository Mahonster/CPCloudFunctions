const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.testFirebase = functions.database.ref('/2017/v1test/events/{eventId}/isComplete')
        .onWrite(event => {
        const original = event.data.val();
        const eventId = event.params.eventId;

        if(original == 'true') {
            console.log("Fetching pick for event id: ", eventId);
            getResults(eventId);
        }
        else {
            return;
        }
        return;
        console.log('Testing Firebase with ', original);
        //return event.data.ref.child('metaTEST').set('Wow!!!');
        });

var getResults = function (eventId) {
    //Fetch list of picks for eventId
    admin.database().ref("2017/v1test/picks/" + eventId).once('value', (snapshot) => {
        var picks = snapshot.val();
        console.log('Here we go baby: ', picks);
        return;
    });
}


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
