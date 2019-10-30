import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { RetryLink } from "apollo-link-retry";
import { ApolloLink } from "apollo-link";

const httpLink = createHttpLink({
	uri: "http://localhost:3333"
});
const retryLink = new RetryLink({
	attempts: { max: 5 },
	delay: {
		initial: 300,
		max: Infinity
	}
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
	link: ApolloLink.from([httpLink, errorLink, retryLink]),
	cache,
	connectToDevTools: true,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network"
		}
	}
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
	defaultClient: apolloClient
});
