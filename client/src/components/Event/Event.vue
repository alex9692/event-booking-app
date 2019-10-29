<template>
	<b-card class="mb-4" border-variant="primary">
		<div class="d-flex w-100 justify-content-between">
			<div class="mt-2">
				<b-card-sub-title sub-title-text-variant="primary" class="mb-1">{{event.title.toUpperCase()}}</b-card-sub-title>
				<small>${{event.price}} - {{formattedDate(event.date)}}</small>
			</div>
			<small>
				<p v-if="userId === event.user.id">You are owner of this event.</p>
				<b-button v-if="userId !== event.user.id" variant="primary" @click="showDetails">View Details</b-button>
			</small>
		</div>
	</b-card>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		props: ["event"],
		computed: {
			...mapState(["userId"])
		},
		methods: {
			formattedDate(date) {
				return new Date(date).toLocaleDateString("en-US");
			},
			showDetails() {
				this.$store.dispatch("initSetSelectedEvent", this.event);
				this.$bvModal.show("bv-modal-show-details");
			}
		}
	};
</script>