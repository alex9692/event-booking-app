<template>
	<app-modal modalTitle="Update event:" modalId="bv-modal-update-event" key="update-modal">
		<app-event-form modalId="bv-modal-update-event" :selectedEvent="selectedEvent" type="update"></app-event-form>
	</app-modal>
</template>

<script>
	import Modal from "../../Modal/Modal";
	import EventForm from "../EventForm/EventForm";
	import { mapState } from "vuex";
	export default {
		components: {
			"app-modal": Modal,
			"app-event-form": EventForm
		},
		computed: {
			...mapState(["selectedEvent"])
		}
	};
</script>