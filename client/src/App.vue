<template>
	<div>
		<appNavBar></appNavBar>
		<div class="mx-5 my-4">
			<router-view />
		</div>
	</div>
</template>

<script>
	import NavBar from "./components/Navigation/MainNavigation";
	export default {
		components: {
			appNavBar: NavBar
		}
	};
</script>

<style>
	body {
		padding: 0;
		margin: 0;
	}
</style>
