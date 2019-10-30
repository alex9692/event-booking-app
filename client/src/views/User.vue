<template>
	<div>
		<b-row>
			<b-col cols="8" offset-md="2">
				<h1 class="display-4 text-center">My Profile</h1>
				<hr />
				<b-card no-body>
					<b-tabs pills card vertical>
						<b-tab title="Account Details" active>
							<b-row class="mb-3 ml-5">
								<b-col cols="3">
									<b-card-text>User Name:</b-card-text>
								</b-col>
								<b-col cols="8">
									<b-card-text>{{userName}}</b-card-text>
								</b-col>
							</b-row>
							<b-row class="my-3 ml-5">
								<b-col cols="3">
									<b-card-text>User Email:</b-card-text>
								</b-col>
								<b-col cols="8">
									<b-card-text>{{email}}</b-card-text>
								</b-col>
							</b-row>
							<b-row class="my-3 ml-5">
								<b-col cols="3">
									<b-card-text>Created At:</b-card-text>
								</b-col>
								<b-col cols="8">
									<b-card-text>{{user ? new Date(user.createdAt).toLocaleDateString() : ""}}</b-card-text>
								</b-col>
							</b-row>
						</b-tab>
						<b-tab title="Edit Account">
							<b-row>
								<b-col cols="6">
									<b-form @submit.prevent="onSubmit">
										<b-form-group
											id="input-1"
											label-for="email"
											label="Email"
											description="Dont leave this empty and provide a valid email."
										>
											<b-form-input
												id="email"
												type="email"
												v-model="email"
												placeholder="Enter your email address"
											></b-form-input>
										</b-form-group>
										<b-form-group
											id="input-2"
											label-for="password"
											label="Password"
											description="Password length must be greater than 4 characters."
										>
											<b-form-input
												id="password"
												type="password"
												v-model="password"
												placeholder="Enter your password"
											></b-form-input>
										</b-form-group>
										<b-button variant="primary" type="submit">
											<span v-if="loading">
												<b-spinner small class="mr-2"></b-spinner>Loading...
											</span>
											<span v-else>Update</span>
										</b-button>
									</b-form>
								</b-col>
							</b-row>
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				email: "",
				password: ""
			};
		},
		computed: {
			...mapState(["user", "userName", "loading"])
		},
		methods: {
			onSubmit() {
				if (
					this.email.trim().length === 0 ||
					this.password.trim().length <= 4
				) {
					return;
				}

				const updatedData = {
					password: this.password
				};
				if (this.user.email !== this.email) {
					updatedData["email"] = this.email;
				}
				this.$store.dispatch("updateUserDetails", {
					...updatedData
				});
			}
		},
		async mounted() {
			await this.$store.dispatch("getUserDetails");
			this.email = this.user.email;
		}
	};
</script>

<style scoped>
	.divider {
		border-right: 1px solid #6c757d;
	}
</style>