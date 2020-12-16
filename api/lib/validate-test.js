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
  age: Joi.number(),
  twitterUsername: Joi.string(),
  occupation: Joi.string()
})

module.exports = data => schema.validate(data)
