<template>
  <div class="body">
    <div class="flex justify-center mb-4 sm:text-4xl">
      Product Management DashBoard
    </div>
    <button class="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 pt-2" @click="logout">
      Çıkış Yap
    </button>
    <button class="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="getProducts">
      Ürün Getir
    </button>

    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>


    </div>

  </div>
</template>

<script  >
import { storeToRefs } from 'pinia'
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore()
const { user } = storeToRefs(authStore);
authStore.nuxtServerInit



definePageMeta({
  middleware: "auth-check"
})
export default ({
  name: 'home',
  middleware:'authCheck',
  data(){
    return{
      user:{
        email:"",
        password:"",
      }
    }
  },
  methods:{
    logout(){
      authStore.logout()
      if (authStore.isLogin == null || authStore.isLogin == false){
        this.$router.push('/login')
      }

    },
    async getProducts(){
      let  data = await useFetch('https://api.escuelajs.co/api/v1/products/?offset=0&limit=10')
      console.log(data.data.value)
      // console.log(this.$config.API_BASE_URL)
      // console.log(baseApi)

    }


  }
})
</script>

<style scoped>
.body{

}

</style>
