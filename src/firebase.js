import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { privateKey } from "./private";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: privateKey,
  authDomain: "crudlibros-c76f2.firebaseapp.com",
  projectId: "crudlibros-c76f2",
  storageBucket: "crudlibros-c76f2.appspot.com",
  messagingSenderId: "135537415084",
  appId: "1:135537415084:web:e60c050613e1492ad6e009"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export {db};