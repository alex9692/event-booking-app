import bcrypt from "bcryptjs";

export const Mutation = {
	async createEvent(parent, args, { prisma, request, response }, info) {
		const { data } = args;
		const { userId } = request;
		const userExist = await prisma.exists.User({ id: userId });
		if (!userExist) {
			return response
				.status(404)
				.json({ status: "fail", message: "user doesn't exist." });
		}

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
				.json({ status: "fail", message: "user already exist." });
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
	async bookEvent(parent, args, { prisma, request, response }, info) {
		const { eventId } = args.data;
		const { userId } = request;

		const eventExist = await prisma.exists.Event({ id: eventId });
		const userExist = await prisma.exists.User({ id: userId });
		if (!eventExist || !userExist) {
			return response
				.status(404)
				.json({ status: "fail", message: "user or post doesn't exist." });
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
	async cancelBooking(parent, args, { prisma, request, response }, info) {
		const { bookId } = args;
		const { userId } = request;

		const user = await prisma.exists.User({ id: userId });
		const bookingExist = await prisma.exists.Booking({ id: bookId });
		if (!user || !bookingExist) {
			return response
				.status(404)
				.json({ status: "fail", message: "user or booking doesn't exist." });
		}

		return prisma.mutation.deleteBooking({ where: { id: bookId } }, info);
	},
	async updateEvent(parent, args, { prisma, request, response }, info) {
		const { eventId, data } = args;
		const { userId } = request;

		const eventExist = await prisma.exists.Event({ id: eventId });
		const userExist = await prisma.exists.User({ id: userId });
		if (!eventExist || !userExist) {
			return response
				.status(404)
				.json({ status: "fail", message: "user or post doesn't exist." });
		}

		const userPost = await prisma.query.events(
			{
				where: {
					AND: [
						{
							user: { id: userId }
						},
						{
							id: eventId
						}
					]
				}
			},
			"{ id }"
		);
		if (userPost.length === 0) {
			return response
				.status(403)
				.json({ status: "fail", message: "you can only edit your own events" });
		}

		return prisma.mutation.updateEvent(
			{
				where: { id: eventId },
				data: { ...data }
			},
			info
		);
	}
};
