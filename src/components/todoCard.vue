<template>
    <div
        class="
            w-full
            mb-7
            block
            h-28
            bg-black bg-opacity-30
            hover:bg-opacity-40 hover:shadow-nav
            rounded-lg
            transition-color
            duration-200
            border-[1.5px]
            dark:border-[1.5px] dark:border-gray-600 dark:border-opacity-30
            border-opacity-30
            p-4
        "
        @click="openList"
    >
        <div class="flex">
            <p
                class="
                    transition
                    duration-200
                    font-bold
                    my-auto
                    dark:text-gray-300
                    truncate
                "
            >
                {{ title }}
            </p>
            <Menu as="div" class="relative inline-block text-left ml-auto">
                <div>
                    <MenuButton
                        class="
                            inline-flex
                            justify-center
                            bg-black
                            rounded
                            py-1
                            px-2
                            hover:bg-opacity-30
                            bg-opacity-20
                            text-sm
                            font-medium
                            text-white
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-opacity-75
                        "
                    >
                        Options
                        <ChevronDownIcon
                            class="w-5 h-5 ml-2 -mr-1"
                            aria-hidden="true"
                        />
                    </MenuButton>
                </div>

                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems
                        class="
                            absolute
                            right-0
                            w-[9.25rem]
                            mt-1
                            p-1
                            origin-top-right
                            bg-gray-300 bg-opacity-50
                            backdrop-filter backdrop-blur-sm
                            rounded-md
                            shadow-lg
                            ring-1 ring-black ring-opacity-5
                            focus:outline-none
                            menuItems
                        "
                    >
                        <MenuItem v-slot="{ active }">
                            <button
                                @click.stop="doneOpenModal"
                                v-if="activeCard"
                                :class="[
                                    active
                                        ? 'bg-green-400 bg-opacity-30 text-green-400 dark:text-green-500'
                                        : 'text-green-300',
                                    'group flex rounded-md items-center w-full px-1 py-1 text-sm',
                                ]"
                            >
                                <CheckIcon
                                    :active="active"
                                    class="w-5 h-5 mr-2 text-violet-400"
                                    aria-hidden="true"
                                />
                                Mark as done
                            </button>
                            <button
                                v-else
                                @click.stop="openModal"
                                :class="[
                                    active
                                        ? 'bg-green-400 bg-opacity-30 text-green-400 dark:text-green-500'
                                        : 'text-green-300',
                                    'group flex rounded-md items-center w-full px-1 py-1 text-sm',
                                ]"
                            >
                                <CheckIcon
                                    :active="active"
                                    class="w-5 h-5 mr-2 text-violet-400"
                                    aria-hidden="true"
                                />
                                Mark as active
                            </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <button
                                @click.stop="editTodo"
                                :class="[
                                    active
                                        ? 'bg-yellow-400 bg-opacity-30 text-yellow-500'
                                        : 'text-yellow-400',
                                    'group flex rounded-md items-center w-full px-1 py-1 text-sm',
                                ]"
                            >
                                <PencilIcon
                                    :active="active"
                                    class="w-5 h-5 mr-2 text-violet-400"
                                    aria-hidden="true"
                                />
                                Edit
                            </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <button
                                @click.stop="deleteOpenModal"
                                :class="[
                                    active
                                        ? 'bg-red-400 bg-opacity-40 text-red-600'
                                        : 'text-red-500',
                                    'group flex rounded-md items-center w-full px-1 py-1 text-sm',
                                ]"
                            >
                                <TrashIcon
                                    :active="active"
                                    class="w-5 h-5 mr-2 text-violet-400"
                                    aria-hidden="true"
                                />
                                Delete
                            </button>
                        </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
        <div class="flex mt-6">
            <p
                :class="{ 'font-light italic pr-[2px]': !description }"
                class="transition duration-200 truncate dark:text-gray-300"
            >
                {{ description ? description : "No note added" }}
            </p>
            <p
                class="
                    flex-shrink-0
                    transition
                    duration-200
                    ml-auto
                    font-light
                    text-sm text-gray-200
                    dark:text-gray-400
                "
            >
                <strong>Due by:</strong> {{ dueBy }}
            </p>
        </div>
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="closeModal">
                <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="min-h-screen px-4 text-center">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <DialogOverlay
                                class="fixed inset-0 bg-black bg-opacity-60"
                            />
                        </TransitionChild>

                        <span
                            class="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <div
                                class="
                                    inline-block
                                    w-full
                                    max-w-md
                                    p-6
                                    my-8
                                    overflow-hidden
                                    text-left
                                    align-middle
                                    transition-all
                                    transform
                                    bg-gray-700
                                    rounded-md
                                "
                            >
                                <DialogTitle
                                    as="h3"
                                    class="
                                        text-lg
                                        font-medium
                                        leading-6
                                        text-gray-200
                                    "
                                >
                                    <template v-if="currentDialog == 'delete'">
                                        <loadingIcon
                                            v-if="deleteIcon.loading"
                                            class="
                                                w-6
                                                h-6
                                                p-[2px]
                                                mr-2
                                                bg-yellow-600
                                                rounded-full
                                                inline-block
                                            "
                                        />
                                        <CheckCircleIcon
                                            v-else-if="deleteIcon.done"
                                            class="
                                                w-6
                                                mr-2
                                                p-[2px]
                                                rounded-full
                                                inline-block
                                                text-green-300
                                                bg-green-500/20
                                            "
                                        />
                                        <TrashIcon
                                            v-else
                                            class="
                                                w-6
                                                mr-2
                                                p-[2px]
                                                text-red-400
                                                bg-opacity-20 bg-red-400
                                                rounded-full
                                                inline-block
                                            "
                                        />
                                        <span v-if="deleteIcon.done">
                                            Successfully deleted.
                                        </span>
                                        <span v-else>
                                            Are you sure you want to delete
                                            <span class="font-semibold">{{
                                                title
                                            }}</span>
                                            list?
                                        </span>
                                    </template>
                                    <template
                                        v-else-if="currentDialog == 'done'"
                                    >
                                        <loadingIcon
                                            v-if="doneIcon.loading"
                                            class="
                                                w-6
                                                h-6
                                                p-[2px]
                                                mr-2
                                                bg-yellow-600
                                                rounded-full
                                                inline-block
                                            "
                                        />
                                        <CheckCircleIcon
                                            v-else-if="doneIcon.done"
                                            class="
                                                w-6
                                                mr-2
                                                p-[2px]
                                                rounded-full
                                                inline-block
                                                text-green-300
                                                bg-green-500/20
                                            "
                                        />
                                        <ClipboardCheckIcon
                                            v-else
                                            class="
                                                w-6
                                                mr-2
                                                p-[2px]
                                                rounded-full
                                                inline-block
                                                text-green-300
                                                bg-green-500/20
                                            "
                                        />
                                        <span v-if="doneIcon.done"
                                            >Successfully marked list as
                                            done.</span
                                        >
                                        <span v-else-if="doneIcon.error">
                                            List not found.
                                        </span>
                                        <span v-else>
                                            Mark
                                            <span class="font-semibold">{{
                                                title
                                            }}</span>
                                            list as done?
                                        </span>
                                    </template>
                                    <template v-else>
                                        <loadingIcon
                                            v-if="activeIcon.loading"
                                            class="
                                                w-6
                                                h-6
                                                p-[2px]
                                                mr-2
                                                bg-yellow-600
                                                rounded-full
                                                inline-block
                                            "
                                        />
                                        <CheckCircleIcon
                                            v-else-if="activeIcon.done"
                                            class="
                                                w-6
                                                mr-2
                                                p-[2px]
                                                rounded-full
                                                inline-block
                                                text-green-300
                                                bg-green-500/20
                                            "
                                        />
                                        <ClipboardCopyIcon
                                            v-else
                                            class="
                                                w-6
                                                mr-2
                                                p-[2px]
                                                rounded-full
                                                inline-block
                                                text-green-300
                                                bg-green-500/20
                                            "
                                        />
                                        <span v-if="activeIcon.done"
                                            >Successfully marked list as
                                            active.</span
                                        >
                                        <span v-else-if="activeIcon.error">
                                            List not found.
                                        </span>
                                        <span v-else>
                                            Mark
                                            <span class="font-semibold">{{
                                                title
                                            }}</span>
                                            list as active?
                                        </span>
                                    </template>
                                </DialogTitle>
                                <DialogDescription class="mt-2 block">
                                    <p class="text-sm text-gray-300">
                                        <template
                                            v-if="currentDialog == 'delete'"
                                        >
                                            <span class="font-bold">{{
                                                title
                                            }}</span>
                                            list
                                            <span v-if="deleteIcon.done">
                                                has been permanently
                                                deleted.</span
                                            >
                                            <span v-else
                                                >will be permanently deleted.
                                                There is no turning back!</span
                                            >
                                        </template>
                                        <template
                                            v-else-if="currentDialog == 'done'"
                                        >
                                            <span v-if="doneIcon.error">
                                                <span class="font-bold">{{
                                                    title
                                                }}</span>
                                                list couldn't be found. This
                                                happens when you delete a list
                                                owned by this account from
                                                another device/browser.
                                            </span>
                                            <span v-else>
                                                <span v-if="doneIcon.done">
                                                    Moved
                                                </span>
                                                <span v-else>
                                                    This action will move</span
                                                >
                                                the
                                                <span class="font-bold">{{
                                                    title
                                                }}</span>
                                                list to the
                                                <span class="font-semibold"
                                                    >Done</span
                                                >
                                                tab.
                                            </span>
                                        </template>
                                        <template v-else>
                                            <span v-if="activeIcon.error">
                                                <span class="font-bold">{{
                                                    title
                                                }}</span>
                                                list couldn't be found. This
                                                happens when you delete a list
                                                owned by this account from
                                                another device/browser.
                                            </span>
                                            <span v-else>
                                                <span v-if="activeIcon.done">
                                                    Moved
                                                </span>
                                                <span v-else>
                                                    This action will move</span
                                                >
                                                the
                                                <span class="font-bold">{{
                                                    title
                                                }}</span>
                                                list to the
                                                <span class="font-semibold"
                                                    >Active</span
                                                >
                                                tab.
                                            </span>
                                        </template>
                                    </p>
                                </DialogDescription>

                                <div class="mt-4">
                                    <template v-if="currentDialog == 'delete'">
                                        <button
                                            type="button"
                                            :disabled="deleteButtonDisabled"
                                            v-if="!deleteIcon.done"
                                            class="
                                                disabled:opacity-70
                                                transition
                                                no-highlight
                                                inline-flex
                                                justify-center
                                                px-4
                                                py-2
                                                bg-red-400
                                                text-sm text-white
                                                font-medium
                                                rounded
                                                hover:shadow-xl
                                                focus:outline-none focus:ring-2
                                                mr-4
                                                focus:ring-offset-2
                                                focus:ring-offset-gray-600
                                                focus:ring-red-400
                                            "
                                            @click="deleteTodo"
                                        >
                                            Yes, delete
                                        </button>
                                        <button
                                            type="button"
                                            :disabled="deleteButtonDisabled"
                                            :class="[
                                                deleteIcon.done
                                                    ? 'bg-blue-400 focus:ring-blue-400'
                                                    : 'bg-gray-500 focus:ring-gray-500',
                                            ]"
                                            class="
                                                disabled:opacity-70
                                                transition
                                                no-highlight
                                                inline-flex
                                                justify-center
                                                px-4
                                                py-2
                                                text-sm text-white
                                                font-medium
                                                rounded
                                                focus:outline-none
                                                hover:shadow-xl
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-offset-2
                                                focus:ring-offset-gray-600
                                            "
                                            @click="closeModal"
                                        >
                                            {{
                                                deleteIcon.done
                                                    ? "Close"
                                                    : "Cancel"
                                            }}
                                        </button>
                                    </template>
                                    <template
                                        v-else-if="currentDialog == 'done'"
                                    >
                                        <button
                                            @click="markDone"
                                            :disabled="doneIcon.disabled"
                                            v-if="!doneIcon.done"
                                            class="
                                                disabled:opacity-70
                                                transition
                                                no-highlight
                                                inline-flex
                                                justify-center
                                                px-4
                                                py-2
                                                bg-green-500
                                                text-sm text-white
                                                font-medium
                                                rounded
                                                hover:shadow-xl
                                                focus:outline-none focus:ring-2
                                                mr-4
                                                focus:ring-offset-2
                                                focus:ring-offset-gray-600
                                                focus:ring-green-500
                                            "
                                        >
                                            Mark as Done
                                        </button>
                                        <button
                                            type="button"
                                            :disabled="doneIcon.disabled"
                                            :class="[
                                                doneIcon.done
                                                    ? 'bg-blue-400 focus:ring-blue-400'
                                                    : 'bg-gray-500 focus:ring-gray-500',
                                            ]"
                                            class="
                                                disabled:opacity-70
                                                transition
                                                no-highlight
                                                inline-flex
                                                justify-center
                                                px-4
                                                py-2
                                                text-sm text-white
                                                font-medium
                                                rounded
                                                focus:outline-none
                                                hover:shadow-xl
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-offset-2
                                                focus:ring-offset-gray-600
                                            "
                                            @click="closeModal"
                                        >
                                            {{
                                                doneIcon.done
                                                    ? "Close"
                                                    : "Cancel"
                                            }}
                                        </button>
                                    </template>
                                    <template v-else>
                                        <button
                                            @click="markActive"
                                            v-if="!activeIcon.done"
                                            :disabled="activeIcon.disabled"
                                            class="
                                                disabled:opacity-70
                                                transition
                                                no-highlight
                                                inline-flex
                                                justify-center
                                                px-4
                                                py-2
                                                bg-green-500
                                                text-sm text-white
                                                font-medium
                                                rounded
                                                hover:shadow-xl
                                                focus:outline-none focus:ring-2
                                                mr-4
                                                focus:ring-offset-2
                                                focus:ring-offset-gray-600
                                                focus:ring-green-500
                                            "
                                        >
                                            Mark as Active
                                        </button>
                                        <button
                                            type="button"
                                            :disabled="activeIcon.disabled"
                                            :class="[
                                                activeIcon.done
                                                    ? 'bg-blue-400 focus:ring-blue-400'
                                                    : 'bg-gray-500 focus:ring-gray-500',
                                            ]"
                                            class="
                                                disabled:opacity-70
                                                transition
                                                no-highlight
                                                inline-flex
                                                justify-center
                                                px-4
                                                py-2
                                                text-sm text-white
                                                font-medium
                                                rounded
                                                focus:outline-none
                                                hover:shadow-xl
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-offset-2
                                                focus:ring-offset-gray-600
                                            "
                                            @click="closeModal"
                                        >
                                            {{
                                                activeIcon.done
                                                    ? "Close"
                                                    : "Cancel"
                                            }}
                                        </button>
                                    </template>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script>
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from "@headlessui/vue";
import {
    ChevronDownIcon,
    TrashIcon,
    PencilIcon,
    CheckIcon,
    ClipboardCheckIcon,
    ClipboardCopyIcon,
} from "@heroicons/vue/solid";
import { CheckCircleIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
import loadingIcon from "./loadingIcon.vue";
export default {
    setup() {
        const db = getFirestore();
        const active = ref(false);
        const isOpen = ref(false);

        return {
            isOpen,
            active,
            db,
        };
    },

    data() {
        return {
            deleteIcon: {
                loading: false,
                done: false,
            },
            doneIcon: {
                loading: false,
                done: false,
                disabled: false,
                error: false,
            },
            activeIcon: {
                loading: false,
                done: false,
                disabled: false,
                error: false,
            },
            deleteButtonDisabled: false,
            currentDialog: "",
        };
    },
    components: {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        ChevronDownIcon,
        TrashIcon,
        PencilIcon,
        CheckIcon,
        CheckCircleIcon,
        TransitionRoot,
        loadingIcon,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
        ClipboardCheckIcon,
        ClipboardCopyIcon,
    },
    props: {
        title: String,
        id: String,
        description: String,
        dueBy: String,
        activeCard: Boolean,
    },

    methods: {
        markDone() {
            this.doneIcon.loading = true;
            this.doneIcon.disabled = true;
            const docRef = doc(
                collection(
                    this.db,
                    `Users/${this.$store.getters.userId}/TodoList/`
                ),
                this.id
            );
            updateDoc(docRef, { status: "done" })
                .then(() => {
                    this.doneIcon.loading = false;
                    this.doneIcon.disabled = false;
                    this.doneIcon.done = true;
                })
                .catch((err) => {
                    this.doneIcon.loading = false;
                    this.doneIcon.disabled = false;
                    if (err.code == "not-found") {
                        this.doneIcon.error = true;
                    } else alert(err.code);
                });
        },
        markActive() {
            this.activeIcon.loading = true;
            this.activeIcon.disabled = true;
            const docRef = doc(
                collection(
                    this.db,
                    `Users/${this.$store.getters.userId}/TodoList/`
                ),
                this.id
            );
            updateDoc(docRef, { status: "active", [`items.meta.id`]: "modify" })
                .then(() => {
                    this.activeIcon.loading = false;
                    this.activeIcon.disabled = false;
                    this.activeIcon.done = true;
                })
                .catch((err) => {
                    this.activeIcon.loading = false;
                    this.activeIcon.disabled = false;
                    if (err.code == "not-found") {
                        this.activeIcon.error = true;
                    } else alert(err.code);
                });
        },
        closeModal() {
            if (
                this.deleteIcon.loading ||
                this.doneIcon.loading ||
                this.activeIcon.loading
            )
                return;
            this.isOpen = false;
            setTimeout(() => {
                this.currentDialog = "";
                if (this.doneIcon.error || this.activeIcon.error) {
                    this.$store.dispatch("setTodoListsStatus", false);
                    this.$store.dispatch("clearTodoList");
                    getDocs(
                        query(
                            collection(
                                this.db,
                                `Users/${this.$store.getters.userId}/TodoList`
                            ),
                            orderBy("createdAt")
                        )
                    )
                        .then((docs) => {
                            this.$store.dispatch("setTodoListsStatus", true);
                            this.doneIcon.error = false;
                            this.activeIcon.error = false;
                            docs.forEach((doc) => {
                                this.$store.dispatch("addTodoList", {
                                    id: doc.id,
                                    ...doc.data(),
                                });
                            });
                        })
                        .catch((err) => alert(err.code));
                }
                this.deleteIcon.done
                    ? this.$store.dispatch("deleteList", this.id)
                    : this.doneIcon.done
                    ? this.$store.dispatch("markDone", this.id)
                    : this.activeIcon.done
                    ? this.$store.dispatch("markActive", this.id)
                    : "";
            }, 300);
        },
        openModal() {
            setTimeout(() => {
                this.isOpen = true;
            }, 100);
        },
        doneOpenModal() {
            this.currentDialog = "done";
            this.openModal();
        },
        deleteOpenModal() {
            this.currentDialog = "delete";
            this.openModal();
        },
        deleteTodo() {
            this.deleteIcon.loading = true;
            this.deleteButtonDisabled = true;
            const docRef = doc(
                collection(
                    this.db,
                    `Users/${this.$store.getters.userId}/TodoList/`
                ),
                this.id
            );
            deleteDoc(docRef)
                .then((a) => {
                    this.deleteIcon.loading = false;
                    this.deleteIcon.done = true;
                    this.deleteButtonDisabled = false;
                })
                .catch((e) => {
                    this.loading = false;
                    this.deleteButtonDisabled = false;
                });
        },
        editTodo() {
            this.$router.push({
                path: `/todo/${this.id}`,
                query: { edit: true },
            });
        },
        openList() {
            this.$router.push({
                name: "TodoList",
                params: { id: this.id },
            });
        },
    },
};
</script>
<style scoped>
@supports not (
    (-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))
) {
    /* CSS to provide fallback alternative for Firefox and similar browsers */
    .menuItems {
        background-color: white;
        opacity: 0.8;
    }
}
</style>
