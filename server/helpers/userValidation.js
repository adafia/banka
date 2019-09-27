import Joi from 'joi';

const signupSchema = Joi.object().keys({
    first_name: Joi.string().trim().alphanum().min(3).max(30).required(),
    last_name: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().email().regex(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/).required(),
    type: Joi.string().trim().alphanum().equal(['client','staff']).required(),
    password: Joi.string().required().error( errors => {
        return {
            message: 'Your password is required and it should have at least one upper case English letter, one lower case English letter, one digit, one special character and a Minimum eight characters'
        }
    }),
    created_on: Joi.number().required()
});

export default signupSchema;