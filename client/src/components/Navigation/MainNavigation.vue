<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary">
			<b-navbar-brand>BookEvent</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item class="mx-1 px-2" to="/events" active-class="active">Events</b-nav-item>
					<b-nav-item class="mx-1 px-2" v-if="isAuth" to="/bookings" active-class="active">Bookings</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-text class="mx-1 px-2" v-if="isAuth">Welcome {{userName}}!</b-nav-text>
					<b-navbar-brand
						to="/user"
						v-if="isAuth"
						active-class="active"
						class="user-check-icon-container mx-2"
					>
						<v-icon name="user-check" class="user-check-icon ml-1 mb-1"></v-icon>
					</b-navbar-brand>
					<b-nav-item class="mx-1 px-2" v-if="!isAuth" to="/auth" active-class="active">Authenticate</b-nav-item>
					<b-nav-item class="mx-1 px-2" v-if="isAuth" active-class="active" @click="logout">Logout</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		computed: {
			...mapState(["isAuth", "userName"])
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
		background-color: rgb(255, 255, 255);
		border-radius: 5px;
		color: #007bff !important;
	}

	.nav-item:hover a {
		background-color: #fff;
		border-radius: 5px;
		color: #007bff !important;
		transition: all 200ms !important;
	}

	.user-check-icon-container {
		background-color: #007bff;
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		transition: all 200ms;
	}

	.user-check-icon {
		width: 2.5rem;
		height: 1.5rem;
		color: #ffffff80;
		transition: all 200ms;
	}

	.user-check-icon-container:hover,
	.user-check-icon-container:active,
	.user-check-icon-container.active {
		background-color: #fff;
		border: 1px solid #007bff;
	}
	.user-check-icon-container:hover .user-check-icon,
	.user-check-icon-container:active .user-check-icon,
	.user-check-icon-container.active .user-check-icon {
		color: #007bff;
		transform: scale(1.2);
	}
</style>