import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

  firebase.initializeApp({  
    apiKey: "AIzaSyCr0ZCKaU6mfbfA4LKkmu78TPe5_5nFBZs",
  authDomain: "tedw-2021.firebaseapp.com",
  projectId: "tedw-2021",
  storageBucket: "tedw-2021.appspot.com",
  messagingSenderId: "377990299575",
  appId: "1:377990299575:web:0f14fab1008315bddc7232"
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
