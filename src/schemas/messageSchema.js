const Joi = require('joi');

const MessageSchema = module.exports;

const contentKeys = {
  type: Joi.string().required().valid(['text', 'image', 'video']),
  text: Joi.when('type', {
    is: Joi.string().valid('text'),
    then: Joi.string().trim().min(1).required(),
    otherwise: Joi.forbidden(),
  }),
  url: Joi.when('type', {
    is: Joi.string().valid(['image', 'video']),
    then: Joi.string().uri().required(),
    otherwise: Joi.forbidden(),
  }),
  height: Joi.when('type', {
    is: Joi.string().valid('image'),
    then: Joi.number().integer().greater(0).required(),
    otherwise: Joi.forbidden(),
  }),
  width: Joi.when('type', {
    is: Joi.string().valid('image'),
    then: Joi.number().integer().greater(0).required(),
    otherwise: Joi.forbidden(),
  }),
  source: Joi.when('type', {
    is: Joi.string().valid('video'),
    then: Joi.string().required().valid(['youtube', 'vimeo']),
    otherwise: Joi.forbidden(),
  }),
};

const postMessageKeys = {
  sender: Joi.number().integer().greater(0).required(),
  recipient: Joi.number().integer().greater(0).required()
    .invalid(Joi.ref('sender'))
    .options({
      language: {
        any: {
          invalid: 'can\'t be the same user as sender',
        },
      },
    }),
  content: Joi.object().keys(contentKeys).required(),
};

const getMessageKeys = {
  recipient: Joi.number().integer().greater(0).required(),
  start: Joi.number().integer().greater(0).required(),
  limit: Joi.number().integer().optional(),
};

MessageSchema.postSchema = Joi.object().keys(postMessageKeys);

MessageSchema.getSchema = Joi.object().keys(getMessageKeys);
