<template>
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
</template>

<script>
	export default {
		data() {
			return {
				title: this.selectedEvent.title,
				description: this.selectedEvent.description,
				price: this.selectedEvent.price,
				date: this.selectedEvent.date.split("T")[0]
			};
		},
		props: ["modalId", "selectedEvent", "type"],
		methods: {
			async onSubmit() {
				if (
					this.title.trim().length === 0 ||
					+this.price <= 0 ||
					this.description.trim().length === 0
				) {
					return;
				}

				if (this.type === "create") {
					await this.$store.dispatch("createEvent", {
						title: this.title,
						description: this.description,
						price: +this.price,
						date: this.date
					});
					this.$bvModal.hide(this.modalId);
					this.title = "";
					this.description = "";
					this.price = "";
					this.date = "";
				} else {
					const formData = {
						title: this.title,
						price: +this.price,
						date: this.date,
						description: this.description
					};
					const updates = {};
					Object.keys(formData).forEach(key => {
						if (key === "date") {
							this.selectedEvent[key] = this.selectedEvent[key].split(
								"T"
							)[0];
						}
						if (formData[key] !== this.selectedEvent[key]) {
							updates[key] = formData[key];
						}
					});
					if (Object.keys(updates).length !== 0) {
						await this.$store.dispatch("updateEvent", {
							updatedData: updates,
							eventId: this.selectedEvent.id
						});
						this.$bvModal.hide(this.modalId);
					}
				}
			},
			hideCreateEventModal() {
				this.$bvModal.hide(this.modalId);
			}
		}
	};
</script>