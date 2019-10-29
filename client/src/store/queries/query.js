import gql from "graphql-tag";

export const LOGIN_USER_QUERY = gql`
	query($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			userId
			token
			tokenExp
		}
	}
`;

export const FETCH_EVENTS_QUERY = gql`
	query {
		events {
			id
			title
			description
			price
			date
			user {
				id
				email
			}
		}
	}
`;

export const FETCH_BOOKINGS_QUERY = gql`
	query {
		bookings {
			id
			createdAt
			event {
				id
				title
				date
				price
			}
		}
	}
`;
