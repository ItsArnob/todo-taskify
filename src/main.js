import { createApp, reactive } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore,
    getDocs,
    query,
    collection,
    orderBy,
} from "firebase/firestore";
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";
import store from "./store";
import "./firebase";
const auth = getAuth();
let app;

/* 🦀 🦀 🦀 CRAB IN THE CODE 🦀 🦀 🦀 */

if (import.meta.env.DEV) {
    import("eruda").then((eruda) => eruda.init());
}
/* TODO: initialize firebase after vue with loading animation */
onAuthStateChanged(auth, (User) => {
    store.dispatch("setUser", User);
    const db = getFirestore();
    if (store.getters.userShouldHaveAccess) {
        getDocs(
            query(
                collection(db, `Users/${store.getters.userId}/TodoList`),
                orderBy("createdAt")
            )
        )
            .then((docs) => {
                store.dispatch("setTodoListsStatus", true);
                docs.forEach((doc) => {
                    const { createdAt, status, name, note, dueBy } = doc.data();
                    store.dispatch("addTodoList", {
                        id: doc.id,
                        createdAt,
                        status,
                        name,
                        note,
                        dueBy,
                    });
                });
            })
            .catch((err) => alert(err.code));
    }
    if (!app) {
        app = createApp(App);
        app.use(store);
        app.use(router);
        app.mount("#app");
    }
});
