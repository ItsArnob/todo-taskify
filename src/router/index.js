import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/index.vue";
import homeActive from "../views/home/active.vue";
import homeDone from "../views/home/done.vue";
import store from "../store";
const routes = [
    {
        path: "/",
        component: Home,
        children: [
            {
                path: "",
                name: "Home",
                component: homeActive,
            },
            {
                path: "done",
                name: "HomeDone",
                component: homeDone,
            },
            {
                path: "create",
                name: "HomeCreate",
                component: () => import("../views/home/create.vue"),
            },
            {
                path: "todo/:id",
                name: "TodoList",
                component: () => import("../views/todo.vue"),
                props: (route) => ({
                    edit: route.query.edit,
                    id: route.params.id,
                }),
            },
        ],
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/about.vue"),
    },
    {
        path: "/privacy",
        name: "Privacy",
        component: () => import("../views/privacy.vue"),
    },
    {
        path: "/signin",
        name: "SignIn",
        component: () => import("../views/signin.vue"),
    },
    {
        path: "/signup",
        name: "SignUp",
        component: () => import("../views/signin.vue"),
        props: { signUp: true },
    },
];
const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from) => {
    console.log(store.state);
    if (store.state.userAccount.exists) {
        switch (to.path) {
            case "/signup":
            case "/signin":
                return "/";
                break;
        }
    } else {
        switch (to.path) {
            case "/done":
            case "/create":
                return "/";
                break;
        }
    }
});

export default router;
