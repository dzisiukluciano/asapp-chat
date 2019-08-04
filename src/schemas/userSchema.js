const Joi = require('joi');

const UserSchema = module.exports;

UserSchema.keys = {
  username: Joi.string().trim()
    .min(1).max(50)
    .required(),
  password: Joi.string().trim()
    .min(1).max(255)
    .required(),
};

UserSchema.schema = Joi.object().keys(UserSchema.keys);
