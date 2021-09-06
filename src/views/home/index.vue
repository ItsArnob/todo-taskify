<template>
    <div>
        <div v-if="userShouldHaveAccess" class="mt-7">
            <div class="flex justify-between mx-4 mb-2">
                <router-link
                    :to="{ name: 'Home' }"
                    exact-active-class="active-exact-active"
                    class="
                        nav-2-a
                        transition
                        duration-300
                        border-blue-300
                        bg-opacity-50 bg-blue-600
                        text-blue-300
                    "
                >
                    Active
                </router-link>
                <router-link
                    :to="{ name: 'HomeDone' }"
                    exact-active-class="done-exact-active"
                    class="
                        nav-2-a
                        transition
                        duration-300
                        border-pink-400
                        bg-pink-600 bg-opacity-80
                        text-pink-300
                    "
                >
                    Done
                </router-link>
                <router-link
                    :to="{ name: 'HomeCreate' }"
                    exact-active-class="create-exact-active"
                    class="
                        nav-2-a
                        transition
                        duration-300
                        border-green-400
                        bg-green-500 bg-opacity-70
                        text-green-300
                    "
                >
                    Create
                </router-link>
            </div>
            <hr
                class="
                    transition-color
                    mx-4
                    duration-200
                    border-opacity-50
                    dark:border-opacity-70
                    dark:border-gray-700
                    dark:border-gray-600
                    my-7
                "
            />
            <router-view v-slot="{ Component, route }">
                <transition :name="route.meta.transition" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div class="flex mt-7" v-else-if="user.exists && !user.isAnonymous">
            <div
                class="
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
                    dark:text-gray-300
                "
            >
                <div
                    v-if="resendEmailMsg"
                    class="
                        mb-2
                        border border-green-400
                        shadow-inner
                        bg-green-200 bg-opacity-20
                        rounded
                        p-2
                        flex
                    "
                >
                    <p class="text-green-200">{{ resendEmailMsg }}</p>
                    <button @click="this.resendEmailMsg = ''" class="ml-auto">
                        <XCircleIcon class="w-5 text-rose-400" />
                    </button>
                </div>
                <p class="text-2xl mx-auto font-semibold">One last step!</p>
                <img src="/message.png" class="w-28 mx-auto" />
                <p class="text-center">
                    You have to verify your email before you can use this app.
                    Check your inbox for the verification email.
                </p>
                <div class="flex mx-auto mt-4">
                    <button
                        :disabled="resendDisabled"
                        @click="resendEmail"
                        class="
                            transition
                            duration-75
                            px-2
                            py-1
                            mr-2
                            rounded
                            bg-rose-500
                            hover:bg-rose-400
                            text-white
                            font-semibold
                            text-center
                            focus:outline-none
                            focus:ring
                            focus:ring-offset-2
                            focus:ring-rose-500
                            focus:ring-offset-rose-300
                            focus:ring-opacity-80
                            disabled:opacity-50
                            cursor-pointer
                            flex
                            items-center
                        "
                    >
                        <MailIcon class="w-5 mr-2" />
                        <p>Resend email</p>
                    </button>
                    <button
                        @click="signout"
                        class="
                            transition
                            duration-75
                            px-2
                            py-1
                            rounded
                            bg-black bg-opacity-20
                            dark:bg-gray-600
                            dark:bg-opacity-40
                            dark:hover:bg-opacity-80
                            hover:bg-gray-600 hover:bg-opacity-80
                            text-white
                            font-semibold
                            text-center
                            focus:outline-none focus:ring focus:ring-offset-2
                            dark:focus:ring-gray-600
                            dark:focus:ring-offset-gray-500
                            focus:ring-gray-700
                            focus:ring-offset-gray-500
                            focus:ring-opacity-70
                            cursor-pointer
                            flex
                            items-center
                        "
                    >
                        <LogoutIcon class="w-5 mr-2" /> Sign out
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="flex mt-7">
            <div
                class="
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
                    dark:text-gray-300
                "
            >
                <p class="text-2xl">
                    Welcome to
                    <span class="font-semibold">Todo Taskify (beta)</span>!
                </p>
                <p class="text-lg mt-3">
                    This app is meant to be ✨
                    <span class="font-semibold"><i>minimalistic</i></span>
                    ✨<br />
                    meaning it has to do one job and only that, no additional
                    features.
                </p>
                <router-link :to="{ name: 'About' }" class="text-green-300 dark:text-indigo-400 hover:underline">Learn more.</router-link>
                <div class="text-lg mt-4 flex">
                    <router-link
                        :to="{ name: 'SignUp' }"
                        class="
                            transition
                            duration-100
                            flex
                            items-center
                            bg-blue-500
                            hover:ring hover:ring-blue-500 hover:ring-opacity-70
                            dark:hover:ring-blue-500
                            cursor-pointer
                            dark:hover:shadow-inner
                            hover:bg-blue-400
                            dark:hover:bg-blue-600
                            py-1
                            px-2
                            rounded-md
                            mr-4
                        "
                    >
                        <UserAddIcon class="w-5 mr-2" />Sign up
                    </router-link>
                    <router-link
                        :to="{ name: 'SignIn' }"
                        class="
                            transition
                            duration-100
                            flex
                            items-center
                            bg-black bg-opacity-20
                            dark:bg-gray-600 dark:bg-opacity-40
                            hover:ring
                            hover:ring-black
                            hover:ring-opacity-40
                            hover:bg-opacity-30
                            dark:hover:bg-opacity-20
                            dark:hover:ring-gray-600
                            dark:hover:ring-opacity-70
                            dark:hover:shadow-inner
                            y-1
                            px-2
                            rounded-md
                            cursor-pointer
                        "
                    >
                        <LoginIcon class="w-5 mr-2" />Sign in
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    LoginIcon,
    UserAddIcon,
    LogoutIcon,
    MailIcon,
} from "@heroicons/vue/outline";
import { XCircleIcon } from "@heroicons/vue/solid";
import { mapGetters } from "vuex";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";

export default {
    components: { LoginIcon, UserAddIcon, LogoutIcon, MailIcon, XCircleIcon },
    data() {
        return {
            resendEmailMsg: "",
            resendDisabled: false,
        };
    },
    setup() {
        const auth = getAuth();
        return { auth };
    },
    computed: {
        ...mapGetters(["user", "userShouldHaveAccess"]),
    },
    created() {
        this.$router.afterEach((to, from) => {
            const toP = to.path;
            const fromP = from.path;
            let transition;

            //couldn't figure out a better way :(

            if (fromP == "/" && toP == "/done") transition = "slide";
            else if (fromP == "/" && toP == "/create") transition = "slide";
            else if (fromP == "/done" && toP == "/") transition = "slide-right";
            else if (fromP == "/done" && toP == "/create") transition = "slide";
            else if (fromP == "/create" && toP == "/")
                transition = "slide-right";
            else if (fromP == "/create" && toP == "/done")
                transition = "slide-right";
            else transition = "slide";
            to.meta.transition = transition;
        });
    },
    methods: {
        signout() {
            signOut(this.auth);
        },
        resendEmail() {
            this.auth.currentUser.reload().then(() => {
                this.$store.dispatch("setUser", this.auth.currentUser);
                if (this.user.emailVerified) {
                    alert(
                        "Seems like you already verified your email, click OK to continue to the app."
                    );
                } else
                    sendEmailVerification(this.auth.currentUser).then(() => {
                        this.resendEmailMsg = "Resent the verification email.";
                        this.resendDisabled = true;
                    });
            });
        },
    },
};
</script>
