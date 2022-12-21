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

    <div class="flex justify-center" >
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Ürün Sayısı
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="limit" type="number" placeholder="Ürün Sayısı">
      </div>
    </div>
    <div class="p-10 grid grid-cols-4 gap-4">
      <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="product in productData" :key="product.id">
        <img class="w-full" :src="product.images[0]" alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div v-if="!editMode" class="font-bold text-xl mb-2"> {{product.title}}
          </div>
          <textarea v-if="editMode" v-model="product.title" class="font-bold border-rose-200 border-4 border-indigo-500/100  text-xl mb-2"> {{product.title}}
          </textarea>
          <p  v-if="!editMode" class="text-gray-700 text-base">
            {{product.description}}
          </p>
          <textarea v-if="editMode" v-model="product.description"  class="c font-bold border-rose-200 border-4 border-indigo-500/100  text-xl mb-2"> {{product.description}}
          </textarea>
          <span class="text-sm font-semibold">Price</span>
          &nbsp;
          <span  v-if="!editMode" class="font-bold text-xl">{{product.price}}</span>
          <textarea v-model="product.price" v-if="editMode" class="font-bold border-rose-200 text-xl">{{product.price}}</textarea>
          &nbsp;
          <span class="text-sm font-semibold">$</span>
        </div>
        <div class="px-6 pt-4 pb-2 mb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#:{{product.id}}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{product.category.name}}</span>
          <div class="grid grid-cols-3 gap-2 justify-end align-middle">
            <button  v-if="!editMode"  class="bg-orange-500 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="editMode = true">
              Düzenle
            </button>
            <button  v-if="editMode"  class="bg-orange-500 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="editMode = false">
              Kaydet
            </button>
            <button class="bg-red-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2 mt-2" @click="removeProduct(product.id)" >
              Sil
            </button>
          </div>

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
      editMode:false,
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
    removeProduct(id){
      const objWithIdIndex = this.productData.findIndex((obj) => obj.id === id);
      if (objWithIdIndex > -1) {
        this.productData.splice(objWithIdIndex, 1);
      }
    console .log(id)
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
.c{
background: transparent;
}

</style>
