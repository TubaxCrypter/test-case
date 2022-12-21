import { defineStore,acceptHMRUpdate   } from 'pinia';
import Cookie from 'js-cookie';

export const useAuthStore = defineStore ('auth',{
    //id: 'auth',
    state: () => ({
        user: null,
        isLogin:false
    }),
    actions: {
        nuxtServerInit (  ) {
            console.log('init')

            if (Cookie.get("user") == "admin"){
                this.isLogin = true
            }
        },
        login(user) {
            if (user.username == 'admin' && user.password == "admin"){
                this.user = user.username
                this.isLogin = true
                Cookie.set("user",this.user)
            }else{
                this.user = null
                this.isLogin = false
                Cookie.remove("user")
            }
        },
        logout() {
            this.user = null;
            this.isLogin = false
            Cookie.remove("user")
        }
    },
    getters:{
        isAuthenticated(){
            return this.isLogin
        }

    }

});
