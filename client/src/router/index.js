/* eslint-disable semi */
/* eslint-disable quotes */
import store from "../store";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		redirect: "/auth"
	},
	{
		path: "/events",
		name: "events",
		component: () => import("../views/Events.vue")
	},
	{
		path: "/bookings",
		name: "bookings",
		component: () => import("../views/Bookings.vue"),
		beforeEnter: (to, from, next) => {
			if (store.state.isAuth) {
				next();
			} else {
				next("/auth");
			}
		}
	},
	{
		path: "/auth",
		name: "auth",
		component: () => import("../views/Auth.vue"),
		beforeEnter: (to, from, next) => {
			if (store.state.isAuth) {
				next("/events");
			} else {
				next();
			}
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
