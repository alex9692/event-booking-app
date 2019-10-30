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
		user: null,
		userId: null,
		userName: "",
		tokenExp: null,
		loading: false,
		updateLoading: false,
		selectedEvent: null,
		events: [],
		bookings: []
	},
	mutations: {
		setTokenAndUser: (state, { token, userId, tokenExp, userName }) => {
			state.token = token;
			state.tokenExp = tokenExp;
			state.userId = userId;
			state.userName = userName;
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
		},
		updateSelectedEvent: (state, payload) => {
			const old = state.events.find(event => event.id === payload.id);
			Object.assign(old, payload);
		},
		setUser: (state, payload) => {
			state.user = payload;
		},
		updateUser: (state, payload) => {
			Object.assign(state.user, payload);
			if (payload.email) {
				state.userName = payload.email.split("@")[0];
			}
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
				commit("setTokenAndUser", response.data.login);
				commit("setIsAuth", true);
				router.push("/events");
			} catch (error) {
				console.log(error);
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
			} catch (error) {
				console.log(error);
			}
		},
		signout: async ({ commit }) => {
			commit("setTokenAndUser", {
				token: null,
				userId: null,
				tokenExp: null,
				userName: ""
			});
			commit("setIsAuth", false);
			commit("setBookings", []);
			commit("setUser", null);
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
				console.log(error);
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
				console.log(error);
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
			} catch (error) {
				console.log(error);
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
			} catch (error) {
				state.loading = false;
				console.log(error);
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
			} catch (error) {
				state.loading = false;
				console.log(error);
			}
		},
		initSetSelectedEvent: ({ commit }, payload) => {
			commit("setSelectedEvent", payload);
		},
		initUnsetSelectedEvent: ({ commit }) => {
			commit("setSelectedEvent", null);
		},
		updateEvent: async ({ commit, state }, { updatedData, eventId }) => {
			const variables = {
				data: {
					...updatedData
				},
				eventId
			};
			try {
				state.updateLoading = true;
				const response = await apolloClient.mutate({
					mutation: mutations.UPDATE_EVENT_MUTATION,
					variables,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					},
					update: (proxy, { data: { updateEvent } }) => {
						const data = proxy.readQuery({
							query: queries.FETCH_EVENTS_QUERY
						});
						const index = data.events.findIndex(
							event => event.id === updateEvent.id
						);
						data.events[index] = updateEvent;
						proxy.writeQuery({ query: queries.FETCH_EVENTS_QUERY, data });
					}
				});
				state.updateLoading = false;
				commit("updateSelectedEvent", response.data.updateEvent);
				commit("setSelectedEvent", null);
			} catch (error) {
				state.updateLoading = false;
				console.log(error);
			}
		},
		getUserDetails: async ({ commit, state }) => {
			try {
				const response = await apolloClient.query({
					query: queries.FETCH_USER_QUERY,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					}
				});

				commit("setUser", response.data.user);
			} catch (error) {
				console.log(error);
			}
		},
		updateUserDetails: async ({ commit, state }, payload) => {
			const variables = {
				data: { ...payload }
			};

			try {
				state.loading = true;
				const response = await apolloClient.mutate({
					mutation: mutations.UPDATE_USER_MUTATION,
					variables,
					context: {
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					},
					update: (proxy, { data: { updateUser } }) => {
						const data = proxy.readQuery({ query: queries.FETCH_USER_QUERY });
						Object.assign(data.user, updateUser);
						proxy.writeQuery({ query: queries.FETCH_USER_QUERY, data });
					}
				});
				state.loading = false;
				commit("updateUser", response.data.updateUser);
			} catch (error) {
				state.loading = false;
				console.log(error);
			}
		}
	},
	modules: {},
	getters: {}
});
