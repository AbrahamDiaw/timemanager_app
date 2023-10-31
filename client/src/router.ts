import { createRouter, createWebHistory } from "vue-router";
import { Routes } from "../vars/Routes";
import Home from "./components/pages/Home.vue";
import WonkingTimes from "./components/pages/WorkingTimes.vue";
import ClockManager from "./components/specifics/ClockManager.vue";

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
    },
    {
        path: Routes.WORKINGTIMES_ID,
        name: "WorkingTimesId",
        component: WonkingTimes,
    },
    {
        path: Routes.CLOCK_MANAGER_USERNAME,
        name: "clockManagerUsername",
        component: ClockManager,
    }
];

const router = createRouter({
    history: createWebHistory(Routes.HOME),
    routes,
});

export default router;