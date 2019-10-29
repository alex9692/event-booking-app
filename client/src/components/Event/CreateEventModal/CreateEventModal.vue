<template>
	<app-modal modalTitle="Create a new event:" modalId="bv-modal-create-event" key="create-modal">
		<app-event-form modalId="bv-modal-create-event" :selectedEvent="selectedEvent" type="create"></app-event-form>
	</app-modal>
</template>

<script>
	import Modal from "../../Modal/Modal";
	import EventForm from "../EventForm/EventForm";
	export default {
		components: {
			"app-modal": Modal,
			"app-event-form": EventForm
		},
		computed: {
			selectedEvent() {
				return {
					title: "",
					description: "",
					price: "",
					date: ""
				};
			}
		}
	};
</script>