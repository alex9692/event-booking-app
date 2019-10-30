<template>
	<div>
		<b-row>
			<b-col cols="6" offset-md="3">
				<b-form @submit.prevent="onSubmit">
					<h1 class="display-4 mb-3 text-center">
						<p>
							<v-icon :name="isLogin ? 'user' :'user-plus'" class="user-icon"></v-icon>
						</p>
						{{ isLogin ? 'Sign in' : 'Sign up' }}
					</h1>
					<hr />
					<b-form-group id="input-group-1" label-for="email" label="E-Mail">
						<b-form-input id="email" type="email" placeholder="Enter your email address" v-model="email"></b-form-input>
					</b-form-group>
					<b-form-group id="input-group-2" label-for="password" label="Password">
						<b-form-input
							id="password"
							type="password"
							placeholder="Enter your password"
							v-model="password"
						></b-form-input>
					</b-form-group>
					<b-button variant="primary" type="submit">Submit</b-button>
					<b-button
						class="ml-3"
						@click="isLogin=!isLogin"
						variant="primary"
					>{{ isLogin ? 'Switch to Signup': 'Switch to Login' }}</b-button>
				</b-form>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				password: "",
				isLogin: false
			};
		},
		methods: {
			onSubmit() {
				if (
					this.email.trim().length === 0 ||
					this.password.trim().length === 0
				) {
					return;
				}
				if (!this.isLogin) {
					this.$store.dispatch("signUp", {
						email: this.email,
						password: this.password
					});
					this.isLogin = !this.isLogin;
				} else {
					this.$store.dispatch("login", {
						email: this.email,
						password: this.password
					});
				}
			}
		}
	};
</script>

<style scoped>
	.user-icon {
		width: 10rem;
		height: 10rem;
	}
</style>