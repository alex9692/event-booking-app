import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Query = {
	events(parent, args, { prisma }, info) {
		return prisma.query.events(null, info);
	},
	users(parent, args, { prisma }, info) {
		return prisma.query.users(null, info);
	},
	async bookings(parent, args, { prisma, request, response }, info) {
		const { userId } = request;

		const userExists = await prisma.exists.User({ id: userId });
		if (!userExists) {
			return response
				.status(404)
				.json({ status: "fail", message: "user doesn't exist." });
		}

		return prisma.query.bookings(
			{
				where: {
					user: {
						id: userId
					}
				}
			},
			info
		);
	},
	async login(parent, args, { prisma, response }, info) {
		const { email, password } = args;

		const user = await prisma.query.user({ where: { email } }, "{id password}");
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return response
				.status(404)
				.json({ status: "fail", message: "incorrect email or password." });
		}

		const token = jwt.sign(
			{
				userId: user.id
			},
			"secret",
			{ expiresIn: "1h" }
		);

		return {
			userId: user.id,
			token,
			tokenExp: 1
		};
	}
};
