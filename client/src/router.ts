import { createRouter, createWebHistory } from "vue-router";
import { Routes } from "../vars/Routes";
import Home from "./components/pages/Home.vue";
import WorkingTimes from "./components/pages/WorkingTimes.vue";
import ClockManager from "./components/specifics/ClockManager.vue";
import Dashboard from "./components/pages/Dashboard.vue";
import Teams from "./components/specifics/team/teams.vue";
const routes = [
    {
        path: Routes.HOME,
        name: "Home",
        component: Home,
    },
    {
        path: Routes.HOME_ID,
        name: "HomeId",
        component: Home,
    },
    {
        path: Routes.WORKINGTIMES,
        name: "WorkingTimes",
        component: WorkingTimes,
    },
    {
        path: Routes.WORKINGTIMES_ID,
        name: "WorkingTimesId",
        component: WorkingTimes,
    },
    {
        path: Routes.CLOCK_MANAGER_USERNAME,
        name: "clockManagerUsername",
        component: ClockManager,
    },
    {
        path: Routes.CHART_MANAGER_ID,
        name: "ChartManagerId",
        component: Dashboard,
    },

        path: Routes.TEAMS,
        name: "Teams",
        component: Teams,
    }
];

const router = createRouter({
    history: createWebHistory(Routes.HOME),
    routes,
});

export default router;