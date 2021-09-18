<template>
    <div
        class="
            mt-7
            transition
            duration-200
            bg-black bg-opacity-30
            w-full
            rounded-lg
            py-4
            px-6
            border-2
            dark:border-gray-700 dark:border-opacity-70
            border-opacity-40
            backdrop-filter backdrop-blur-[6px]
            flex flex-col
        "
    >
        <template
            v-if="todoDoc && todoDoc != 'not-found' && todoDoc != 'failedFetch'"
        >
            <template v-if="edit"> Editing is not yet supported. </template>
            <template v-else>
                <h1 class="text-2xl text-center font-semibold break-words">
                    {{ todoDoc.name }}
                </h1>
                <h3 class="mt-6 font-medium">NOTE</h3>
                <p
                    class="
                        transition
                        duration-200
                        p-2
                        break-words
                        rounded
                        border-[1.5px] border-gray-300/50
                        bg-gray-700/30
                        dark:border-gray-600 dark:bg-gray-700/40
                    "
                >
                    <span v-if="todoDoc.note">
                        {{ todoDoc.note }}
                    </span>

                    <span class="italic text-gray-400" v-else>
                        No note added.
                    </span>
                </p>
                <h3 class="font-medium mt-2">DATES</h3>
                <p
                    class="
                        transition
                        duration-200
                        p-2
                        break-words
                        rounded
                        border-[1.5px] border-gray-300/50
                        bg-gray-700/30
                        dark:border-gray-600 dark:bg-gray-700/40
                    "
                >
                    This list was created at
                    <span class="font-semibold">{{ createdAt }} </span>

                    <template v-if="dueBy">
                        and is due by
                        <span class="font-semibold">{{ dueBy }}</span
                        >.
                    </template>
                    <template v-else>.</template>
                </p>
            </template>
            <h2 class="mt-4 text-center font-semibold text-xl">Todo items:</h2>
            <form
                class="mt-3 flex w-full"
                @submit.prevent="validate"
                novalidate="true"
            >
                <div class="relative flex-grow">
                    <input
                        id="name"
                        :value="formData.name"
                        @input="(event) => (formData.name = event.target.value)"
                        class="
                            transition-color
                            duration-200
                            bg-transparent
                            peer
                            h-10
                            w-full
                            border-b-2 border-gray-400 border-opacity-50
                            placeholder-transparent
                            outline-none
                            focus:border-opacity-70 focus:border-rose-400
                        "
                        placeholder="Item name"
                    />

                    <label
                        for="name"
                        class="
                            absolute
                            left-0
                            -top-3.5
                            text-gray-200 text-sm
                            transition-all
                            peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-200
                            peer-placeholder-shown:text-opacity-80
                            peer-placeholder-shown:top-2
                            peer-focus:-top-3.5
                            peer-focus:text-gray-200
                            peer-focus:text-sm
                        "
                    >
                        Item name
                        <span
                            v-show="error.name"
                            :class="{
                                ' text-rose-400 dark:text-red-500': error.name,
                            }"
                            >({{ error.name }})</span
                        >
                    </label>
                </div>
                <button
                    :disabled="addItemBtn.loading"
                    class="
                        disabled:opacity-70
                        transition
                        duration-75
                        ml-2
                        rounded
                        bg-rose-500
                        hover:bg-rose-400
                        text-white text-center
                        focus:outline-none focus:ring focus:ring-rose-300
                        grid grid-cols-1
                        cursor-pointer
                    "
                >
                    <transition name="fade">
                        <loadingIcon
                            class="
                                w-6
                                h-6
                                m-2
                                left-0
                                text-white
                                row-start-1
                                col-start-1
                            "
                            v-if="addItemBtn.loading"
                        />
                        <CheckCircleOutlineIcon
                            class="
                                w-6
                                m-2
                                left-0
                                text-green-400
                                row-start-1
                                col-start-1
                            "
                            v-else-if="addItemBtn.done"
                        />
                        <PlusCircleIcon
                            v-else
                            class="w-6 m-2 row-start-1 col-start-1"
                        />
                    </transition>
                </button>
            </form>
            <div class="mt-6 relative">
                <transition-group name="list">
                    <div
                        v-for="item in todoDoc.items"
                        :key="item.id"
                        @click="markItem(item.id)"
                        class="
                            transition
                            duration-200
                            p-2
                            break-words
                            rounded
                            border-[1.5px] border-gray-300/50
                            bg-gray-700/30
                            dark:border-gray-600 dark:bg-gray-700/40
                            mb-2
                            flex
                            items-center
                            w-full
                        "
                    >
                        <div class="grid grid-cols-1 min-w-[1.5rem]">
                            <transition name="fadeItems">
                                <CheckCircleIcon
                                    v-if="item.done"
                                    class="
                                        w-6
                                        min-w-[1.5rem]
                                        cursor-pointer
                                        text-green-400
                                        row-start-1
                                        col-start-1
                                    " />
                                <loadingIcon
                                    v-else-if="item.loading"
                                    class="
                                        row-start-1
                                        col-start-1
                                        w-6
                                        h-6
                                        block
                                        min-w-[1.5rem]
                                        cursor-pointer
                                    " />
                                <svg
                                    v-else
                                    class="
                                        row-start-1
                                        col-start-1
                                        w-6
                                        block
                                        min-w-[1.5rem]
                                        cursor-pointer
                                    "
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="white"
                                        stroke-width="1"
                                        fill="none"
                                    /></svg
                            ></transition>
                        </div>
                        <p
                            :class="{
                                'strike italic text-gray-300': item.done,
                            }"
                            class="text-lg ml-2 break-words -200"
                        >
                            {{ item.name }}
                        </p>
                        <div class="ml-auto flex">
                            <button @click.stop="editItem(item.id)">
                                <PencilIcon
                                    class="
                                        w-6
                                        h-6
                                        mr-2
                                        text-gray-400
                                        hover:text-yellow-500
                                    "
                                />
                            </button>
                            <button
                                @click.stop="deleteItem(item.id)"
                                :disabled="item.loading"
                            >
                                <TrashIcon
                                    class="w-6 text-gray-400 hover:text-red-400"
                                />
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </template>
        <template v-else-if="todoDoc == 'failedFetch'">
            <h1 class="text-lg">
                Something went wrong while trying to load this list, make sure
                you're connected to the internet.
            </h1>
        </template>
        <template v-else-if="todoDoc == 'not-found'">
            <h1 class="text-lg">
                The todo list you're looking for doesn't exist! maybe you've
                deleted it from another browser/tab.
            </h1>
        </template>
        <template v-else>
            <loadingIcon class="w-12 mx-auto text-white" />
        </template>
        <errorPopup :name="popupError.name" :hide="popupError.hide" />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
    PlusCircleIcon,
    CheckCircleIcon as CheckCircleOutlineIcon,
} from "@heroicons/vue/outline";
import { CheckCircleIcon, TrashIcon, PencilIcon } from "@heroicons/vue/solid";
import loadingIcon from "../components/loadingIcon.vue";
import errorPopup from "../components/errorPopup.vue";
import {
    getFirestore,
    getDoc,
    doc,
    updateDoc,
    serverTimestamp,
    deleteField,
} from "firebase/firestore";
export default {
    props: ["id", "edit"],
    components: {
        PlusCircleIcon,
        loadingIcon,
        CheckCircleIcon,
        CheckCircleOutlineIcon,
        errorPopup,
        TrashIcon,
        PencilIcon,
    },
    data() {
        return {
            popupError: {
                name: undefined,
                hide: true,
            },
            formData: {
                name: "",
            },
            error: {
                name: "",
            },
            addItemBtn: {
                loading: false,
                done: false,
            },
            todoDoc: undefined,
            todoItems: [],
        };
    },
    setup() {
        const db = getFirestore();
        return { db };
    },
    mounted() {
        const docRef = doc(this.db, `Users/${this.userId}/TodoList/${this.id}`);
        getDoc(docRef)
            .then((doc) => {
                if (!doc.exists()) {
                    this.todoDoc = "not-found";
                    this.$store.dispatch("deleteList", this.id);
                } else {
                    this.todoDoc = doc.data();

                    delete this.todoDoc?.items?.meta;
                    this.todoDoc.items
                        ? (this.todoDoc.items = Object.values(
                              this.todoDoc.items
                          ).sort(
                              (a, b) =>
                                  b.createdAt.seconds - a.createdAt.seconds
                          ))
                        : (this.todoDoc.items = []);
                }
            })
            .catch((err) => {
                console.log(err);
                this.todoDoc = "failedFetch";
            });
    },
    methods: {
        randomId() {
            const chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let id = "";
            for (let i = 0; i < 20; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        validate() {
            this.formData.name = this.formData.name?.trim();
            if (!this.formData.name) {
                this.error.name = "Please enter a name";
                this.clearNameError();
            } else {
                let payload = {
                    id: this.randomId(),
                    name: this.formData.name,
                    done: false,
                    createdAt: serverTimestamp(),
                };

                this.addItem(payload);
            }
        },
        addItem(payload) {
            this.addItemBtn.loading = true;
            const docRef = doc(
                this.db,
                `Users/${this.userId}/TodoList/${this.id}`
            );
            updateDoc(docRef, {
                [`items.${payload.id}`]: payload,
                [`items.meta.id`]: "modify",
            })
                .then((a) => {
                    this.todoDoc.items.unshift(payload);
                    this.formData.name = "";
                    this.addItemBtn.loading = false;
                    this.addItemBtn.done = true;
                    this.revertAddButtonIcon();
                })
                .catch((e) => {
                    console.log(e);
                    this.addItemBtn.loading = false;
                    if (e.code == "not-found") {
                        this.$store.dispatch("deleteList", this.id);
                        this.popupError.name =
                            "This list has already been deleted from another tab/browser and thus you can't update it.";
                    } else
                        this.popupError.name =
                            "Oops! something went wrong. Please try again in a bit.";

                    this.popupError.hide = false;
                    setTimeout(() => (this.popupError.hide = true), 4000);
                });
        },
        revertAddButtonIcon() {
            let a;
            const disableWatcher = this.$watch(
                () => this.formData.name,
                () => {
                    this.addItemBtn.done = false;
                    disableWatcher();
                    clearTimeout(a);
                }
            );
            a = setTimeout(() => {
                this.addItemBtn.done = false;
                disableWatcher();
            }, 2000);
        },
        clearNameError() {
            const disableWatcher = this.$watch(
                () => this.formData.name,
                () => {
                    this.error.name = "";
                    disableWatcher();
                }
            );
        },
        markItem(id) {
            const index = this.todoDoc.items.findIndex((item) => item.id == id);
            const item = this.todoDoc.items[index];
            item.loading = true;
            if (!item.done) {
                // mark as done

                const docRef = doc(
                    this.db,
                    `Users/${this.userId}/TodoList/${this.id}`
                );
                updateDoc(docRef, {
                    [`items.${id}.done`]: true,
                    [`items.meta.id`]: id,
                })
                    .then((a) => {
                        item.loading = false;
                        item.done = true;
                    })
                    .catch((e) => {
                        item.loading = false;
                        if (e.code == "permission-denied") {
                            this.popupError.name =
                                "Failed to change the status of this item. Maybe you've deleted this item/list from another tab/browser.";
                        } else
                            this.popupError.name = `Unknown error occurred: ${e.code}. Please try again in a bit.`;
                        this.popupError.hide = false;
                        setTimeout(() => (this.popupError.hide = true), 4000);
                    });
            } else {
                item.done = false;
                const docRef = doc(
                    this.db,
                    `Users/${this.userId}/TodoList/${this.id}`
                );
                updateDoc(docRef, {
                    [`items.${id}.done`]: false,
                    [`items.meta.id`]: id,
                })
                    .then((a) => {
                        item.loading = false;
                    })
                    .catch((e) => {
                        item.loading = false;
                        item.done = true;
                        if (e.code == "permission-denied") {
                            this.popupError.name =
                                "Failed to change the status of this item. Maybe you've deleted this item/list from another tab/browser.";
                        } else
                            this.popupError.name = `Unknown error occurred: ${e.code}. Please try again in a bit`;
                        this.popupError.hide = false;
                        setTimeout(() => (this.popupError.hide = true), 4000);
                    });
            }
        },
        editItem(id) {
            alert("haha no.");
        },
        deleteItem(id) {
            const index = this.todoDoc.items.findIndex((item) => item.id == id);
            const item = this.todoDoc.items[index];
            item.loading = true;
            let orItemStatus = item.done;
            item.done = false;
            const docRef = doc(
                this.db,
                `Users/${this.userId}/TodoList/${this.id}`
            );
            updateDoc(docRef, {
                [`items.${id}`]: deleteField(),
                [`items.meta.id`]: "modify",
            })
                .then(() => {
                    this.todoDoc.items.splice(index, 1);
                })
                .catch((e) => {
                    item.loading = false;
                    item.done = orItemStatus;
                    this.popupError.name = `Unknown error occurred: ${e.code}. Please try again in a bit.`;
                    this.popupError.hide = false;
                    setTimeout(() => (this.popupError.hide = true), 4000);
                });
        },
    },
    computed: {
        ...mapGetters(["allTodoItems", "userId"]),
        dueBy() {
            let dueByDate = this.todoDoc.dueBy;
            if (!dueByDate) return;
            dueByDate = new Date(dueByDate.seconds * 1000);
            const options = {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            };
            new Date().getYear() == dueByDate.getYear()
                ? ""
                : (options["year"] = "numeric");
            return dueByDate.toLocaleString("default", options);
        },
        createdAt() {
            let createdDate = this.todoDoc.createdAt;
            if (!createdDate) return;
            createdDate = new Date(createdDate.seconds * 1000);
            const options = {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            };
            new Date().getYear() == createdDate.getYear()
                ? ""
                : (options["year"] = "numeric");
            return createdDate.toLocaleString("default", options);
        },
    },
};
</script>

<style scoped>
.list-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.list-leave-active {
    position: absolute;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}
.fadeItems-leave-active,
.fadeItems-enter-active {
    transition: opacity 0.1s linear;
}
.fade-enter-from,
.fade-leave-to,
.fadeItems-leave-to,
.fadeItems-enter-from {
    opacity: 0;
}
@keyframes strike {
    from {
        text-decoration-color: transparent;
    }
    to {
        text-decoration-color: auto;
    }
}
.strike {
    text-decoration: line-through;
    animation: strike 0.2s linear;
}
</style>
