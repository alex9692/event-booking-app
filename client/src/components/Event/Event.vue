<template>
	<b-card no-body class="mb-3 p-2" border-variant="primary">
		<div class="d-flex w-100 justify-content-between">
			<div class="mt-2">
				<b-card-sub-title sub-title-text-variant="primary" class="mb-1">{{event.title.toUpperCase()}}</b-card-sub-title>
				<small>${{event.price}} - {{formattedDate(event.date)}}</small>
			</div>
			<small class="mt-2">
				<div v-if="userId === event.user.id">
					<span>
						You are owner of this event.
						<b-button variant="outline-primary" class="py-1 px-3">
							Edit
							<v-icon name="edit" class="mb-2 edit-icon"></v-icon>
						</b-button>
					</span>
				</div>
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

<style scoped>
	.edit-icon {
		width: 1.2rem;
		cursor: pointer;
		color: #007bff;
		transition: color 200ms;
	}
	.btn:hover .edit-icon {
		color: #fff;
	}
</style>