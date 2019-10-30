<template>
	<simplebar
		class="bar"
		:class="{'bar-auth': isAuth}"
		data-simplebar-auto-hide="false"
	>
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
	</simplebar>
</template>

<script>
	import Event from "../Event";
	import simplebar from "simplebar-vue";
	import "simplebar/dist/simplebar.min.css";

	export default {
		components: {
			"app-event": Event,
			simplebar
		},
		props: ["events", "loading", "isAuth"],
		mounted() {
			this.$store.dispatch("fetchEvents");
		}
	};
</script>

<style scoped>
	.bar {
		height: 85vh;
		overflow-x: hidden;
	}
	.bar-auth {
		height: 65vh;
	}
</style>