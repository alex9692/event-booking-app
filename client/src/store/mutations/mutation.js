import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
	mutation($data: UserInput!) {
		createUser(data: $data) {
			id
			email
		}
	}
`;

export const CREATE_EVENT_MUTATION = gql`
	mutation($data: EventInput!) {
		createEvent(data: $data) {
			id
			title
			price
			date
			user {
				id
				email
			}
		}
	}
`;

export const CREATE_BOOKING_MUTATION = gql`
	mutation($data: BookingInput!) {
		bookEvent(data: $data) {
			id
			createdAt
			event {
				id
				title
			}
			user {
				id
				email
			}
		}
	}
`;

export const CANCEL_BOOKING_MUTATION = gql`
	mutation($bookId: ID!) {
		cancelBooking(bookId: $bookId) {
			id
			event {
				id
				title
			}
			user {
				id
				email
			}
		}
	}
`;

export const UPDATE_EVENT_MUTATION = gql`
	mutation($eventId: ID!, $data: UpdateEventInput!) {
		updateEvent(eventId: $eventId, data: $data) {
			id
			title
			price
			date
			description
			user {
				id
				email
			}
		}
	}
`;

export const UPDATE_USER_MUTATION = gql`
	mutation($data: UpdateUserInput!) {
		updateUser(data: $data) {
			id
			email
			createdAt
		}
	}
`