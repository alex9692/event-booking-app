<template>
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
</template>

<script>
	import Modal from "../../Modal/Modal";
	export default {
		components: {
			"app-modal": Modal
		},
		data() {
			return {
				title: "",
				description: "",
				price: "",
				date: ""
			};
		},
		methods: {
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
			hideCreateEventModal() {
				this.$bvModal.hide("bv-modal-create-event");
			}
		}
	};
</script>