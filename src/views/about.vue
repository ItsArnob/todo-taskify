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
            dark:text-gray-300
        "
    >
        <h1 class="text-center text-2xl">Todo Taskify</h1>
        <p class="mt-6 text-lg">
            Todo Taskify is a todo list/task app with simplicity in mind. Its
            job is to handle basic todo list stuff and only that:
        </p>
        <ul class="mt-2 list-inside text-lg list-disc">
            <li>
                <strong>Todo Lists</strong> - Create, delete, edit, mark list as
                done or active & add todo items. You can also optionally set a
                due date and note for that todo list.
            </li>
            <li>
                <strong>Todo Items</strong> - Todo items in a todo list can be
                checked (mark as done), unchecked & edited.
            </li>
            <li>
                <strong>Access From Anywhere</strong> - Thats a bit exaggerating
                but you can access your todo lists from any modern browser just
                by signing into your account since all your lists are saved on
                the server.
            </li>
            <li>
                <strong
                    >Notifications & Offline support (coming soon™️ )</strong
                >
                - Set a date to get notified for a certain todo list and access
                your todo lists offline thanks to service workers.
            </li>
        </ul>
        <p class="mt-2 text-lg">
            ...And thats all! I made Todo taskify just for fun and
            <strong
                >it shouldn't be used for actual serious use cases. By using
                todo taskify you are agreeing that todo taskify comes with no
                warranty and that I'm not liable for any problems caused by the
                loss of data or access to your account. You also agree that I
                may take down todo taskify at any moment without any
                notice.</strong
            >
        </p>
        <p class="mt-2 text-lg">
            Found any bug? todo taskify is open sourced, head over to the github
            repo and create an issue about it. I'll try my best to fix it.
        </p>
        <a
            href="https://github.com/itsarnob/todo-taskify"
            target="_blank"
            class="
                bg-gray-700
                hover:bg-gray-800
                hover:ring
                hover:ring-gray-300
                hover:ring-opacity-60
                dark:hover:ring-opacity-20
                transition
                duration-100
                flex
                justify-center
                items-center
                w-[130px]
                rounded
                py-2
                mt-4
            "
        >
            <img src="/gh.png" class="w-6 mr-2" alt="GitHub logo" /> GitHub
            <ExternalLinkIcon class="w-6 ml-1" />
        </a>
        <p class="text-lg mt-2">
            <strong>Credits:</strong> Main icons are from
            <a
                class="text-green-300 dark:text-indigo-400 hover:underline"
                href="https://heroicons.com"
                target="_blank"
                >heroicons</a
            >, message (email) icon by
            <a
                href="https://freepik.com"
                class="hover:underline text-green-300 dark:text-indigo-400"
                target="_blank"
                >freepik</a
            >
            from
            <a
                class="hover:underline text-green-300 dark:text-indigo-400"
                href="https://flaticon.cpm"
                target="_blank"
                >flaticon</a
            >
            and background images from
            <a
                class="hover:underline text-green-300 dark:text-indigo-400"
                href="https://hector.me/wavey"
                target="_blank"
                >hector.me/wavey</a
            >.
        </p>
    </div>
</template>
<script>
import { ExternalLinkIcon } from "@heroicons/vue/outline";
export default { components: { ExternalLinkIcon } };
</script>
