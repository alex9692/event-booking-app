<template>
	<b-row>
		<b-col cols="8" offset-md="2">
			<div class="text-center" v-if="loading">
				<b-spinner variant="info" label="Spinning" style="width: 5rem; height: 5rem;"></b-spinner>
			</div>
			<div v-else>
				<app-booking-control
					:showBookingDetails="showBookingDetails"
					@toggleBookingDetails="changeBookingDetails"
				></app-booking-control>
				<div v-if="showBookingDetails">
					<app-booking-details :bookings="bookings"></app-booking-details>
				</div>
				<div v-else>
					<app-booking-chart :bookings="bookings"></app-booking-chart>
				</div>
			</div>
		</b-col>
	</b-row>
</template>


<script>
	import { mapState } from "vuex";
	import BookingDetails from "../components/BookingDetails/BookingDetails";
	import BookingChart from "../components/BookingChart/BookingChart";
	import BookingControls from "../components/BookingControls/BookingControls";

	export default {
		components: {
			"app-booking-details": BookingDetails,
			"app-booking-chart": BookingChart,
			"app-booking-control": BookingControls
		},
		data() {
			return {
				showBookingDetails: true
			};
		},
		computed: {
			...mapState(["bookings", "loading"])
		},
		methods: {
			changeBookingDetails(data) {
				this.showBookingDetails = data;
			}
		},
		mounted() {
			this.$store.dispatch("fetchBookings");
		}
	};
</script>