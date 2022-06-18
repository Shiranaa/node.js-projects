const joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  name: {
    type: string,
    require: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: string,
    require: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: string,
    require: true,
    minlength: 6,
    maxlength: 1024,
  },
  biz: {
    type: boolean,
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const Schema = joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
  });

  return schema.validate(user);
}

function validateCard(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });
  return schema.validate(data);
}

exports.User = User;
exports.validate = validateUser;
exports.validateCards = this.validateCards;
