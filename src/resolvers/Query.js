import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Query = {
	events(parent, args, { prisma }, info) {
		return prisma.query.events(null, info);
	},
	users(parent, args, { prisma }, info) {
		return prisma.query.users(null, info);
	},
	async bookings(parent, args, { prisma, request }, info) {
		const { userId } = request;

		const userExists = await prisma.exists.User({ id: userId });
		if (!userExists) throw new Error("user doesn't exists");

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
	async login(parent, args, { prisma }, info) {
		const { email, password } = args;

		const user = await prisma.query.user({ where: { email } }, "{id password}");
		if (!user || !(await bcrypt.compare(password, user.password)))
			throw new Error("incorrect email or password");

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
