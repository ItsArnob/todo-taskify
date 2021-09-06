import { initializeApp } from "firebase/app";

let firebaseConfig = {
    apiKey: "AIzaSyDBIPnWyGD2vMN1icQXOxDzekO4hMtD1CQ",
    authDomain: "that-one-todo-tasks-app.firebaseapp.com",
    projectId: "that-one-todo-tasks-app",
    storageBucket: "that-one-todo-tasks-app.appspot.com",
    messagingSenderId: "464887335229",
    appId: "1:464887335229:web:938fbb7bfe288a76d65d54",
};
if (import.meta.env.DEV) {
    firebaseConfig = {
        apiKey: "AIzaSyAik-HqME6jzUan9DT2BuVyIsfCJ-EVY_4",
        authDomain: "messign-around-27f71.firebaseapp.com",
        projectId: "messign-around-27f71",
        storageBucket: "messign-around-27f71.appspot.com",
        messagingSenderId: "367984939791",
        appId: "1:367984939791:web:bed65b0c188852fbf9a47a",
    };
}

const firebaseApp = initializeApp(firebaseConfig);
/* The emulators were too heavy */

/*(async function () {
    if (import.meta.env.DEV) {
        const { connectAuthEmulator, getAuth } = await import("firebase/auth");
        const { connectFirestoreEmulator, getFirestore } = await import("firebase/firestore");
        connectAuthEmulator(getAuth(), "http://localhost:9099");
        connectFirestoreEmulator(getFirestore(), "localhost", 8080);
    }
})();
*/
