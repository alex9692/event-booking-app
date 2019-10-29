import bcrypt from "bcryptjs";

export const Mutation = {
	async createEvent(parent, args, { prisma, request }, info) {
		const { data } = args;
		const { userId } = request;
		const userExist = await prisma.exists.User({ id: userId });
		if (!userExist) throw new Error("user doesn't exist");
		
		return prisma.mutation.createEvent(
			{
				data: {
					...data,
					user: {
						connect: {
							id: userId
						}
					},
					date: new Date(data.date)
				}
			},
			info
		);
	},
	async createUser(parent, args, { prisma, response }, info) {
		const { email, password } = args.data;

		const userExist = await prisma.exists.User({ email });
		if (userExist) {
			return response
				.status(400)
				.json({ status: "fail", message: "user already exists." });
		}

		const hashPassword = await bcrypt.hash(password, 12);

		return prisma.mutation.createUser(
			{
				data: {
					email,
					password: hashPassword
				}
			},
			info
		);
	},
	async bookEvent(parent, args, { prisma, request }, info) {
		const { eventId } = args.data;
		const { userId } = request;

		const eventExist = await prisma.exists.Event({ id: eventId });
		const userExist = await prisma.exists.User({ id: userId });
		if (!eventExist || !userExist) {
			throw new Error("user or post doesn't exist");
		}
		return prisma.mutation.createBooking(
			{
				data: {
					event: {
						connect: {
							id: eventId
						}
					},
					user: {
						connect: {
							id: userId
						}
					}
				}
			},
			info
		);
	},
	async cancelBooking(parent, args, { prisma, request }, info) {
		const { bookId } = args;
		const { userId } = request;

		const user = await prisma.exists.User({ id: userId });
		if (!user) throw new Error("user doesn't exist");

		const bookingExist = await prisma.exists.Booking({ id: bookId });
		if (!bookingExist) throw new Error("booking doesn't exist");

		return prisma.mutation.deleteBooking({ where: { id: bookId } }, info);
	}
};
