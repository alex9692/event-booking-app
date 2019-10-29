import { authMiddleware } from "./isAuth";

export const auth = {
	Mutation: {
		createEvent: authMiddleware,
		bookEvent: authMiddleware,
		cancelBooking: authMiddleware
	},
	Query: {
		bookings: authMiddleware
	}
};
