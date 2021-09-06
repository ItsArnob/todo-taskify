import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userAccount: { exists: false },
            todoLists: {
                loaded: false,
                lists: [],
            },
        };
    },
    mutations: {
        SET_USER(state, userCreds) {
            if (userCreds) {
                state.userAccount = { exists: true, ...userCreds };
            } else {
                state.userAccount = { exists: false };
            }
        },
        ADD_TODOLIST(state, todoListData) {
            state.todoLists.lists.unshift(todoListData);
        },
        SET_TODOLISTS_STATUS(state, status) {
            state.todoLists.loaded = status;
        },
        MARK_AS_DONE(state, id) {
            const index = state.todoLists.lists.findIndex(
                (list) => list.id == id
            );
            state.todoLists.lists[index].status = "done";
        },
        MARK_AS_ACTIVE(state, id) {
            const index = state.todoLists.lists.findIndex(
                (list) => list.id == id
            );
            state.todoLists.lists[index].status = "active";
        },
        DELETE_TODO_LIST(state, id) {
            const index = state.todoLists.lists.findIndex(
                (list) => list.id == id
            );
            if (index == -1) return;
            state.todoLists.lists.splice(index, 1);
        },
        CLEAR_TODO_LIST(state) {
            state.todoLists.lists = [];
        },
    },
    actions: {
        setUser({ commit }, userCreds) {
            commit("SET_USER", userCreds);
        },
        addTodoList({ commit }, todoListData) {
            commit("ADD_TODOLIST", todoListData);
        },
        setTodoListsStatus({ commit }, status) {
            commit("SET_TODOLISTS_STATUS", status);
        },
        markDone({ commit }, id) {
            commit("MARK_AS_DONE", id);
        },
        markActive({ commit }, id) {
            commit("MARK_AS_ACTIVE", id);
        },
        deleteList({ commit }, id) {
            commit("DELETE_TODO_LIST", id);
        },
        clearTodoList({ commit }) {
            commit("CLEAR_TODO_LIST");
        },
    },
    getters: {
        user(state) {
            return state.userAccount;
        },
        userId(state) {
            return state.userAccount.uid;
        },
        userShouldHaveAccess(state) {
            return (
                state.userAccount.exists &&
                (state.userAccount.emailVerified ||
                    state.userAccount.isAnonymous)
            );
        },
        getTodoListById: (state) => (id) => {
            return state.todoLists.lists.find((todo) => todo.id === id);
        },
        allTodoLists: (state) => {
            return state.todoLists.lists;
        },
        allActiveTodoLists: (state) => {
            return state.todoLists.lists.filter(
                (list) => list.status == "active"
            );
        },
        allDoneTodoLists: (state) => {
            return state.todoLists.lists.filter(
                (list) => list.status == "done"
            );
        },
        allTodoItems: (state) => (id) => {
            let list = state.todoLists.lists.find((todo) => todo.id === id);
            return list.items;
        },
        todoListsLoaded: (state) => {
            return state.todoLists.loaded;
        },
    },
});
export default store;
