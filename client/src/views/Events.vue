<template>
	<div>
		<b-row v-if="isAuth">
			<b-col cols="4" offset-md="4">
				<b-card class="text-center" border-variant="primary">
					<b-card-text class="mt-5 mb-3">Share your own events!</b-card-text>
					<b-button variant="primary" id="show-btn" @click="showCreateEventModal">Create Event</b-button>
				</b-card>
			</b-col>
		</b-row>
		<hr />
		<app-event-details :events="events" :loading="loading"></app-event-details>
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

	import { mapState,mapGetters } from "vuex";

	export default {
		components: {
			"app-event-details": EventDetails,
			"app-selected-event-modal": SelectedEventModal,
			"app-create-event-modal": CreateEventModal,
			"app-update-event-modal": UpdateEventModal
		},
		computed: {
			...mapState(["isAuth", "events", "selectedEvent", "loading"]),
			...mapGetters(['updatedEvents'])
		},
		methods: {
			showCreateEventModal() {
				this.$bvModal.show("bv-modal-create-event");
			}
		}
	};
</script>