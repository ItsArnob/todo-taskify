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
        <h1 class="text-2xl text-center mt-2 font-semibold">
            Create a todo list
        </h1>
        <form class="mt-4" @submit.prevent="validate" novalidate="true">
            <div class="relative">
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
                    placeholder="List name"
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
                    List name
                    <span
                        v-show="error.name"
                        :class="{
                            ' text-rose-400 dark:text-red-500': error.name,
                        }"
                        >({{ error.name }})</span
                    >
                </label>
            </div>
            <div class="flex mt-10 content-between">
                <div class="flex w-full">
                    <div class="relative w-full">
                        <input
                            id="dueDate"
                            :value="formData.dueDate"
                            type="date"
                            :min="currentDate"
                            @input="
                                (event) =>
                                    (formData.dueDate = event.target.value)
                            "
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
                            placeholder="Due by"
                        />

                        <label
                            for="dueDate"
                            class="
                                absolute
                                left-0
                                -top-3.5
                                text-gray-200 text-sm
                                transition-all
                                peer-focus:text-sm
                            "
                        >
                            Due by (Optional)
                        </label>
                        <p
                            v-if="!formData.dueDate"
                            class="
                                absolute
                                top-2
                                text-gray-200 text-opacity-80
                                pointer-events-none
                            "
                        >
                            Date
                            <span
                                v-show="error.dueDate"
                                class="text-rose-400 dark:text-red-500"
                                >({{ error.dueDate }})</span
                            >
                        </p>
                    </div>

                    <div class="relative w-full ml-1">
                        <input
                            :value="formData.dueTime"
                            type="time"
                            @input="
                                (event) =>
                                    (formData.dueTime = event.target.value)
                            "
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
                        />
                        <p
                            v-if="!formData.dueTime"
                            class="
                                absolute
                                top-2
                                text-gray-200 text-opacity-80
                                pointer-events-none
                            "
                        >
                            Time
                            <span
                                v-show="error.dueTime"
                                class="text-rose-400 dark:text-red-500"
                                >({{ error.dueTime }})</span
                            >
                        </p>
                    </div>
                </div>
                <!-- TODO: enable this once notifications are supported 
                <div class="flex w-full ml-3">
                    <div class="relative w-full">
                        <input
                            id="remindMeDate"
                            :value="formData.remindMeDate"
                            type="date"
                            @input="
                                (event) =>
                                    (formData.remindMeDate = event.target.value)
                            "
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
                        />

                        <label
                            for="remindMeDate"
                            class="
                                absolute
                                left-0
                                -top-3.5
                                text-gray-200 text-sm
                                transition-all
                            "
                        >
                            Remind me on
                            <span
                                v-show="error.title"
                                :class="{
                                    ' text-rose-400 dark:text-red-500':
                                        error.title,
                                }"
                                >({{ error.title }})</span
                            >
                        </label>
                    </div>

                    <div class="relative w-full ml-1">
                        <input
                            :value="formData.remindMeTime"
                            type="time"
                            @input="
                                (event) =>
                                    (formData.remindMeTime = event.target.value)
                            "
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
                        />
                    </div>
                </div> -->
            </div>
            <div class="relative mt-10">
                <textarea
                    id="note"
                    :value="formData.note"
                    @input="(event) => onInput(event)"
                    class="
                        transition-color
                        duration-200
                        bg-transparent
                        peer
                        h-[36px]
                        w-full
                        border-b-2 border-gray-400 border-opacity-50
                        placeholder-transparent
                        outline-none
                        focus:border-opacity-70 focus:border-rose-400
                    "
                    placeholder="Note"
                ></textarea>

                <label
                    for="note"
                    class="
                        transition-all
                        absolute
                        left-0
                        -top-5
                        text-gray-200 text-sm
                        transition-color
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-200
                        peer-placeholder-shown:text-opacity-80
                        peer-placeholder-shown:top-1
                        peer-focus:-top-5
                        peer-focus:text-gray-200
                        peer-focus:text-sm
                    "
                >
                    Note
                    <span
                        v-show="error.note"
                        :class="{
                            ' text-rose-400 dark:text-red-500': error.note,
                        }"
                        >({{ error.note }})</span
                    >
                </label>
            </div>
            <button
                type="submit"
                :disabled="submitButtonDisabled"
                class="
                    disabled:opacity-70
                    transition
                    duration-75
                    mt-14
                    px-4
                    py-2
                    rounded
                    bg-rose-500
                    hover:bg-rose-400
                    text-white
                    font-semibold
                    text-center
                    w-full
                    focus:outline-none
                    focus:ring
                    focus:ring-offset-2
                    focus:ring-rose-500
                    focus:ring-offset-rose-300
                    focus:ring-opacity-80
                    cursor-pointer
                    flex
                "
            >
                <div class="relative w-full">
                    <loadingIcon
                        :class="{ 'opacity-0': !loading.start }"
                        class="
                            transition
                            duration-300
                            absolute
                            left-0
                            w-6
                            h-6
                            text-white
                        "
                    />
                    <CheckCircleIcon
                        :class="{ 'text-transparent': !loading.done }"
                        class="
                            transition
                            duration-300
                            absolute
                            m-0
                            left-0
                            w-6
                            text-green-400
                        "
                    />
                    <div class="flex w-full">
                        <div class="mx-auto flex">
                            <PlusCircleIcon class="w-5 mr-2" />
                            Create todo list
                        </div>
                    </div>
                </div>
            </button>
        </form>
    </div>
</template>
<script>
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/vue/outline";
import {
    getFirestore,
    collection,
    setDoc,
    doc,
    Timestamp,
    serverTimestamp,
} from "firebase/firestore";
import isEmail from "validator/es/lib/isEmail";
import loadingIcon from "../../components/loadingIcon.vue";
export default {
    data() {
        return {
            submitButtonDisabled: false,
            currentDate: "",
            loading: {
                start: false,
                done: false,
            },
            error: {
                name: "",
                note: "",
                dueDate: "",
                dueTime: "",
            },
            formData: {
                name: "",
                dueDate: "",
                dueTime: "",
                note: "",
            },
        };
    },
    components: {
        CheckCircleIcon,
        loadingIcon,
        PlusCircleIcon,
    },
    setup() {
        const db = getFirestore();
        return { db };
    },
    created() {
        this.currentDate = new Date().toISOString().substr(0, 10);
    },
    methods: {
        validate() {
            this.formData.name = this.formData.name?.trim();
            this.formData.note = this.formData.note?.trim();
            if (!this.formData.name) {
                this.error.name = "Please enter a name";
                this.clearNameError();
            } else if (this.formData.dueDate && !this.formData.dueTime) {
                this.error.dueTime = "Required";
                this.clearDueTimeError();
            } else if (!this.formData.dueDate && this.formData.dueTime) {
                this.error.dueDate = "Required";
                this.clearDueDateError();
            } else {
                this.loading.start = true;
                this.submitButtonDisabled = true;
                let payload = {
                    name: this.formData.name,
                    status: "active",
                    createdAt: serverTimestamp(),
                };
                if (this.formData.note) payload["note"] = this.formData.note;
                if (this.formData.dueDate) {
                    payload["dueBy"] = Timestamp.fromDate(
                        new Date(
                            `${this.formData.dueDate}, ${this.formData.dueTime}`
                        )
                    );
                }
                this.saveTodoList(payload);
            }
        },
        saveTodoList(payload) {
            /* data model: collection(users) -> document (id = user id) which will hold some additional
           user data maybe -> sub collection(todos) -> multiple documents ( rand. id) which will hold  
           todo list 
           
        */
            const todoListRef = doc(
                collection(
                    this.db,
                    `Users/${this.$store.getters.userId}/TodoList`
                )
            );
            setDoc(todoListRef, payload)
                .then(() => {
                    this.loading.start = false;
                    this.loading.done = true;
                    this.$store.dispatch("addTodoList", {
                        id: todoListRef.id,
                        ...payload,
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name: "TodoList",
                            params: { id: todoListRef.id },
                        });
                    }, 500);
                })
                .catch((e) => {
                    this.submitButtonDisabled = false;
                    alert(e.code);
                });
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
        clearDueTimeError() {
            const disableWatcher = this.$watch(
                () => this.formData.dueTime,
                () => {
                    this.error.dueTime = "";
                    disableWatcher();
                }
            );
        },
        clearDueDateError() {
            const disableWatcher = this.$watch(
                () => this.formData.dueDate,
                () => {
                    this.error.dueDate = "";
                    disableWatcher();
                }
            );
        },
        onInput(event) {
            this.formData.note = event.target.value;
            if (event.target.clientHeight === event.target.scrollHeight) {
                event.target.style.height = "36px";
            } else {
                event.target.style.height = "auto";
                event.target.style.height = `${event.target.scrollHeight}px`;
            }
        },
    },
};
</script>
