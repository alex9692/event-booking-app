<template>
	<b-row>
		<b-col cols="8" offset-md="2">
			<div class="text-center" v-if="loading">
				<b-spinner variant="info" label="Spinning" style="width: 5rem; height: 5rem;"></b-spinner>
			</div>
			<div v-else>
				<app-event v-for="event in events" :key="event.id" :event="event"></app-event>
			</div>
		</b-col>
	</b-row>
</template>

<script>
	import Event from "../Event";

	export default {
		components: {
			"app-event": Event
		},
		props: ["events", "loading"],
		mounted() {
			this.$store.dispatch("fetchEvents");
		}
	};
</script>