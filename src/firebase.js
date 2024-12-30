var admin = require("firebase-admin");

// import admin from "firebase-admin";

// make admin in a variable


import serviceAccount from "./kaitalk-4517d-firebase-adminsdk-oc9u1-c93d461cac.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
