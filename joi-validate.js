const joi = require('joi');


var a = {
  user_name: 1,
  address: {
    street_name: "street1"
  }
}

var schema = joi.object({
  user_name: joi.alternatives().try(joi.string(), joi.number()),
  password: joi.string().optional()
})

var overrideSchema = schema.keys({
  user_name: joi.number().required()
})

let validation = joi.validate(a, schema, { stripUnknown: true });

console.log("error, ", validation.error);
console.log("result value", validation.value);