const Joi = require('joi')

const schema = Joi.object({
  testId: Joi.string(),
  lang: Joi.string(),
  invalid: Joi.boolean(),
  answers: Joi.array().items(Joi.object({
    questionID: Joi.string(),
    domain: Joi.string(),
    facet: Joi.number(),
    score: Joi.number()
  })).required(),
  timeElapsed: Joi.any(),
  dateStamp: Joi.number(),
  name: Joi.string(),
  age: Joi.number(),
  city: Joi.string(),
  country: Joi.string(),
  twitterUsername: Joi.string(),
  occupation: Joi.string()
})

module.exports = data => schema.validate(data)
