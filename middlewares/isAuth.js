import jwt from "jsonwebtoken";

export const authMiddleware = async (
	resolve,
	parent,
	args,
	{ prisma, request, response },
	info
) => {
	const authHeaders = request.headers.authorization;
	if (!authHeaders) {
		return response.status(401).json({
			status: "fail",
			message: "Authentication required!! Please login"
		});
	}
	const token = authHeaders.split(" ")[1];
	if (!token) {
		return response.status(401).json({
			status: "fail",
			message: "Authentication required!! Please login"
		});
	}
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "secret");
	} catch (error) {
		return response.status(401).json({
			status: "fail",
			message: "Authentication required!! Please login"
		});
	}

	const user = await prisma.exists.User({ id: decodedToken.userId });
	if (!user) {
		return response.status(401).json({
			status: "fail",
			message: "Authentication required!! Please login"
		});
	}

	request.userId = decodedToken.userId;
	return resolve();
};
