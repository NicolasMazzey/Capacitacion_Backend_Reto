const admin = require('firebase-admin');
const serviceAccount = require('../nodefirebase-test-firebase-adminsdk-fbsvc-398e0824b8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;