const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const createUserProfile = functions.auth.user().onCreate((user) => {
    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName;
    const account = {
        uid,
        email,
        displayName,
        jobs: []
    }
    return admin.firestore().collection('accounts').add(account);
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

module.exports = createUserProfile;
