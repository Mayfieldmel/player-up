const { User, Events } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ username: context.user.username })
          .select("-__v -password")
          .populate("events");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => await User.find({}).populate("events"),
    user: async (parent, { username }) => {
      return await User.findOne({ username: username }).populate("events");
    },
    events: async () => {
      return await Events.find({}).sort({ createdAt: -1 });
    },
    event: async (parent, { _id }) => {
      return Events.findOne({ _id });
    },
    eventsByUser: async(parent, {organizerName}) => {      
        return await Events.find({organizerName})
   }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addPlayer: async (parent, { eventId }, context) => {
      if (context.user) {
        const updatedEvent = await Events.findOneAndUpdate(
          { _id: eventId },
          { $addToSet: { attending: context.user._id } },
          { new: true }
        ).populate("attending");
        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addEvent: async (
      parent,
      {
        eventName,
        description,
        date,
        time,
        location,
        numberPlayersNeeded,
        attending,
      },
      context
    ) => {
      if (context.user) {
        const event = await Events.create({
          eventName,
          description,
          date,
          time,
          location,
          numberPlayersNeeded,
          organizerName: context.user.username,
          attending,
        });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } },
          { new: true, runValidators: true }
        ).populate("events");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateEvent: async (parent, args, context) => {
      if (context.user) {
        const updatedEvent = await Events.findOneAndUpdate(
          { _id: args.eventId },
          args,
          { new: true, runValidators: true }
        );
        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const deleteEvent = await Events.deleteOne({ _id: eventId });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: { eventId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addCommitment: async (parent, { eventId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { commitments: eventId } },
          { new: true }
        ).populate("commitments");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
