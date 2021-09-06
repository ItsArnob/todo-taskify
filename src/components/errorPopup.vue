<template>
    <teleport to="body">
        <div
            :class="slide"
            class="
                text-sm
                w-80
                break-words
                bg-gray-800
                text-white
                fixed
                bottom-0
                left-0
                right-0
                mx-auto
                py-2
                px-4
                ring-2 ring-gray-600 ring-opacity-70
                rounded-t
            "
        >
            <p>{{ name }}</p>
        </div>
    </teleport>
</template>
<script>
export default {
    props: ["name", "hide"],
    computed: {
        slide() {
            if (this.hide && this.name) return "slidedown";
            else if (this.name) return "slideup";
        },
    },
};
</script>
<style scoped>
div {
    position: fixed;
    transform: translateY(calc(100% + 10px));
    overflow: hidden;
}
@keyframes slideUp {
    0% {
        transform: translateY(100% + 10px);
    }
    100% {
        transform: translateY(0);
    }
}
.slideup {
    animation: slideUp 0.5s ease forwards;
}
@keyframes slideDown {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(100% + 10px);
    }
}
.slidedown {
    animation: slideDown 0.5s ease forwards;
}
</style>
