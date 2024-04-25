import Index from "./pages/index.vue"
import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    routes: [
        {
            name: 'index',
            path: '/',
            component: Index,
        },
    ],
    history: createWebHistory()
})
export default router


