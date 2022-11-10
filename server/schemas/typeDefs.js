const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Events {
    _id: ID
    eventName: String
    description: String
    date: String
    time: String
    location: String
    numberPlayersNeeded: String
    organizerName: String
    attending: [User]
  }

  type User {
    _id: ID
    username: String
    email: String
    events: [Events]
    commitments: [Events]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    events: [Events]
    event(_id: ID!): Events
    me: User
    user(username: String!): User
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addEvent(
      eventName: String!
      description: String!
      date: String!
      time: String!
      location: String!
      numberPlayersNeeded: String!
      organizerName: String
      attending: [String]
    ): Events
    updateEvent(
      eventId: ID
      eventName: String
      description: String
      date: String
      time: String
      location: String
      numberPlayersNeeded: String
      organizerName: String
      attending: [String]
    ): Events
    deleteEvent(eventId: ID!): Events
    addPlayer(eventId: ID!): Events
    addCommitment(eventId: ID!): User
  }
`;

module.exports = typeDefs;
