const admin = require('firebase-admin');
const serviceAccount = require('./firebase-credentials.json'); // Ruta al archivo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };