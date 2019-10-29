<template>
	<b-card no-body class="mb-2 p-3" border-variant="primary">
		<b-row align-h="between">
			<b-col cols="auto" class="mr-auto">
				<b-card-text>{{booking.event.title}} - {{new Date(booking.createdAt).toLocaleDateString('en-US')}}</b-card-text>
			</b-col>
			<b-col cols="auto" >
				<b-button variant="primary" @click="cancelBooking">Cancel</b-button>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	export default {
		props: ["booking"],
		methods: {
			cancelBooking() {
				this.$store.dispatch("cancelBooking", {
					bookingId: this.booking.id
				});
			}
		}
	};
</script>