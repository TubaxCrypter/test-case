<template>
  <div class="bg-white shadow-sm rounded w-96">
    <div class="text-center text-gray-600 py-4 text-black-100 text-3xl">Admin Panel</div>
    <div class="flex justify-center mb-4">
      <div class="text">
        Product Management System
      </div>
    </div>
    <div class="bg-gray-200 pt-8 pb-16">
      <div class="text-center text-gray-600 mb-6">Sign in with Email & Password</div>
      <div class="w-4/5 mx-auto">
        <div class="flex items-center bg-white rounded shadow-md mb-4">
        <span class="px-3">
          <svg class="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"/></svg>
        </span>
          <input class="w-full h-12 focus:outline-none" type="text" name="username" placeholder="Username" v-model="user.username">
        </div>
        <div class="flex items-center bg-white rounded shadow-md mb-4">
        <span class="px-3">
          <svg class="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/></svg>
        </span>
          <input class="w-full h-12 focus:outline-none" type="password" name="password" placeholder="Password" v-model="user.password">
        </div>

        <button class=" c bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2" @click="login()">Sign in</button>
      </div>
    </div>

  </div>
</template>

<script>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore()

definePageMeta({
  layout: 'login',
});
export default ({
  name: 'index',
  data(){
    return{
      user:{
        username:"",
        password:"",
      }
    }
  },
  methods:{
    login(){
      authStore.login(this.user)
      if (!authStore.isAuthenticated){
        alert('k.adi : admin ' +
            'şifre : admin')
        return
      }
      if (authStore.isLogin != null || authStore.isLogin != false){
        this.$router.push('/home')
      }
    }
  }
})
</script>
<style scoped>
.c{
  background: transparent;
}
</style>
