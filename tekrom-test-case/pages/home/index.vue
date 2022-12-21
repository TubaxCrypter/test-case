<template>
  <div class="body">
    <div class="flex justify-center mb-4 sm:text-4xl">
      Product Management DashBoard
    </div>
    <button class="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 pt-2" @click="logout">
      Çıkış Yap
    </button>
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
      <button class="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="prevProduct">
        Geri
      </button>
      <button class="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="getProducts">
        Ürün Getir
      </button>
      <button class="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="nextProduct">
        İleri
      </button>

    </div>


    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="product in productData" :key="product.id">
        <img class="w-full" :src="product.images[0]" alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2"> {{product.title}}
          </div>
          <p class="text-gray-700 text-base">
            {{product.description}}
          </p>
          <span class="text-sm font-semibold">Price</span>
          &nbsp;<span class="font-bold text-xl">{{product.price}}</span>&nbsp;
          <span class="text-sm font-semibold">$</span>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#:{{product.id}}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{product.category.name}}</span>

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
      productData:[],
      offset:"0",
      limit:"10",
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
    nextProduct(){
      this.offset = parseInt(this.offset)  + 10
      this.getProducts()
    },
    prevProduct(){
    if (parseInt(this.offset) <= 0){
      this.offset = 10
    }
      this.offset = parseInt(this.offset)   - 10
      this.getProducts()
    },
    async getProducts(){
      var  data = await useFetch('https://api.escuelajs.co/api/v1/products/?offset='+ this.offset + '&limit='+ this.limit ).then((res) =>{
        var response = res.data.value
        this.productData = response
        console.log(this.productData)
      })

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
