<template>
    <div class="no-highlight pb-3 w-full max-w-xl px-2 text-white">
        <div
            class="
                transition-color
                duration-200
                shadow-nav
                bg-black bg-opacity-30
                dark:border dark:border-gray-700 dark:border-opacity-100
                border border-opacity-40
                backdrop-filter backdrop-blur-[6px]
                mt-8
                p-2
                rounded-full
                flex
            "
        >
            <div class="w-full flex justify-around py-auto">
                <router-link :to="{ name: 'Home' }" class="nav-link"
                    >Todo lists
                </router-link>
                <router-link :to="{ name: 'About' }" class="nav-link">
                    About
                </router-link>
                <router-link :to="{ name: 'Privacy' }" class="nav-link">
                    Privacy
                </router-link>

                <Switch
                    v-model="enabled"
                    :class="
                        enabled
                            ? 'border-purple-600 bg-purple-800'
                            : 'border-purple-500 bg-purple-700'
                    "
                    class="
                        no-highlight
                        inline-flex
                        flex-shrink-0
                        h-6
                        w-10
                        border-2
                        shadow-inner
                        rounded-full
                        bg-opacity-60
                        cursor-pointer
                        transition-colors
                        ease-in-out
                        duration-200
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-white
                        focus-visible:ring-opacity-75
                    "
                >
                    <span class="sr-only">Change theme</span>
                    <span
                        aria-hidden="true"
                        :class="
                            enabled
                                ? 'translate-x-[1.03rem] theme-btn-bg-enable'
                                : 'translate-x-px'
                        "
                        class="
                            transition-all
                            theme-btn-bg
                            pointer-events-none
                            inline-block
                            h-[1.15rem]
                            w-[1.15rem]
                            my-auto
                            rounded-full
                            shadow-lg
                            transform
                            ring-0
                            ease-in-out
                            duration-200
                        "
                    />
                </Switch>
            </div>
        </div>

        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transitionName" mode="out-in">
                <component
                    :is="Component"
                    :key="route.path == '/signin' ? 'signin' : ''"
                />
            </transition>
        </router-view>
    </div>
</template>
<script>
import { ref, reactive } from "vue";
import { Switch } from "@headlessui/vue";

export default {
    components: { Switch },
    setup() {
        const enabled = ref(false);
        if (
            window.matchMedia("(prefers-color-scheme: dark)").matches &&
            !localStorage.getItem("theme")
        ) {
            enabled.value = true;
        } else if (localStorage.getItem("theme") == "dark") {
            enabled.value = true;
        } else {
            enabled.value = false;
        }
        return { enabled };
    },

    watch: {
        enabled(newval) {
            this.changeTheme(newval);
        },
    },
    methods: {
        changeTheme(newval) {
            if (newval) {
                document.querySelector("html").classList.add("dark");
                if (
                    window.matchMedia("(prefers-color-scheme: dark)").matches &&
                    !localStorage.getItem("theme")
                )
                    return;

                localStorage.setItem("theme", "dark");
            } else {
                document.querySelector("html").classList.remove("dark");
                if (
                    !window.matchMedia("(prefers-color-scheme: dark)")
                        .matches &&
                    !localStorage.getItem("theme")
                )
                    return;
                localStorage.setItem("theme", "light");
            }
        },
    },
    created() {
        this.changeTheme(this.enabled);
        this.$router.afterEach((to, from) => {
            const toP = to.path;
            const fromP = from.path;
            let transition;

            //couldn't figure out a better way :(

            if (fromP == "/" && toP == "/about") transition = "slide";
            else if (fromP == "/" && toP == "/privacy") transition = "slide";
            else if (fromP == "/about" && toP == "/")
                transition = "slide-right";
            else if (fromP == "/about" && toP == "/privacy")
                transition = "slide";
            else if (fromP == "/privacy" && toP == "/")
                transition = "slide-right";
            else if (fromP == "/privacy" && toP == "/about")
                transition = "slide-right";
            else transition = "slide";
            to.meta.transitionName = transition;
        });
    },
};
</script>
<style>
.slide-enter-active,
.slide-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-leave-to,
.slide-right-enter-from {
    opacity: 0;
    transform: translate(-1em, 0);
}
.slide-enter-from,
.slide-right-leave-to {
    opacity: 0;
    transform: translate(0.5em, 0);
}
</style>
