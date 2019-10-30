import { authMiddleware } from "./isAuth";

export const auth = {
	Mutation: {
		createEvent: authMiddleware,
		bookEvent: authMiddleware,
		cancelBooking: authMiddleware,
		updateEvent: authMiddleware
	},
	Query: {
		bookings: authMiddleware
	}
};
