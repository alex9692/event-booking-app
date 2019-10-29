<template>
	<div>
		<div v-if="bookings.length===0">
			<h1 class="display-4 text-center">No Bookings found!</h1>
		</div>
		<div v-else>
			<app-booking v-for="booking in bookings" :key="booking.id" :booking="booking"></app-booking>
		</div>
	</div>
</template>

<script>
	import Booking from "../Booking";

	export default {
		components: {
			"app-booking": Booking
		},
		props: ["bookings"]
	};
</script>