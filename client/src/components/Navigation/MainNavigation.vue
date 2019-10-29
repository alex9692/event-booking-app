<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary">
			<b-navbar-brand>EasyEvent</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item class="mx-2 px-2" v-if="!isAuth" to="/auth" active-class="active">Authenticate</b-nav-item>
					<b-nav-item class="mx-2 px-2" to="/events" active-class="active">Events</b-nav-item>
					<b-nav-item class="mx-2 px-2" v-if="isAuth" to="/bookings" active-class="active">Bookings</b-nav-item>
					<b-nav-item class="mx-2 px-2" v-if="isAuth" active-class="active" @click="logout">Logout</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		computed: {
			...mapState(["isAuth"])
		},
		methods: {
			logout() {
				this.$store.dispatch("signout");
			}
		}
	};
</script>

<style scoped>
	.active {
		background-color: #fff;
		border-radius: 5px;
		color: #007bff !important;
	}

	.nav-item:hover a {
		background-color: #fff;
		border-radius: 5px;
		color: #007bff !important;
	}
</style>