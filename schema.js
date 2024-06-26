const Joi = require('joi');

module.exports.ListingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        capacity: Joi.number().required().min(1),
    })
});