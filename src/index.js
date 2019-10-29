import { GraphQLServer } from "graphql-yoga";

import { resolvers } from "./resolvers";
import { prisma } from "./prisma";

import { auth } from "../middlewares/setupAuth";

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context(req) {
		const request = req.request;
		const response = req.response;
		return {
			prisma,
			request,
			response
		};
	},
	middlewares: [auth]
});

const options = {
	port: 3333,
	cors: {
		credentials: true,
		origin: ["http://localhost:8080"]
	}
};

server.start(options, () => {
	console.log("server is up");
});
