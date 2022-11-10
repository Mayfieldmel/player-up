const db = require("./connection");
const { User, Events } = require("../models");

db.once("open", async () => {
  await Events.deleteMany({});

  const events = await Events.insertMany([
    {
      eventName: "Chess",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      date: "2022-12-15",
      time: "15:30",
      location: "Long Leaf Park",
      numberPlayersNeeded: "1",
      organizerName: "Joe",
    },
    {
      eventName: "Ultimate Frisbee",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      date: "2022-12-1",
      time: "15:00",
      location: "Founders Park",
      numberPlayersNeeded: "20",
      organizerName: "Jess",
    },
    {
      eventName: "Magic!",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      date: "2022-12-7",
      time: "17:00",
      location: "You know where",
      numberPlayersNeeded: "1",
      organizerName: "Tony",
    },
    {
      eventName: "Beer Pong",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      date: "2022-12-15",
      time: "1:00",
      location: "The garage",
      numberPlayersNeeded: "3",
      organizerName: "John",
    },

    {
      eventName: "Soccer",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      date: "2022-12-15",
      time: "13:00",
      location: "Town Creek Athletic Fields",
      numberPlayersNeeded: "24",
      organizerName: "Brett",
    },
  ]);


  console.log("events seeded");

  await User.deleteMany({});

  await User.create({
    username: "Brian",
    email: "brian@testmail.com",
    password: "password12345",
    events: [],
    commitments: []
  });

  await User.create({
    username: "Rodolfo",
    email: "rodolfo@testmail.com",
    password: "password12345",
    events: [],
    commitments: []
  });

  await User.create({
    username: "Melissa",
    email: "melissa@testmail.com",
    password: "password12345",
    events: [],
    commitments: []
  });

  await User.create({
    username: "Christina",
    email: "christina@testmail.com",
    password: "password12345",
    events: [],
    commitments: []
  });

  await User.create({
    username: "Morgan",
    email: "morgan@testmail.com",
    password: "password12345",
    events: [],
    commitments: []
  });

  console.log("users seeded");

  process.exit();
});
