<template>
    <div class="relative">
        <loadingIcon
            v-if="!todoListsLoaded"
            class="transition duration-300 w-12 mx-auto text-white"
        />
        <transition-group name="list">
            <todoCard
                v-for="todo in allDoneTodoLists"
                :key="todo.id"
                :id="todo.id"
                :title="todo.name"
                :dueBy="getDate(todo.dueBy)"
                :description="todo.note"
            />
        </transition-group>
        <p
            v-if="todoListsLoaded && !allDoneTodoLists.length"
            class="text-center text-lg"
        >
            You dont have any finished lists.
        </p>
    </div>
</template>
<script>
import todoCard from "../../components/todoCard.vue";
import loadingIcon from "../../components/loadingIcon.vue";
import { mapGetters } from "vuex";
export default {
    components: { todoCard, loadingIcon },
    computed: {
        ...mapGetters(["allDoneTodoLists", "todoListsLoaded"]),
    },
    methods: {
        getDate(date) {
            let dueByDate = date;
            if (!dueByDate) return "never";
            dueByDate = new Date(dueByDate.seconds * 1000);
            const options = {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            };
            new Date().getYear() == dueByDate.getYear()
                ? ""
                : (options["year"] = "numeric");
            return dueByDate.toLocaleString("default", options);
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
    transform: translateX(-30px);
}

.list-leave-active {
    position: absolute;
}
</style>
