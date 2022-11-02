const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Events {
		_id: ID
		eventName: String
		description: String
		date: String
		time: String
		location: String
		numberPlayersNeeded: Int
		organizerName: String
		attending: [User]
	}

	type User {
		_id: ID
		username: String
		email: String
		events: [Events]
	}

	type Auth {
		token: ID
		user: User
	}

	type Query {
		events: [Events]
		event(_id: ID!): Events
		userEvents(username: String): Events
		me: User
		user(username: String!): User
		users: [User]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		updateUser(username: String, email: String, password: String): User
		login(email: String!, password: String!): Auth
		addEvent(
			_id: ID!
			eventName: String!
			description: String!
			date: String!
			time: String!
			location: String!
			numberPlayersNeeded: Int!
			organizerName: String
			attending: [User]
		): Events
		updateEvent(
			_id: ID!
			eventName: String!
			description: String!
			date: String!
			time: String!
			location: String!
			numberPlayersNeeded: Int!
			organizerName: String
			attending: [User]
		): Events
		deleteEvent(_id: ID!): Events
		addPlayer(eventsId: ID!): Events
	}
`;

module.exports = typeDefs;
