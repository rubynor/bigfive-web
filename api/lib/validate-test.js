const Joi = require('@hapi/joi')
const schema = Joi.object({
  name: Joi.string(),
  id: Joi.string(),
  shortId: Joi.string(),
  time: Joi.number(),
  questions: Joi.number(),
  note: Joi.string(),
  languages: Joi.array().items(Joi.object({
    id: Joi.string(),
    text: Joi.string()
  })),
  lang: Joi.string(),
  answers: Joi.array().items(Joi.object({
    domain: Joi.string(),
    facet: Joi.number(),
    score: Joi.number()
  })).required(),
  timeElapsed: Joi.any(),
  dateStamp: Joi.number()
})

module.exports = data => schema.validate(data)
