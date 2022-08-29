import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import wysiwyg from "vue-wysiwyg"
import App from "./App.vue"
import config from "./config"
import router from "./router"
import store from "./store"

// Vue.config.productionTip = false
Vue.use(wysiwyg, {
  hideModules: {
    image: true,
    table: true,
    removeFormat: true,
    code: true
  }
})

Vue.use(VueAxios, axios)

axios.defaults.baseURL = config.apiRoot
Vue.axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(config.tokenName)}`

Vue.axios.interceptors.response.use(undefined, (err) => {
  // Do something with response error
  if (err.message !== "Network Error" && err.response.status === 401) {
    console.log("login.... interecpted: %o", err)
    // router.replace('/login')
    // need to added message
    localStorage.removeItem(config.tokenName) // logout!
    localStorage.removeItem("isLoggedIn") // logout!
    //  // router.push('/')
    window.location.reload()
  }

  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
