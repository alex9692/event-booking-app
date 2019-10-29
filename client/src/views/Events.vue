<template>
	<div>
		<b-row v-if="isAuth">
			<b-col cols="4" offset-md="4">
				<b-card class="text-center" border-variant="primary">
					<b-card-text class="mt-5 mb-3">Share your own events!</b-card-text>
					<b-button variant="primary" id="show-btn" @click="showCreateEventModal">Create Event</b-button>
				</b-card>
				<hr />
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="8" offset-md="2">
				<div class="text-center" v-if="loading">
					<b-spinner variant="info" label="Spinning" style="width: 5rem; height: 5rem;"></b-spinner>
				</div>
				<div v-else>
					<app-event
						v-for="event in events"
						:key="event.id"
						:event="event"
						@showDetails="showDetailsModal"
					></app-event>
				</div>
			</b-col>
		</b-row>

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

		<app-modal modalTitle="Create a new event:" modalId="bv-modal-create-event" key="create-modal">
			<b-form @submit.prevent="onSubmit">
				<b-form-group id="input-group-1" label="Title" label-for="title">
					<b-form-input type="text" id="title" v-model="title" placeholder="Enter the title"></b-form-input>
				</b-form-group>
				<b-form-group id="input-group-2" label="Description" label-for="description">
					<b-form-textarea
						id="description"
						v-model="description"
						placeholder="Enter description"
						rows="3"
						max-rows="6"
					></b-form-textarea>
				</b-form-group>
				<b-form-group id="input-group-3" label="Date" label-for="date">
					<b-form-input type="date" id="date" v-model="date"></b-form-input>
				</b-form-group>
				<b-form-group id="input-group-4" label="Price" label-for="price">
					<b-form-input type="text" id="price" v-model="price" placeholder="Enter the price"></b-form-input>
				</b-form-group>
				<b-button class="mr-3" variant="success" type="submit">Submit</b-button>
				<b-button class="mx-1" variant="warning" @click="hideCreateEventModal">Cancel</b-button>
			</b-form>
		</app-modal>
	</div>
</template>

<script>
	import Modal from "../components/Modal/Modal";
	import Event from "../components/Event/Event";
	import { mapState } from "vuex";

	export default {
		components: {
			"app-modal": Modal,
			"app-event": Event
		},
		data() {
			return {
				title: "",
				description: "",
				price: "",
				date: "",
				selectedEvent: null
			};
		},
		computed: {
			...mapState(["isAuth", "events", "userId", "loading"]),
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
			async onSubmit() {
				if (
					this.title.trim().length === 0 ||
					+this.price <= 0 ||
					this.description.trim().length === 0
				) {
					return;
				}

				await this.$store.dispatch("createEvent", {
					title: this.title,
					description: this.description,
					price: +this.price,
					date: this.date
				});
				this.$bvModal.hide("bv-modal-create-event");
				this.title = "";
				this.description = "";
				this.price = "";
				this.date = "";
			},
			showCreateEventModal() {
				this.$bvModal.show("bv-modal-create-event");
			},
			hideCreateEventModal() {
				this.$bvModal.hide("bv-modal-create-event");
			},
			hideDetails() {
				this.$bvModal.hide("bv-modal-show-details");
				this.selectedEvent = null;
			},
			showDetailsModal(data) {
				this.selectedEvent = data;
				this.$bvModal.show("bv-modal-show-details");
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
				this.selectedEvent = null;
			}
		},
		mounted() {
			this.$store.dispatch("fetchEvents");
		}
	};
</script>