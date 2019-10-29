/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";

import { apolloClient } from "../apolloClient";
import * as mutations from "./mutations/mutation";
import * as queries from "./queries/query";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isAuth: false,
		token: null,
		userId: null,
		tokenExp: null,
		loading: false,
		selectedEvent: null,
		events: [],
		bookings: []
	},
	mutations: {
		setTokenAndUserId: (state, { token, userId, tokenExp }) => {
			state.token = token;
			state.tokenExp = tokenExp;
			state.userId = userId;
		},
		setIsAuth: (state, payload) => {
			state.isAuth = payload;
		},
		setEvents: (state, payload) => {
			state.events = payload.map(event => event);
		},
		updateEvents: (state, payload) => {
			state.events.push(payload);
		},
		setBookings: (state, payload) => {
			state.bookings = payload.map(booking => booking);
		},
		updateBookings: (state, payload) => {
			state.bookings.push(payload);
		},
		deleteBooking: (state, payload) => {
			state.bookings = state.bookings.filter(booking => {
				return booking.id !== payload;
			});
		},
		setSelectedEvent: (state, payload) => {
			state.selectedEvent = payload;
		}
	},
	actions: {
		login: async ({ commit }, { email, password }) => {
			const variables = {
				email,
				password
			};
			try {
				const response = await apolloClient.query({
					query: queries.LOGIN_USER_QUERY,
					variables
				});
				commit("setTokenAndUserId", response.data.login);
				commit("setIsAuth", true);
				router.push("/events");
			} catch (err) {
				console.log(err);
			}
		},
		signUp: async (context, payload) => {
			const variables = {
				data: {
					email: payload.email,
					password: payload.password
				}
			};
			try {
				await apolloClient.mutate({
					mutation: mutations.CREATE_USER_MUTATION,
					variables
				});
			} catch (err) {
				console.log(err.networkError.result);
			}
		},
		signout: async ({ commit }) => {
			commit("setTokenAndUserId", {
				token: null,
				userId: null,
				tokenExp: null
			});
			commit("setIsAuth", false);
			commit("setBookings", []);
			apolloClient.resetStore();
			router.push("/auth");
		},
		createEvent: async (
			{ commit, state },
			{ title, description, price, date }
		) => {
			const variables = {
				data: {
					title,
					description,
					price,
					date
				}
			};
			console.log(state.events);
			try {
				const response = await apolloClient.mutate({
					mutation: mutations.CREATE_EVENT_MUTATION,
					variables,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					},
					update: (proxy, { data: { createEvent } }) => {
						const data = proxy.readQuery({ query: queries.FETCH_EVENTS_QUERY });
						data.events.push(createEvent);
						proxy.writeQuery({ query: queries.FETCH_EVENTS_QUERY, data });
					}
				});
				commit("updateEvents", response.data.createEvent);
			} catch (error) {
				console.log(error.networkError.result);
			}
		},
		fetchEvents: async ({ commit, state }) => {
			try {
				state.loading = true;
				const response = await apolloClient.query({
					query: queries.FETCH_EVENTS_QUERY
				});
				state.loading = false;
				commit("setEvents", response.data.events);
			} catch (error) {
				state.loading = false;
				console.log(error.networkError.result);
			}
		},
		bookAnEvent: async ({ commit, state }, { eventId }) => {
			const variables = {
				data: {
					eventId
				}
			};
			try {
				const response = await apolloClient.mutate({
					mutation: mutations.CREATE_BOOKING_MUTATION,
					variables,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					},
					update: (proxy, { data: { bookEvent } }) => {
						try {
							const data = proxy.readQuery({
								query: queries.FETCH_BOOKINGS_QUERY
							});
							data.bookings.push(bookEvent);
							proxy.writeQuery({ query: queries.FETCH_BOOKINGS_QUERY, data });
						} catch (error) {
							console.log(error);
						}
					}
				});
				commit("updateBookings", response.data.bookEvent);
			} catch (err) {
				console.log(err);
			}
		},
		fetchBookings: async ({ commit, state }) => {
			try {
				state.loading = true;
				const response = await apolloClient.query({
					query: queries.FETCH_BOOKINGS_QUERY,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					}
				});
				state.loading = false;
				commit("setBookings", response.data.bookings);
			} catch (err) {
				state.loading = false;
				console.log(err);
			}
		},
		cancelBooking: async ({ commit, state }, { bookingId }) => {
			const variables = {
				bookId: bookingId
			};

			try {
				state.loading = true;
				await apolloClient.mutate({
					mutation: mutations.CANCEL_BOOKING_MUTATION,
					variables,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					},
					update: (proxy, { data: { cancelBooking } }) => {
						const data = proxy.readQuery({
							query: queries.FETCH_BOOKINGS_QUERY
						});
						const index = data.bookings.findIndex(
							booking => booking.id === cancelBooking.id
						);
						data.bookings.splice(index, 1);

						proxy.writeQuery({ query: queries.FETCH_BOOKINGS_QUERY, data });
					}
				});
				state.loading = false;
				commit("deleteBooking", bookingId);
			} catch (err) {
				state.loading = false;
				console.log(err);
			}
		},
		initSetSelectedEvent: ({ commit }, payload) => {
			commit("setSelectedEvent", payload);
		},
		initUnsetSelectedEvent: ({ commit }) => {
			commit("setSelectedEvent", null);
		}
	},
	modules: {},
	getters: {}
});
