<template>
	<b-card no-body class="mb-3 p-2" border-variant="primary">
		<b-row align-h="between">
			<b-col cols="auto" class="mr-auto">
				<b-card-text
					class="mt-2"
				>{{booking.event.title}} - {{new Date(booking.createdAt).toLocaleDateString('en-US')}}</b-card-text>
			</b-col>
			<b-col cols="auto">
				<b-button variant="outline-light" class="py-1 px-2 mr-2" @click="cancelBooking">
					<v-icon class="delete-icon" name="x-circle"></v-icon>
				</b-button>
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

<style scoped>
	.delete-icon {
		width: 1.5rem;
		cursor: pointer;
		color: #007bff;
		transition: all 200ms;
	}
	.btn:hover .delete-icon {
		color: #0069d9;
		transform: rotateZ(90deg);
	}
	.btn-outline-light:hover {
		background-color: #fff;
		border-color: #fff;
	}
</style>