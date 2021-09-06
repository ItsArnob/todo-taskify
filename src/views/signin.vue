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
            dark:border-gray-700 dark:border-opacity-50
            border-opacity-20
            backdrop-filter backdrop-blur-[6px]
            flex flex-col
        "
    >
        <h1 class="text-2xl text-center mt-2 font-semibold">
            {{ signUp ? "Create an account" : "Welcome back!" }}
        </h1>

        <button
            @click="anonLogin"
            :disabled="anonLoginDisabled"
            class="
                disabled:opacity-70
                transition
                duration-75
                mt-9
                bg-gray-700
                hover:bg-gray-600
                px-4
                py-2
                flex
                rounded
                text-white
                font-semibold
                text-center
                w-full
                focus:outline-none
                focus:ring
                focus:ring-offset-2
                focus:ring-gray-700
                focus:ring-offset-gray-500
                focus:ring-opacity-80
                cursor-pointer
            "
        >
            <div class="relative w-full">
                <loadingIcon
                    :class="{ 'opacity-0': !anonLoading.start }"
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
                    :class="{ 'text-transparent': !anonLoading.done }"
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
                        <UserCircleIcon class="w-5 mr-2" /> Continue as guest
                    </div>
                </div>
            </div>
        </button>
        <div
            class="
                mt-4
                or-line-around
                text-gray-300
                dark:text-gray-400
                font-semibold
            "
        >
            Or email
        </div>
        <form class="mt-4" @submit.prevent="validate" novalidate="true">
            <div class="relative">
                <input
                    id="email"
                    name="email"
                    type="email"
                    :value="formData.email"
                    @input="(event) => (formData.email = event.target.value)"
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
                    placeholder="me@example.com"
                />

                <label
                    for="email"
                    class="
                        absolute
                        left-0
                        -top-3.5
                        text-gray-300
                        dark:text-gray-400
                        text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-300
                        peer-placeholder-shown:text-opacity-80
                        peer-placeholder-shown:top-2
                        peer-focus:-top-3.5 peer-focus:text-gray-300
                        dark:peer-focus:text-gray-400
                        peer-focus:text-sm
                    "
                >
                    Email address
                    <span
                        v-show="error.email"
                        :class="{
                            ' text-rose-400 dark:text-red-500': error.email,
                        }"
                        >({{ error.email }})</span
                    >
                </label>
            </div>
            <div class="mt-10 relative" v-if="signUp">
                <input
                    id="rEmail"
                    type="email"
                    name="email"
                    v-model="formData.rEmail"
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
                    placeholder="Re-enter email"
                />

                <label
                    for="rEmail"
                    class="
                        absolute
                        left-0
                        -top-3.5
                        text-gray-300
                        dark:text-gray-400
                        text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-300
                        peer-placeholder-shown:text-opacity-80
                        peer-placeholder-shown:top-2
                        peer-focus:-top-3.5 peer-focus:text-gray-300
                        dark:peer-focus:text-gray-400
                        peer-focus:text-sm
                    "
                    >Re-enter email
                    <span
                        v-show="error.rEmail"
                        :class="{
                            ' text-rose-400 dark:text-red-500': error.rEmail,
                        }"
                        >({{ error.rEmail }})</span
                    >
                </label>
            </div>
            <div
                class="
                    transition
                    duration-200
                    mt-10
                    relative
                    border-b-2 border-gray-400 border-opacity-50
                "
                :class="{
                    'border-opacity-70 border-rose-400': passInputHasFocus,
                }"
            >
                <div class="flex">
                <input
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    v-model="formData.password"
                    @focus="passInputHasFocus = true"
                    @blur="passInputHasFocus = false"
                    class="
                        transition-color
                        duration-200
                        bg-transparent
                        peer
                        h-9 w-full
                        placeholder-transparent
                        outline-none
                    "
                    placeholder="Password"
                />
                <button
                    type="button"
                    class="ml-1"
                    @click="showPassword = !showPassword"
                >
                    <EyeOffIcon
                        v-if="showPassword"
                        class="w-5 text-gray-400 dark:text-gray-500"
                    />
                    <EyeIcon
                        v-else
                        class="w-5 text-gray-400 dark:text-gray-500"
                    />
                </button>
                </div>
                <label
                    for="password"
                    class="
                        absolute
                        left-0
                        -top-3.5
                        text-gray-300
                        dark:text-gray-400
                        text-sm
                        transition-all
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-300
                        peer-placeholder-shown:text-opacity-80
                        peer-placeholder-shown:top-2
                        peer-focus:-top-3.5 peer-focus:text-gray-300
                        dark:peer-focus:text-gray-400
                        peer-focus:text-sm
                    "
                    >Password
                    <span
                        v-show="error.password"
                        :class="{
                            ' text-rose-400 dark:text-red-500': error.password,
                        }"
                        >({{ error.password }})</span
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
                            <UserAddIcon v-if="signUp" class="w-5 mr-2" />
                            <LoginIcon v-else class="w-5 mr-2" />
                            {{ signUp ? "Sign up" : "Sign in" }}
                        </div>
                    </div>
                </div>
            </button>
        </form>
        <p v-if="signUp" class="text-center mt-2 text-yellow-400">
            By creating a account you are agreeing to the warnings specified at
            <router-link
                class="text-green-300 dark:text-indigo-400 hover:underline"
                :to="{ name: 'About' }"
                >the about page</router-link
            >.
        </p>
        <a
            href="#"
            v-if="!signUp"
            class="
                mt-4
                text-center
                font-bold
                text-green-300
                dark:text-indigo-400
                hover:underline
            "
        >
            Forgot your password?
        </a>
        <router-link
            v-if="!signUp"
            :to="{ name: 'SignUp' }"
            class="
                mt-1
                text-center text-green-300
                dark:text-indigo-400
                hover:underline
            "
        >
            Dont have an account? Click here to create one!
        </router-link>
        <router-link
            v-else
            :to="{ name: 'SignIn' }"
            class="
                mt-1
                text-center text-green-300
                dark:text-indigo-400
                hover:underline
            "
        >
            Already got an account? Click here to sign in!
        </router-link>
        <errorPopup :name="popupError.name" :hide="popupError.hide" />
    </div>
</template>
<script>
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInAnonymously,
} from "firebase/auth";
import {
    LoginIcon,
    UserAddIcon,
    UserCircleIcon,
    EyeIcon,
    EyeOffIcon,
} from "@heroicons/vue/outline";
import { CheckCircleIcon } from "@heroicons/vue/outline";
import isEmail from "validator/es/lib/isEmail";
import errorPopup from "../components/errorPopup.vue";
import loadingIcon from "../components/loadingIcon.vue";
export default {
    data() {
        return {
            anonLoginDisabled: false,
            submitButtonDisabled: false,
            showPassword: false,
            passInputHasFocus: false,
            popupError: {
                name: undefined,
                hide: true,
            },
            loading: {
                start: false,
                done: false,
            },
            anonLoading: {
                start: false,
                done: false,
            },
            error: {
                email: "",
                password: "",
                rEmail: "",
            },
            formData: {
                email: "",
                password: "",
                rEmail: "",
            },
        };
    },
    components: {
        UserCircleIcon,
        LoginIcon,
        UserAddIcon,
        CheckCircleIcon,
        loadingIcon,
        EyeIcon,
        EyeOffIcon,
        errorPopup,
    },
    setup() {
        const auth = getAuth();

        return { auth };
    },
    props: {
        signUp: Boolean,
    },
    methods: {
        validate() {
            this.formData.email = this.formData.email.trim();
            if (!this.formData.email) {
                this.error.email = "Please enter your email.";
                this.clearEmailError();
            } else if (!isEmail(this.formData.email)) {
                this.error.email = "Please enter a valid email.";
                this.clearEmailError();
            } else if (
                (this.signUp && !this.formData.rEmail) ||
                (this.signUp && !(this.formData.rEmail == this.formData.email))
            ) {
                this.error.rEmail = "Entered emails dont match.";
                this.clearRemailError();
            } else if (!this.formData.password) {
                this.error.password = this.signUp
                    ? "Please enter a password."
                    : "Please enter your password.";
                this.clearPasswordError();
            } else if (/\s/.test(this.formData.password)) {
                this.error.password = "Spaces not allowed.";
                this.clearPasswordError();
            } else if (this.signUp && this.formData.password.length < 6) {
                this.error.password = "Must be 6+ characters long.";
                this.clearPasswordError();
            } else {
                this.submitButtonDisabled = true;
                this.anonLoginDisabled = true;
                if (this.signUp) {
                    this.loading.start = true;
                    this.signup();
                } else {
                    this.loading.start = true;
                    this.signin();
                }
            }
        },
        clearEmailError() {
            const disableWatcher = this.$watch(
                () => this.formData.email,
                () => {
                    this.error.email = "";
                    disableWatcher();
                }
            );
        },
        clearPasswordError() {
            const disableWatcher = this.$watch(
                () => this.formData.password,
                () => {
                    this.error.password = "";
                    disableWatcher();
                }
            );
        },
        clearRemailError() {
            const disableWatcher = this.$watch(
                () => this.formData.rEmail,
                () => {
                    this.error.rEmail = "";
                    disableWatcher();
                }
            );
        },
        signin() {
            signInWithEmailAndPassword(
                this.auth,
                this.formData.email,
                this.formData.password
            )
                .then(() => {
                    this.loading.start = false;
                    this.loading.done = true;
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 700);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.loading.start = false;
                    this.submitButtonDisabled = false;
                    this.anonLoginDisabled = false;

                    switch (errorCode) {
                        case "auth/network-request-failed":
                            this.popupError.name =
                                "Failed to send request due to poor network connectivity. Make sure you're connected to the internet.";
                            this.popupError.hide = false;
                            setTimeout(
                                () => (this.popupError.hide = true),
                                3000
                            );
                            break;
                        case "auth/user-not-found":
                            this.error.email = "User not found.";
                            this.clearEmailError();
                            break;
                        case "auth/wrong-password":
                            this.error.password = "Incorrect password.";
                            this.clearPasswordError();
                            break;
                        case "auth/invalid-email":
                            this.error.email = "Please enter a valid email.";
                            this.clearEmailError();
                            break;
                        default:
                            this.popupError.name = `Unknown error occurred: ${errorCode}. Please try again in a bit.`;
                            this.popupError.hide = false;
                            setTimeout(
                                () => (this.popupError.hide = true),
                                3000
                            );
                    }
                });
        },
        signup() {
            createUserWithEmailAndPassword(
                this.auth,
                this.formData.email,
                this.formData.password
            )
                .then(() => {
                    sendEmailVerification(this.auth.currentUser).then(() => {
                        this.loading.start = false;
                        this.loading.done = true;
                        setTimeout(() => {
                            this.$router.push("/");
                        }, 700);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.loading.start = false;
                    this.submitButtonDisabled = false;
                    this.anonLoginDisabled = false;

                    switch (errorCode) {
                        case "auth/network-request-failed":
                            this.popupError.name =
                                "Failed to send request due to poor network connectivity. Make sure you're connected to the internet.";
                            this.popupError.hide = false;
                            setTimeout(
                                () => (this.popupError.hide = true),
                                3000
                            );
                            break;
                        case "auth/email-already-in-use":
                            this.error.email = "Email address is in use.";
                            this.clearEmailError();
                            break;
                        case "auth/invalid-email":
                            this.error.email = "Please enter a valid email.";
                            this.clearEmailError();
                            break;
                        default:
                            this.popupError.name = `Unknown error occurred: ${errorCode}. Please try again in a bit.`;
                            this.popupError.hide = false;
                            setTimeout(
                                () => (this.popupError.hide = true),
                                3000
                            );
                    }
                });
        },
        anonLogin() {
            this.anonLoading.start = true;
            this.submitButtonDisabled = true;
            this.anonLoginDisabled = true;
            signInAnonymously(this.auth)
                .then(() => {
                    this.anonLoading.start = false;
                    this.anonLoading.done = true;
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 700);
                })
                .catch((err) => {
                    this.anonLoginDisabled = false;
                    this.submitButtonDisabled = false;
                    this.anonLoading.start = false;
                    if (err.code == "auth/network-request-failed")
                        this.popupError.name =
                            "Failed to send request due to poor network connectivity. Make sure you're connected to the internet.";
                    else
                        this.popupError = `Unknown error occurred: ${err.code}. Please try again in a bit.`;
                    this.popupError.hide = false;
                    setTimeout(() => (this.popupError.hide = true), 3000);
                });
        },
    },
};
</script>
<style scoped>
.or-line-around {
    display: flex;
    flex-direction: row;
}
.or-line-around:before,
.or-line-around:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid rgba(156, 163, 175, 0.7);
    margin: auto;
}
.or-line-around:before {
    margin-right: 10px;
}
.or-line-around:after {
    margin-left: 10px;
}
</style>
