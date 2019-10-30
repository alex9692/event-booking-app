import { authMiddleware } from "./isAuth";

export const auth = {
	Mutation: {
		createEvent: authMiddleware,
		bookEvent: authMiddleware,
		cancelBooking: authMiddleware,
		updateEvent: authMiddleware,
		updateUser: authMiddleware
	},
	Query: {
		user: authMiddleware,
		bookings: authMiddleware
	}
};
