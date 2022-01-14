import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'

import Cart from './components/Cart.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
	{ path: '/cart', component: Cart, props: true },
];

const router = new VueRouter({
	routes,
	mode: "history"
})

export const eventBus = new Vue()

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
