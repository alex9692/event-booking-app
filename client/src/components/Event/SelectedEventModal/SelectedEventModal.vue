<template>
	<app-modal :modalTitle="selectedTitle" modalId="bv-modal-show-details" key="details-modal">
		<div v-if="selectedEvent">
			<p>{{selectedEvent.description}}</p>
			<p style="fontSize: 12px">${{selectedEvent.price}} - {{formattedDate(selectedEvent.date)}}</p>
			<b-button
				class="mr-3"
				variant="success"
				@click="bookEvent"
			>{{isAuth ? 'Book Now': 'Login to book'}}</b-button>
			<b-button class="mx-1" variant="warning" @click="hideDetails">Cancel</b-button>
		</div>
	</app-modal>
</template>

<script>
	import Modal from "../../Modal/Modal";

	export default {
		components: {
			"app-modal": Modal
		},
		props: ["selectedEvent", "isAuth"],
		computed: {
			selectedTitle() {
				if (this.selectedEvent) {
					return this.selectedEvent.title.toUpperCase();
				}
				return "";
			}
		},
		methods: {
			formattedDate(date) {
				return new Date(date).toLocaleDateString("en-US");
			},
			bookEvent() {
				if (!this.isAuth) {
					this.$router.push("/auth");
				} else {
					this.$store.dispatch("bookAnEvent", {
						eventId: this.selectedEvent.id
					});
				}
				this.$bvModal.hide("bv-modal-show-details");
				this.$store.dispatch("initUnsetSelectedEvent");
			},
			hideDetails() {
				this.$bvModal.hide("bv-modal-show-details");
				this.$store.dispatch("initUnsetSelectedEvent");
			}
		}
	};
</script>