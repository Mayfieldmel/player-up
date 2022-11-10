const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
//https://www.npmjs.com/package/mongoose-type-phone
const mongooseTypePhone = require('mongoose-type-phone');

// import schema from Events.js
// const eventSchema = require("./Events");

const userSchema = new Schema(
  {

    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: "Events"
    }],
    commitments: [{
      type: Schema.Types.ObjectId,
      ref: "Events"
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
