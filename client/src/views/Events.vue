<template>
	<div>
		<b-row v-if="isAuth">
			<b-col cols="4" offset-md="4">
				<b-card class="text-center" border-variant="primary">
					<v-icon class="clipboard-icon" name="share"></v-icon>
					<b-card-text class="mt-3 mb-3">Share your own events!</b-card-text>
					<b-button variant="primary" id="show-btn" @click="showCreateEventModal">Create Event</b-button>
				</b-card>
			</b-col>
		</b-row>
		<hr />
		<app-event-details :events="events" :loading="loading" :isAuth="isAuth"></app-event-details>
		<app-selected-event-modal :selectedEvent="selectedEvent" :isAuth="isAuth"></app-selected-event-modal>
		<app-create-event-modal></app-create-event-modal>
		<app-update-event-modal></app-update-event-modal>
	</div>
</template>

<script>
	import EventDetails from "../components/Event/EventDetails/EventDetails";
	import SelectedEventModal from "../components/Event/SelectedEventModal/SelectedEventModal";
	import CreateEventModal from "../components/Event/CreateEventModal/CreateEventModal";
	import UpdateEventModal from "../components/Event/UpdateEventModal/UpdateEventModal";

	import { mapState } from "vuex";

	export default {
		components: {
			"app-event-details": EventDetails,
			"app-selected-event-modal": SelectedEventModal,
			"app-create-event-modal": CreateEventModal,
			"app-update-event-modal": UpdateEventModal
		},
		computed: {
			...mapState(["isAuth", "events", "selectedEvent", "loading"])
		},
		methods: {
			showCreateEventModal() {
				this.$bvModal.show("bv-modal-create-event");
			}
		}
	};
</script>

<style scoped>
	.clipboard-icon {
		width: 2.5rem;
		height: 2.5rem;
		color: #007bff;
	}
</style>