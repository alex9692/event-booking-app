<template>
	<div>
		<b-modal :id="modalId" hide-footer>
			<template v-slot:modal-title>{{modalTitle}}</template>
			<slot></slot>
		</b-modal>
	</div>
</template>

<script>
	export default {
		props: ["modalTitle", "modalId"]
	};
</script>