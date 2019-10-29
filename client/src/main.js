import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { apolloProvider } from "./apolloClient";
import feather from "vue-icon";

Vue.use(feather, "v-icon");
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	apolloProvider,
	render: h => h(App)
}).$mount("#app");
