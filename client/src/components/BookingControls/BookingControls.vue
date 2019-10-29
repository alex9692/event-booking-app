<template>
	<div>
		<b-nav tabs align="center">
			<b-nav-item @click="toggleBookingDetails(true)" :active="showBookingDetails">My Bookings</b-nav-item>
			<b-nav-item
				@click="toggleBookingDetails(false)"
				:active="!showBookingDetails"
			>Booking Expenditure Chart</b-nav-item>
		</b-nav>
	</div>
</template>

<script>
	export default {
		props: ["showBookingDetails"],
		methods: {
			toggleBookingDetails(data) {
				this.$emit("toggleBookingDetails", data);
			}
		}
	};
</script>

<style scoped>
	.nav-tabs .nav-link.active {
		color: #007bff;
	}
	.nav-tabs .nav-link {
		color: #495057;
	}
</style>