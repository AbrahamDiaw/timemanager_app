import {createRouter, createWebHistory} from "vue-router";
import {Routes} from "../vars/Routes";
import Home from "./components/pages/Home.vue";
import WonkingTimes from "./components/pages/WonkingTimes.vue";

const routes = [
    {
        path: Routes.HOME,
        name: "Home",
        component: Home,
    },
    {
        path: Routes.WORKINGTIMES,
        name: "WorkingTimes",
        component: WonkingTimes,
    }
];

const router = createRouter({
    history: createWebHistory(Routes.HOME),
    routes,
});

export default router;