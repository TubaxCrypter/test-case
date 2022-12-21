import { defineNuxtPlugin } from '#app'
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from 'pinia'
export default defineNuxtRouteMiddleware((to, from) => {
    const store = useAuthStore();
    const { isLogin } = storeToRefs(store)
    store.nuxtServerInit()
    if (!store.isLogin){
        //   return '/login'
    }
})
