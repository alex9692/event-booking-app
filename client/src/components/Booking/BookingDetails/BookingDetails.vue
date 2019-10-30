<template>
	<simplebar class="bar" data-simplebar-auto-hide="false">
		<b-row>
			<b-col cols="10" offset-md="1">
				<div v-if="bookings.length===0">
					<h1 class="display-4 text-center">No Bookings found!</h1>
				</div>
				<div v-else>
					<app-booking v-for="booking in bookings" :key="booking.id" :booking="booking"></app-booking>
				</div>
			</b-col>
		</b-row>
	</simplebar>
</template>

<script>
	import Booking from "../Booking";
	import simplebar from "simplebar-vue";
	import "simplebar/dist/simplebar.min.css";

	export default {
		components: {
			"app-booking": Booking,
			simplebar
		},
		props: ["bookings"]
	};
</script>

<style scoped>
	.bar {
		height: 80vh;
		overflow-x: hidden;
	}
</style>